// when targetting classes we will use ".city"
// when targetting id we will use "#"

//API Integration
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let desrcriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
                  src="${response.data.condition.icon_url}"
                  class="weather-app-icon"
                />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  desrcriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "t6b6bfd88092a3a53d3o114058062b74";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(refreshWeather);
}

// Search Engine
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

// Handling Forecast API
function getForecast(city) {
  let apiKey = "t6b6bfd88092a3a53d3o114058062b74";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

// Handling Forecast
function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-days">
            <div class="weather-forecast-date">${day}</div>
            <div class="icon">
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                alt=""
                width="69"
              />
            </div>
            <div class="weather-forecast-temperature">
              <span class="temp-max">18°</span>
              <span class="temp-min">12°</span>
            </div>
        </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sandton");
