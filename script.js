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
    document.getElementById("bigBox").style.animation = "fade 1s";
    setTimeout(() => {
        document.getElementById("bigBox").style.animation = "none";
    }, 1000);   
    document.getElementById("locBox").innerHTML = "<img src=\"icons/loc.png\" id=\"iconLoc\"><div id=\"loc\">" + weather.location.name + ", " + (weather.location.region == '' ? "N/A" : weather.location.region) + ", " + weather.location.country + "</div>";
    document.getElementById("temp").innerText = (weather.current.temp_c + " °C").replace(".", ",");
    document.getElementById("iconTemp").setAttribute("src", "http:" + weather.current.condition.icon.replace("64x64", "128x128"));
    document.getElementById("wind").innerText = (weather.current.wind_kph + " km/h").replace(".", ",");
    document.getElementById("hum").innerText = (weather.current.humidity + " %").replace(".", ",");
    document.getElementById("prec").innerText = (weather.current.precip_mm + " mm").replace(".", ",");
}

function warn() {
    let warn = `    
        <div id="warn">
            <div>
                Essa aplicação pode coletar dados da sua localização com sua permissão para informar o clima na sua região por meio da <a href="https://www.weatherapi.com/">Weather API</a>, entretando, nenhum dado é retido pela aplicação. Você também pode optar por apenas pesquisar uma cidade.
            </div>
            <button id="warnBtn">Ok</button>
        </div>`;
    if (localStorage.getItem("warned") == null) {
        document.body.innerHTML += warn;
        document.getElementById("warnBtn").addEventListener("click", closeWarn);
    } else {
        navigator.geolocation.getCurrentPosition(getPos);
    }
    
}

function closeWarn() {
    document.getElementById("warn").remove();
    navigator.geolocation.getCurrentPosition(getPos);
    localStorage.setItem("warned", true);
}

getDefaultWeather();
warn();