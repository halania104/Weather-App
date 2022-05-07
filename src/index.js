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
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let h4 = document.querySelector("h4");
  let temperature = Math.round(response.data.main.temp);
  h4.innerHTML = `${temperature}`;
}

//searching for a city

function findingPlace(event) {
  event.preventDefault();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let input = document.querySelector("#search-input");
  let city = `${input.value}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(url).then(showWeather);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", findingPlace);
