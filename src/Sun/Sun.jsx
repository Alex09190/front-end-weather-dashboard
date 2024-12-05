import { useState, useEffect } from "react";

const Sun = () => {
  //dependent on weather component
  const [date, setDate] = useState(null);

  useEffect(() => {
    const weather = JSON.parse(sessionStorage.getItem("weather")).current;
    if (weather != null) {
      setDate({
        sunrise: new Date(weather.sunrise * 1000),
        sunset: new Date(weather.sunset * 1000),
      });
    }
  }, []);

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
