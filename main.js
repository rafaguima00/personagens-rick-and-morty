const urlApi = 'https://rickandmortyapi.com/api/character'
const lista = document.getElementById('mostrar-dados')
const mensagemNaTela = document.createElement('p')

let botaoPrev = ''
let botaoNext = ''

async function recuperarDados(url, name = '') {
    
    mensagemNaTela.innerText = "Carregando dados dos personagens..."
    mensagemNaTela.classList.add('mensagem-tela')
    
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

    } catch (e) {
        mensagemNaTela.innerText = "Nenhum registro"
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
                <p class="species-personagem">Species: ${itens.species}</p>
                <div class="status-personagem">
                    <p>Status: ${itens.status}</p>
                    <span class="bolinha" style="background-color: ${corBolinha};"></span>
                </div>
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
