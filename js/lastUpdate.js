const dateTime = document.querySelector("#date-time");
const url = "https://api.github.com/users/rafaguima00/repos";

const getUrl = async () => {
    const response = await fetch(url);
    const responseJson = await response.json();
    try {
        dateTime.innerHTML += new Date(responseJson[6].pushed_at).toLocaleString();
    } catch (error) {
        dateTime.innerHTML += "Nenhuma atualização"
    }
}

getUrl();