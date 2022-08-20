
function formatDate (timestamp) {
    let date = new Date(timestamp);

    let day = date.getDay();

    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
    let dayOfWeek = (days[day]);


    //time minutes
    let timeMinutes = date.getMinutes();
    if (timeMinutes < 10) {
        timeMinutes = `0${timeMinutes}`;
    }

    //time of day converted to 12-Hour with AM/PM
    let timeHour = date.getHours();
    if (timeHour === 12) {
        return `${dayOfWeek} ${timeHour}:${timeMinutes} PM`;
    } else { if (timeHour === 0) {
        return `${dayOfWeek} 12:${timeMinutes} AM`;
        } else {
        if (timeHour > 12) { 
        timeHour = timeHour - 12;
        return `${dayOfWeek} ${timeHour}:${timeMinutes} PM`;
        } else {
            return `${dayOfWeek} ${timeHour}:${timeMinutes} AM`;
        }
        }
    }
}



function updateCurrent(response) {
    document.querySelector(".city-current").innerHTML = response.data.name;
    //citytime
    document.querySelector(".time-current").innerHTML = formatDate(response.data.dt * 1000);
    let dt = response.data.dt
    document.querySelector(".description-current").innerHTML = response.data.weather[0].description;
    let iconCode = response.data.weather[0].icon;
    document.querySelector(".icon-current").setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
    
    celsiousTemperature = response.data.main.temp
    document.querySelector(".temperature-current").innerHTML = Math.round(celsiousTemperature);
    document.querySelector(".humidity-current").innerHTML = response.data.main.humidity;
    document.querySelector(".wind-current").innerHTML = Math.round(response.data.wind.speed);

}


function handleSubmit(event) {
    event.preventDefault();
    //this  vvvvv fixes glitch of when you toggle to °F and then do another search the temperature is in C but says it is F
    celsious.classList.add("active");
    fahrenheit.classList.remove("active");
    //  ^^^^^
    let city = document.querySelector("#city-name-input").value;
    let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(updateCurrent);
}


function unitsFahrenheit() {
    celsious.classList.remove("active");
    fahrenheit.classList.add("active");
    document.querySelector(".temperature-current").innerHTML = Math.round(celsiousTemperature * 9/5) + 32;
}

function unitsCelsious() {
    celsious.classList.add("active");
    fahrenheit.classList.remove("active");
    document.querySelector(".temperature-current").innerHTML = Math.round(celsiousTemperature);
}


function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
     let forecastHTML = `<div class="row">`;
    
     let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    days.forEach(function(day) {

           forecastHTML = forecastHTML + `
                  <div class="col card-future">
                <div class="day-future">${day}</div>
                <div>
                  <img
                    src="http://openweathermap.org/img/wn/10d@2x.png"
                    alt="weather-icon"
                    class="icon-future"
                  />
                </div>
                <div class="temperature-future">
                  <span class="high-future">28° </span
                  ><span class="low-future">| 22°</span>
                </div>
              </div>`;

    })


    forecastHTML = forecastHTML + `</div>`

    forecastElement.innerHTML= forecastHTML;
}


document.querySelector("#fahrenheit").addEventListener("click", unitsFahrenheit);

document.querySelector("#celsious").addEventListener("click", unitsCelsious);

let celsiousTemperature = null;

let city = "Philadelphia";

document.querySelector(".input-city").addEventListener("submit", handleSubmit);

let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(updateCurrent);

displayForecast();

