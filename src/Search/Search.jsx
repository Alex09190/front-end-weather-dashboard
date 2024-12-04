import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const apiEndpoint = process.env.REACT_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchLocation = (event) => {
    if (event) {
      event.preventDefault(); //disable button functionality
    }
    fetch(`${apiEndpoint}?q=${searchQuery}`) //fetch article data via proxy server endpoint with searchable filters
      .then((response) => {
        if (!response.ok) throw new Error(`Error fetching data`);
        return response.json();
      })
      .then((data) => {
        setArticles(data.response.docs);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return <div></div>;
};

export default Search;
