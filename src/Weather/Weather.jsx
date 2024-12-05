import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Air from "../Air/Air";
import Sun from "../Sun/Sun";

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [tempUnit, setTempUnit] = useState("imperial");
  const [error, setError] = useState(null);

  const loadLocation = () => {
    setLocation(JSON.parse(sessionStorage.getItem("location")));
  };

  const changeTemp = (event) => {
    if (event) {
      event.preventDefault();
    }
    setTempUnit(tempUnit === "imperial" ? "metric" : "imperial");
    sessionStorage.setItem("tempUnit", JSON.stringify(tempUnit));
  };

  //initialize and api call when search is changed
  useEffect(() => {
    loadLocation();
  }, []);

  useEffect(() => {
    const apiEndpoint = process.env.REACT_APP_API_URL_WEATHER;

    const fetchWeather = () => {
      if (location != null) {
        fetch(
          `${apiEndpoint}?lat=${location.lat}&lon=${location.lon}&units=${tempUnit}`
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
  }, [location, tempUnit]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <button onClick={changeTemp}>
        <p>
          Change TempUnit Units
          <br />
          between Fahrenheit and Celsius
        </p>
      </button>
      <br />
      Current Unit: {tempUnit === "imperial" ? "Fahrenheit" : "Celsius"}
      <p>Click card to look at hourly temperature</p>
      {weather && (
        <Link to="/hourly">
          <button>
            <div>
              <p>
                Location: {location.name},{" "}
                {location.state ? `${location.state}, ` : ""}
                {location.country}
              </p>
              <p>
                Current Temperature: {weather.temp}
                {tempUnit === "imperial" ? "°F" : "°C"}
              </p>
              <p>
                Feels Like: {weather.feels_like}
                {tempUnit === "imperial" ? "°F" : "°C"}
              </p>
              <p>Condition: {weather.weather[0].description}</p>
              <Air />
              <Sun />
            </div>
          </button>
        </Link>
      )}
    </div>
  );
};

export default Weather;
