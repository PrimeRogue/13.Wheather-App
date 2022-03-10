const APIkey = "d78fd1588e1b7c0c2813576ba183a667";
const endpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
const wheatherResult = document.querySelector(".wheather-result");
const container = document.querySelector(".container");
const inputCity = document.querySelector("input");
const formCity = document.querySelector("form");
const wheatherCardError = document.querySelector(".wheather-card-error");
const wheatherCard = document.querySelector(".wheather-card");
const textBox = document.querySelector(".text-box h1");
let today = new Date();
let template;
async function renderWheather(city) {
    try {
        const response = await fetch(`${endpoint}${city}&units=metric&appid=${APIkey}`);
        const data = await response.json();
        if (data.cod == "404") template = `<div class="wheather-card-error">
            <div class="text">
                <h1>Your location could not be found !!!</h1>
            </div>
            <div class="image"><img src="./images/Earth-chan2.png" alt=""></div>
        </div>`;
        else template = `<div class="wheather-card">
<div class="image"><img src="https://source.unsplash.com/1600x900/?${data.name}" alt=""></div>
<div class="details-container">
    <div class="left">
        <div class="location btn">
            <div class="icon">
                <ion-icon name="location"></ion-icon>
            </div>
            <div class="text">
                <span>Location</span>
                <span>${data.name}</span>
            </div>
        </div>

        <div class="tempurature btn">
            <div class="icon">
                <ion-icon name="thermometer"></ion-icon>
            </div>
            <div class="text">
                <span>Temperature</span>
                <span>${data.main.temp} C | ${(data.main.temp*1.8 + 32).toFixed(3)} F</span>
            </div>
        </div>

        <div class="humidity btn">
            <div class="icon">
                <ion-icon name="water"></ion-icon>
            </div>
            <div class="text">
                <span>Humidity</span>
                <span>${data.main.humidity} %</span>
            </div>
        </div>

        <div class="wind-speed btn">
            <div class="icon">
                <i class="fa-solid fa-wind"></i>
            </div>
            <div class="text">
                <span>Wind Speed</span>
                <span>${data.wind.speed} km/h</span>
            </div>
        </div>
    </div>

    <div class="right">
        <div class="image"><img src="./Weather Icons/${data.weather[0].main}.svg" alt=""></div>
        <div class="text">
            <span>Description</span>
            <span>${data.weather[0].description}</span>
            <span>Date</span>
            <span>${today.getHours()}h${today.getMinutes()}, ${today.toLocaleDateString("vi-VI")}</span>
        </div>
    </div>
</div>
</div>`;
        wheatherResult.insertAdjacentHTML("beforeend", template);
    } catch (error) {
        console.error(error);
    }
}


// Lấy giá trị nhập vào
formCity.addEventListener('submit', async function(e) {
    e.preventDefault();
    wheatherResult.innerHTML = "";
    formCity.style.display = "none";
    wheatherResult.style.display = "flex";
    await renderWheather(inputCity.value);
    container.insertAdjacentHTML("beforeend", `<div class="back-button">
        <ion-icon name="arrow-back-circle-outline"></ion-icon>
    </div>`);
})

document.body.addEventListener("click", function(e) {
    if (e.target.matches(".back-button")) {
        formCity.style.display = "flex";
        wheatherResult.style.display = "none";
        formCity.reset();
        e.target.style.display = "none";
    }
})

let idx = 1;
let text = textBox.textContent;

function writeText() {
    textBox.innerText = text.slice(0, idx);
    idx++;
    if (idx > textBox.length) {
        idx = 1;
    }
    setTimeout(writeText, 250);
}

writeText();


console.log();
console.log(today.getMinutes());


renderWheather("Ha noi");