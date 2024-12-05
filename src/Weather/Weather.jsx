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
          console.log(data);
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

  if (error) return <p>{error}</p>;

  return (
    <div>
      {weather && (
        <div>
          <p>
            {location.name}, {location.state ? `${location.state}, ` : ""}
            {location.country}
          </p>
          <p>Current: {weather.temp}</p>
          <p>Feels Like: {weather.feels_like}</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Click card to look at hourly temperature</p> 
        </div>
      )}
    </div>
  );
};

export default Weather;
