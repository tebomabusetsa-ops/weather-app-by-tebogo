function displayWeather(response) {
    console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#time").innerHTML = formatDate(response.data.time);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#icon").src = response.data.condition.icon_url;

  getForecast(response.data.coordinates);
  
}
function searchCity(city) {
  let apiKey = "4a80febobcebc8bf8513ctfac0a134d1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
function getWeatherEmoji(condition) {
  if (condition.includes("clear")) {
    return "☀️";
  }
  if (condition.includes("rain")) {
    return "🌧️";
  }
  if (condition.includes("cloud")) {
    return "☁️";
  }
  if (condition.includes("storm")) {
    return "⛈️";
  }

  return "🌤️";
}
function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="forecast-day">
          <div>${formatDay(day.time)}</div>
          <div>${getWeatherEmoji(day.condition.icon)}</div>
          <div>
            <strong>${Math.round(day.temperature.maximum)}°</strong>
            ${Math.round(day.temperature.minimum)}°
          </div>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4a80febobcebc8bf8513ctfac0a134d1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function handleSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${days[date.getDay()]} ${hours}:${minutes}`;
}

searchCity("Rustenburg");
