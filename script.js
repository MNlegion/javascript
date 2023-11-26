// script.js

document.addEventListener("DOMContentLoaded", function () {
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    getWeatherBtn.addEventListener("click", getWeather);
});

function createWeatherCard(temperature, description, icon) {
    // Create card container
    const card = document.createElement("div");
    card.classList.add("weather-card", "bg-gray-800", "p-4", "rounded", "shadow-md", "mb-4");

    // Create temperature element
    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${temperature}°F`; // Display in Fahrenheit
    temperatureElement.classList.add("text-white");

    // Create description element
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${description}`;
    descriptionElement.classList.add("text-white");

    // Create weather icon element
    const iconElement = document.createElement("img");
    iconElement.src = `http://openweathermap.org/img/w/${icon}.png`; // Use the icon provided by OpenWeatherMap
    iconElement.alt = "Weather Icon";
    iconElement.classList.add("weather-icon");

    // Append temperature, description, and icon elements to the card
    card.appendChild(temperatureElement);
    card.appendChild(descriptionElement);
    card.appendChild(iconElement);

    return card;
}

function convertToFarhenheit(celsiusTemperature) {
    return (celsiusTemperature * 9/5) + 32;
}

function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    const city = cityInput.value;

    if (city === "") {
        alert("Please enter a city");
        return;
    }

    const apiKey = 'e9fe7b78654e60c910997496410c10f6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperatureCelsius = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
            const temperatureFahrenheit = convertToFarhenheit(temperatureCelsius);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            // Create a new weather card with icon
            const weatherCard = createWeatherCard(temperatureFahrenheit, description, icon);

            // Clear previous content in weatherResult div
            weatherResult.innerHTML = "";

            // Append the weather card to weatherResult div
            weatherResult.appendChild(weatherCard);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);

            // Display error message in a card
            const errorCard = createWeatherCard("N/A", "Error fetching weather data", "error");
            
            // Clear previous content in weatherResult div
            weatherResult.innerHTML = "";

            // Append the error card to weatherResult div
            weatherResult.appendChild(errorCard);
        });
}
