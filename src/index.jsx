import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'dbb76c5d98d5dbafcb94441c6a10236e'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const getWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric'
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="mt-4">Weather App</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter a city"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={getWeatherData}>
            Get Weather
          </button>
        </div>
        {weatherData && (
          <div className="mt-4">
            <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;