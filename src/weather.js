// src/components/Weather.js
import React, { useState } from "react";
import axios from "axios";
import "./weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const apiKey = "bd5e378503939ddaee76f12ad7a97608";
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        className="weather-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="weather-button" onClick={fetchWeatherData}>
        Get Weather
      </button>

      {weatherData && (
        <div className="weather-info">
          <h3>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h3>
          <p className="weather-description">
            <i className={`wi wi-owm-${weatherData.weather[0].id}`} />{" "}
            {weatherData.weather[0].description}
          </p>
          <p className="weather-temperature">
            Temperature: {convertToCelsius(weatherData.main.temp)}°C (
            {convertToFahrenheit(weatherData.main.temp)}°F)
          </p>
        </div>
      )}
    </div>
  );
}

const convertToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

const convertToFahrenheit = (kelvin) => {
  return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);
};

export default Weather;
