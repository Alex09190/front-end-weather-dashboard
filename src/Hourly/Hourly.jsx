import { Link } from "react-router-dom";

const Hourly = () => {
  const weather = JSON.parse(sessionStorage.getItem("weather")).hourly;
  const tempUnit = JSON.parse(sessionStorage.getItem("tempUnit"));
  const location = JSON.parse(sessionStorage.getItem("location"));

  return (
    <div>
      <Link to={-1}>
        <button>Go back to home</button>
      </Link>
      <h2>
        {location.name}, {location.state ? `${location.state}, ` : ""}
        {location.country}
      </h2>
      {weather && (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Hour</th>
                <th>Temp ({tempUnit === "imperial" ? "°F" : "°C"})</th>
                <th>Feels Like ({tempUnit === "imperial" ? "°F" : "°C"})</th>
              </tr>

              {weather.map((hour, index) => (
                //print city names, states, and countries - some cities aren't in a state => ternary conditional
                <tr key={index}>
                  <td>{Date(hour.dt * 1000).toLocaleString()}</td>
                  <td>{hour.temp}</td>
                  <td>{hour.feels_like}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Hourly;
