import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (event) => {
    if (event) {
      event.preventDefault(); //disable submiting form on pressing enter
    }
    setSearchQuery(event.target.value);
    // setWeather(false); //make weather data disappear while searching cities
  };

  const selectCity = (event) => {
    //puts specific city information from clicked link into session storage
    const city = event.target;

    cities.forEach((cities) => {
      //check for selected article from searched ones, and store into storage
      const cityCheck = cities.state
        ? `${cities.name}, ${cities.state}, ${cities.country}`
        : `${cities.name}, ${cities.country}`;
      if (cityCheck === city.innerText) {
        setLocation({
          name: cities.name,
          country: cities.country,
          state: cities.state,
          lat: cities.lat,
          lon: cities.lon,
        });
      }
      setWeather(true);
    });
  };

  //initialize and api call when search is changed
  useEffect(() => {
    const apiEndpoint = process.env.REACT_APP_API_URL_LOCATION;

    const fetchCities = () => {
      if (searchQuery !== "") {
        fetch(`${apiEndpoint}?q=${searchQuery}`) //fetch article data via proxy server endpoint with searchable filters
          .then((response) => {
            if (!response.ok) throw new Error(`Error fetching data`);
            return response.json();
          })
          .then((data) => {
            setCities(data);
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    };
    fetchCities();
  }, [searchQuery]);

  useEffect(() => {
    sessionStorage.setItem("location", JSON.stringify(location));
    setCities(null);
  }, [location]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Weather App</h1>
      <p>Search for a city and then click a location</p>
      <form>
        <input
          type="text"
          name="searchQuery"
          id="searchQuery"
          onChange={handleInput}
        />
      </form>

      {cities && (
        <div>
          {cities.map((cities, index) => (
            //print city names, states, and countries - some cities aren't in a state => ternary conditional
            <div
              key={index}
              onClick={selectCity}
            >
              <h3>
                {cities.name}, {cities.state ? `${cities.state}, ` : ""}
                {cities.country}
              </h3>
            </div>
          ))}
        </div>
      )}
      {weather && <Weather />}
    </div>
  );
};

export default Search;
