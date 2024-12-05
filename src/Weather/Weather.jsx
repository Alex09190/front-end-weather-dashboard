import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Air from "../Air/Air";
import Sun from "../Sun/Sun";

const Weather = ({ render }) => {
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
    setTemperature(temperature === "imperial" ? "metric" : "imperial");
  };

  //initialize and api call when search is changed
  useEffect(() => {
    loadLocation();
  }, [render]);

  useEffect(() => {
    const apiEndpoint = process.env.REACT_APP_API_URL_WEATHER;

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
            sessionStorage.setItem("weather", JSON.stringify(data));
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    };
    fetchWeather();
  }, [location, temperature]);

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
      Current Unit: {temperature === "imperial" ? "Fahrenheit" : "Celsius"}
      <p>Click card to look at hourly temperature</p>
      {weather && (
        <div>
          <p>
            Location: {location.name},{" "}
            {location.state ? `${location.state}, ` : ""}
            {location.country}
          </p>
          <p>
            Current: {weather.temp}
            {temperature === "imperial" ? "°F" : "°C"}
          </p>
          <p>
            Feels Like: {weather.feels_like}
            {temperature === "imperial" ? "°F" : "°C"}
          </p>
          <p>Condition: {weather.weather[0].description}</p>
          <Air />
          <Sun />
        </div>
      )}
    </div>
  );
};

export default Weather;
