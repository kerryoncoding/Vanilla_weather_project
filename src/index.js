

function updateCurrent (response) {
console.log(response);

 
document.querySelector(".city-current").innerHTML = response.data.name;

document.querySelector(".description-current").innerHTML = response.data.weather[0].description;
//document.querySelector(".icon-current").innerHTML = response.data.weather[0].icon;
document.querySelector(".temperature-current").innerHTML = Math.round(response.data.main.temp);
document.querySelector(".humidity-current").innerHTML = response.data.main.humidity;
document.querySelector(".wind-current").innerHTML = Math.round(response.data.wind.speed);
}




let city = "Paris";

let apiKey = "ca47e9200d90350ad07692b8ce034ca3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(updateCurrent);



