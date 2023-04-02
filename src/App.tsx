import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainNavigation } from "./screens/MainNavigation";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainNavigation />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
