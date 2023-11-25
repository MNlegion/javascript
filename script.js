// script.js

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

    const apiKey = 'X';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
            const description = data.weather[0].description;

            // Create elements
            const temperatureElement = document.createElement("p");
            const descriptionElement = document.createElement("p");

            // Set content and attributes
            temperatureElement.textContent = `Temperature: ${temperature}°C`;
            descriptionElement.textContent = `Description: ${description}`;

            // Clear previous content in weatherResult div
            weatherResult.innerHTML = "";

            // Append elements to weatherResult div
            weatherResult.appendChild(temperatureElement);
            weatherResult.appendChild(descriptionElement);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);

            // Display error message
            const errorElement = document.createElement("p");
            errorElement.textContent = "Error fetching weather data";

            // Clear previous content in weatherResult div
            weatherResult.innerHTML = "";

            // Append error message to weatherResult div
            weatherResult.appendChild(errorElement);
        });
    }
