import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useCallback } from "react";
import "./App.css";
import Search from "./Search/Search";
import Weather from "./Weather/Weather";

function App() {
  const [render, setRender] = useState(false);

  const renderWeather = useCallback(() => {
    setRender((prev) => !prev);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search renderWeather={renderWeather} />
                <Weather render={render} />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
