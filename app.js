function updateDateTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const dateTimeString = now.toLocaleString('en-US', options);
  document.getElementById('datetime').textContent = dateTimeString;
}

setInterval(updateDateTime, 1000);
updateDateTime();

async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = 'http://api.weatherapi.com/v1/current.json?key=9b52611e39e440108fe151110251405&q=' + city;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      displayWeather(data);
    } else {
      alert("City not found");
    }
  } catch (error) {
    alert("Failed to fetch weather data");
  }
}

function displayWeather(data) {
  const weatherDataDiv = document.getElementById("weather-data");
  weatherDataDiv.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p>Temperature: ${data.current.temp_c} C</p>
    <p>Weather: ${data.current.condition.text}</p>
    <p>Humidity: ${data.current.humidity} %</p>
    <p>Wind Speed: ${data.current.wind_mph} m/h</p>
  `;
}
