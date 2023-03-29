import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainNavigation } from "./screens/MainNavigation";
import { AppBar, IconButton, Toolbar, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { OpenInBrowserSharp } from "@mui/icons-material";

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
