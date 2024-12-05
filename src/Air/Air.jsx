import { useState, useEffect } from "react";

const Air = () => {
  //dependent on weather component
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const loadWeather = () => {
      setWeather(JSON.parse(sessionStorage.getItem("weather")).current);
    };
    loadWeather();
  }, []);

  return (
    <div>
      {weather && (
        <div>
          <p>Wind Speed: {weather.wind_speed}m/s</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Air;
