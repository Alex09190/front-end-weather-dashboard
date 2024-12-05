const Air = () => {
  //dependent on weather component
  const weather = JSON.parse(sessionStorage.getItem("weather")).current;

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
