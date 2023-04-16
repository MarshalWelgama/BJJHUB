import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainNavigation } from "./screens/MainNavigation";
import { nowPlaying } from "./types";
import { VideoStream } from "./screens/VideoStream";

export default function App() {
  const [nowPlaying, setNowPlaying] = React.useState<nowPlaying>({
    name: "MAIN PAGE",
    subName: "DEFAULT",
    url: "",
  });

  const handleVideoSelect = (nowPlaying: nowPlaying) => {
    setNowPlaying(nowPlaying);
  };

  return (
    <div className="App">
      <Router>
        <MainNavigation onVideoSelect={handleVideoSelect} />

        <Routes>
          <Route
            path="/"
            element={<VideoStream nowPlaying={nowPlaying} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
