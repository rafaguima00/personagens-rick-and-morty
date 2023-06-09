const urlApi = 'https://rickandmortyapi.com/api/character'
const lista = document.getElementById('mostrar-dados')
const mensagemNaTela = document.createElement('div')

let botaoPrev = ''
let botaoNext = ''

async function recuperarDados(url, name = '') {
    
    mensagemNaTela.innerHTML = `
        <span class="carregando"></span>
        <p class="mensagem-tela">Carregando dados dos personagens...</p>
    `
    mensagemNaTela.classList.add('div-carregando')
    
    const main = document.querySelector('main')
    main.insertBefore(mensagemNaTela, main.children[1])

    try {
        if(name != '') {
            var recuperarUrl = await fetch(`${url}?name=${name}`)
        } else {
            var recuperarUrl = await fetch(url)
        }

        var urlConvertida = await recuperarUrl.json()
    
        botaoPrev = urlConvertida.info.prev
        botaoNext = urlConvertida.info.next

        const arrayItens = urlConvertida.results

        arrayItens.forEach((elemento) => {
            mostrarDados(elemento)
        })

        mensagemNaTela.remove()

    } catch {
        mensagemNaTela.innerHTML = `
        <p class="mensagem-tela">Nenhum personagem encontrado</p>
    `
        
        botaoPrev = null
        botaoNext = null
    }

    return urlConvertida
}

const form = document.getElementById('form-buscar')
form.onclick = function(evento) {
    const inputForm = document.getElementById('input-buscar')

    evento.preventDefault()

    if(inputForm.value !== "") {
        lista.innerHTML = ""
        recuperarDados(urlApi, inputForm.value)
    
        inputForm.value = ""
    } 
}

function mostrarDados(itens) {

    if(itens.status == "Alive") {
        corBolinha = "#55CC44"
    } else if (itens.status == "Dead"){
        corBolinha = "#D63D2E"
    } else {
        corBolinha = "#C78C19"
    }

    lista.innerHTML += `
        <li class="itens">
            <img src="${itens.image}" alt="${itens.name}" class="imagem-personagem">
            <div class="info-personagens">
                <p class="nome-personagem">${itens.name}</p>
                <p class="species-personagem"><strong>Species</strong>: ${itens.species}</p>
                <div class="status-personagem">
                    <p><strong>Status</strong>: ${itens.status}</p>
                    <span class="bolinha" style="background-color: ${corBolinha};"></span>
                </div>
                <p><strong>Origin</strong>: ${itens.origin.name}</p>
                <p><strong>Location</strong>: ${itens.location.name}</p>
            </div>
        </li>
    `
}

const btPrev = document.getElementById('botao-prev')
btPrev.addEventListener('click', (evento) => {
    evento.preventDefault()

    if(botaoPrev != null) {
        lista.innerHTML = ""
        recuperarDados(botaoPrev)
    
        window.scrollTo(0, 0);
    } 
})

const btNext = document.getElementById('botao-next')
btNext.addEventListener('click', (evento) => {
    evento.preventDefault()

    if(botaoNext != null) {
        lista.innerHTML = ""
        recuperarDados(botaoNext)
    
        window.scrollTo(0, 0);
    }
})

recuperarDados(urlApi)
