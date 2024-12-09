const Air = () => {
  //dependent on weather component
  const weather = JSON.parse(sessionStorage.getItem("weather")).current;
  const tempUnit = JSON.parse(sessionStorage.getItem("tempUnit"));

  return (
    <div>
      {weather && (
        <div>
          <p>
            Wind Speed: {weather.wind_speed}
            {tempUnit === "imperial" ? "mph" : "m/s"}
          </p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Air;
