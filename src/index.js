let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()]; //0 and 6

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()]; // 0 and 11

h2.innerHTML = `${day} :  ${month}, ${date},${year}`;
let h3 = document.querySelector("h3");
h3.innerHTML = `${hours}:${minutes}`;

//forecast info
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Thur", "Fri", "Sat", "Sun"];
  forecastDays.forEach(function (day) {
    forecastHTML = forecastHTML +
      `
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42" />
            <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">63°</span>
            <span class="weather-forecast-temp-min">45°</span>
        </div>
      </div>
    </div>
    `;
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4ea07c27d25d25e1861d7e9cc4008ce7";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid={4ea07c27d25d25e1861d7e9cc4008ce7}`
}

//current weather info

function showWeather(response) {
  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#bigTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  fahrenheitTemp = response.data.main.temp;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);


getForecast(response.data.coords)
}

//searching for a city

function findingPlace(city) {
  let apiKey = "4ea07c27d25d25e1861d7e9cc4008ce7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  findingPlace(city);
}

function searchLocation(position) {
  let apiKey = "4ea07c27d25d25e1861d7e9cc4008ce7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#bigTemp");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#bigTemp");
  temperatureElement.innerHTML = 19;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiuTemp = ((fahrenheitTemp - 32) * 5) / 9;
  alert(celsiuTemp);
  let temperatureElement = document.querySelector("#bigtemp");
  temperatureElement.innerHTML = Math.round(celsiuTemp);
}

function showFahrenTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#bigtemp");
  temperatureElement = Math.round(fahrenTemp);
}

let fahrenheitTemp = null;

let currentLocationButton = document.querySelector("#current-place");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenTemp);

findingPlace("New York");
displayForecast();
