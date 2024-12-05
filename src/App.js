import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./Search/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Search />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
