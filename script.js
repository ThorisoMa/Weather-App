function getWeather() {
  const apiKey = "26f91896f3e2652bdb7ed6200d79f4b2";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Fetch current weather
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        console.error("Error fetching current weather data:", data.message);
        alert("Error fetching current weather data. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });

  // Fetch forecast data
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        displayHourlyForecast(data.list);
      } else {
        console.error("Error fetching forecast data:", data.message);
        alert("Error fetching forecast data. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
      alert("Error fetching forecast data. Please try again.");
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous content
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  const cityName = data.name;
  const temperature = Math.round(data.main.temp - 273.15);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const temperatureHTML = `<p>${temperature}°C</p>`;
  const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

  tempDivInfo.innerHTML = temperatureHTML;
  weatherInfoDiv.innerHTML = weatherHTML;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = description;

  showImage();
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourlyData.slice(0, 8);

  hourlyForecastDiv.innerHTML = next24Hours
    .map((item) => {
      const dataTime = new Date(item.dt * 1000);
      const hour = dataTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15);
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      return `
        <div class="hourly-item">
          <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>
        </div>
      `;
    })
    .join("");
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
