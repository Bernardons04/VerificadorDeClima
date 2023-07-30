const keyAPI = "5cfc7ce180567614525230d98bb6f7ce";
const inputCidade = document.querySelector("#inputCidade");
const buscaBtn = document.getElementById("buscar") 
const form = document.querySelector(".form")

const cidade = document.querySelector("#cidade");
const temperatura = document.querySelector("#temperatura span");
const descricao = document.querySelector("#state");
const climaIcon = document.querySelector("#climaIcon");
const pais = document.querySelector("#pais");
const umidade = document.querySelector("#umidade span");
const vento = document.querySelector("#vento span");
const dadosClima = document.querySelector("#dadosClima")

const errorMessage = document.querySelector("#errorMessage")
const sugestoes = document.querySelector("#sugestoes")
const btnSugestao = document.querySelectorAll("#sugestoes button")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cidade = inputCidade.value
    if (inputCidade.value == "") {
        alert('Digite algo para inserir em sua lista!')       
    } else if (mostrarDadosClima(cidade)) {
        
    }
    inputCidade.value = "";
})

const mostrarDadosClima = async city => {
    const dados = await getClimaDados(city) 

    validarExistencia(city)
    let flagCountry;
    cidade.innerText = dados.name;
    flagCountry = dados.sys.country;
    const apiCountryURL = `https://flagsapi.com/${flagCountry}/flat/64.png`;
    pais.src = apiCountryURL;

    descricao.innerText = dados.weather[0].description;
    climaIcon.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

    vento.innerText = `${dados.wind.speed}km/h`;
    umidade.innerText = `${dados.main.humidity}%`
    temperatura.innerText = parseInt(dados.main.temp)
}

const getClimaDados = async city => {
    const apiClimaURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyAPI}&lang=pt_br`
    const apiResposta = await fetch(apiClimaURL)
    const dados = await apiResposta.json();
    return dados
}

const validarExistencia = async (city) => {
    const dados = await getClimaDados(city) 
    if (dados.cod == "404") {
        errorMessage.classList.remove("hide")
        dadosClima.classList.add("hide")
        sugestoes.classList.add("hide")
    } else {
        dadosClima.classList.remove("hide")
        errorMessage.classList.add("hide")
        sugestoes.classList.add("hide")
    }
}

btnSugestao.forEach(btn => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");
        mostrarDadosClima(city);
    });
});