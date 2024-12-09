import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Search from "./Search/Search";
import Hourly from "./Hourly/Hourly";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Search />}
          ></Route>
          <Route
            path="/hourly"
            element={<Hourly />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
