import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9fdaf90953c8fcd2cd72a0eb0452e1df`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (city.trim()) {
      setCity(city.trim());
    } else {
      setError("Please enter a city");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div>Temperature: {weatherData.main.temp}°C</div>
          <div>Weather: {weatherData.weather[0].main}</div>
          <div>Humidity: {weatherData.main.humidity}%</div>
          <div>Wind Speed: {weatherData.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
}

export default App;
