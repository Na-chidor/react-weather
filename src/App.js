import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import clouds from "./clouds.jpg";
const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "19b15efc74b01eb7cc0574d85791c65c";

  const fetchWeather = async () => {
    if (!location) {
      alert("Please enter a location.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : "An error occurred"
      );
      setWeatherData(null);
    }
  };

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: `url(${clouds})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8))",
          zIndex: 1,
        }}
      ></div>

      {/* Search Bar */}
      <div
        className="text-center position-absolute w-100"
        style={{
          top: "20px",
          zIndex: 2,
        }}
      >
        <input
          type="text"
          className="form-control w-50 mx-auto rounded-pill"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            maxWidth: "400px",
            display: "inline-block",
            padding: "10px",
            fontSize: "16px",
          }}
        />
        <button
          className="btn btn-primary rounded-pill ms-2"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>

      {weatherData && (
        <>
          <div
            className="position-absolute text-white"
            style={{
              top: "100px",
              left: "20px",
              zIndex: 2,
              textAlign: "left",
            }}
          >
            <h1>{weatherData.name}</h1>
            <h2 style={{ fontSize: "5rem" }}>{weatherData.main.temp}</h2>
          </div>
          <div
            className="position-absolute text-white"
            style={{
              top: "150px",
              right: "20px",
              zIndex: 2,
              textAlign: "right",
              transform: "rotate(-90deg)",            }}
          >
            <h3>{weatherData.weather[0].description}</h3>
          </div>

          {/* Weather Details */}
          <div
            className="position-absolute w-100 text-center text-white py-3"
            style={{
              bottom: "20px",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              zIndex: 2,
            }}
          >
            <div className="d-flex justify-content-around">
              <div>
                <p>{weatherData.main.feels_like}°C</p>
                <p>Feels Like</p>
              </div>
              <div>
                <p>{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div>
                <p>{weatherData.wind.speed} KPH</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Error Handling */}
      {error && (
        <div
          className="position-absolute w-100 text-center text-danger"
          style={{
            bottom: "20px",
            zIndex: 2,
          }}
        >
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
