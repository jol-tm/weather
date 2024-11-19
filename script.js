navigator.geolocation.getCurrentPosition(getPos, getDefaultWeather);

document.getElementById("inputBtn").addEventListener("click", getInputWeather);

function getPos(pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    getWeather(`${lat},${long}`) ; 
}

async function getWeather(loc) {
    await fetch(`http://api.weatherapi.com/v1/current.json?key=60bc11723913419aaa5165955241911&q=${loc}&aqi=no`)
        .then(Response => Response.json())
        .then(displayData);
}

async function getInputWeather() {
    let city = document.getElementById("input").value;
    await fetch(`http://api.weatherapi.com/v1/current.json?key=60bc11723913419aaa5165955241911&q=${city}&aqi=no`)
        .then(Response => Response.json())
        .then(displayData)
        .catch(searchError);
}

async function getDefaultWeather() {
    await fetch(`http://api.weatherapi.com/v1/current.json?key=60bc11723913419aaa5165955241911&q=London&aqi=no`)
        .then(Response => Response.json())
        .then(displayData);
}

function searchError() {
    document.querySelector("body").innerHTML += "<div class=\"notf\">Cidade inserida indisponível</div>";
    setTimeout(() => {
        document.querySelector(".notf").remove();
        document.getElementById("inputBtn").addEventListener("click", getInputWeather);
    }, 5000);
}

function displayData(weather) {
    document.getElementById("loc").innerHTML = weather.location.name + "<br>" + weather.location.region;
    document.getElementById("temp").innerText = weather.current.temp_c + "°C";
    document.getElementById("iconTemp").setAttribute("src", "http:" + weather.current.condition.icon.replace("64x64", "128x128"));
    document.getElementById("wind").innerText = weather.current.wind_kph + " km/h";
    document.getElementById("hum").innerText = weather.current.humidity + " %";
}