import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Weather = ({ render }) => {
  const apiEndpoint = process.env.REACT_APP_API_URL_WEATHER;

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState("imperial");
  const [error, setError] = useState(null);

  const loadLocation = () => {
    setLocation(JSON.parse(sessionStorage.getItem("location")));
  };

  const changeTemp = (event) => {
    if (event) {
      event.preventDefault();
    }
    setTemperature(temperature == "imperial" ? "metric" : "imperial");
  };

  const fetchWeather = () => {
    if (location != null) {
      fetch(
        `${apiEndpoint}?lat=${location.lat}&lon=${location.lon}&units=${temperature}`
      )
        .then((response) => {
          if (!response.ok) throw new Error(`Error fetching data`);
          return response.json();
        })
        .then((data) => {
          setWeather(data.current);
          sessionStorage.setItem("weather", data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  //initialize and api call when search is changed
  useEffect(() => {
    loadLocation();
  }, [render]);

  useEffect(() => {
    fetchWeather();
  }, [location]);
  useEffect(() => {
    fetchWeather();
  }, [temperature]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={changeTemp}>
        <p>
          Change Temperature Units
          <br />
          between Fahrenheit and Celsius
        </p>
      </button>
      <br />
      Current Unit: {temperature == "imperial" ? "Fahrenheit" : "Celsius"}
      {weather && (
        <div>
          <p>
            Location: {location.name},{" "}
            {location.state ? `${location.state}, ` : ""}
            {location.country}
          </p>
          <p>
            Current: {weather.temp}
            {temperature == "imperial" ? "°F" : "°C"}
          </p>
          <p>
            Feels Like: {weather.feels_like}
            {temperature == "imperial" ? "°F" : "°C"}
          </p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Click card to look at hourly temperature</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
