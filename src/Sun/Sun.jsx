import { useState, useEffect } from "react";

const Sun = () => {
  //dependent on weather component
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const loadWeather = () => {
      setWeather(JSON.parse(sessionStorage.getItem("weather")).current);
    };
    loadWeather();
  }, []);

  useEffect(() => {
    if (weather != null) {
      setDate({
        sunrise: new Date(weather.sunrise * 1000),
        sunset: new Date(weather.sunset * 1000),
      });
    }
  }, [weather]);

  return (
    <div>
      {date && (
        <div>
          <p>Sunrise Time: {date.sunrise.toLocaleString()}</p>
          <p>Sunset Time: {date.sunset.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Sun;
