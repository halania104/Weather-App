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
