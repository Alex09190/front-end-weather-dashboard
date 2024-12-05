import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = ({ renderWeather }) => {
  const apiEndpoint = process.env.REACT_APP_API_URL_LOCATION;

  const [searchQuery, setSearchQuery] = useState("NYC");
  const [cities, setCities] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleInput = (event) => {
    if (event) {
      event.preventDefault(); //disable submiting form on pressing enter
    }
    setSearchQuery(event.target.value);
  };

  const fetchCities = (event) => {
    if (event) {
      event.preventDefault(); //not needed, api call on happens on handleInput
    }
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
  };

  const selectCity = (event) => {
    //puts specific city information from clicked link into session storage
    const city = event.target;

    cities.map((cities) => {
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
    });
  };

  //initialize and api call when search is changed
  useEffect(() => {
    fetchCities();
  }, [searchQuery]);

  useEffect(() => {
    sessionStorage.setItem("location", JSON.stringify(location));
    setCities(null);
    renderWeather();
  }, [location]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Weather App</h1>
      <p>Search for a city and then click a location</p>
      <form onSubmit={fetchCities}>
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
    </div>
  );
};

export default Search;
