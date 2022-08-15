
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
    console.log(response); 
    document.querySelector(".city-current").innerHTML = response.data.name;
    //citytime
    document.querySelector(".time-current").innerHTML = formatDate(response.data.dt * 1000);
    let dt = response.data.dt
    console.log(dt);
    document.querySelector(".description-current").innerHTML = response.data.weather[0].description;
    let iconCode = response.data.weather[0].icon;
    document.querySelector(".icon-current").setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`) 
    document.querySelector(".temperature-current").innerHTML = Math.round(response.data.main.temp);
    document.querySelector(".humidity-current").innerHTML = response.data.main.humidity;
    document.querySelector(".wind-current").innerHTML = Math.round(response.data.wind.speed);

        

}

function cityInput(event){
    event.preventDefault();
    console.log(event.value);
    
   // updateCurrent(city);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-name-input").value;
    let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(updateCurrent);
}




//document.querySelector(".fahrenheit").addeEventListener("click", unitFahrenheit);



let city = "Paris";

document.querySelector(".input-city").addEventListener("submit", handleSubmit);

let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(updateCurrent);



