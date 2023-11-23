require('dotenv').config();

document.addEventListener("DOMContentLoaded", function () {
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    getWeatherBtn.addEventListener("click", getWeather);
});

function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    const city = cityInput.value;

    if (city === "") {
        alert("Please enter a city");
        return;
    }

    const apiKey = process.env.API_KEY; // Read API key from .env file
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
            const description = data.weather[0].description;

            weatherResult.innerHTML = `Temperature: ${temperature}°C, Description: ${description}`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherResult.innerHTML = "Error fetching weather data";
        });
}
