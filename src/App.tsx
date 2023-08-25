import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainNavigation } from "./screens/MainNavigation";
import { instructionals, nowPlaying, volumes } from "./types";
import { VideoStream } from "./screens/VideoStream";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { getContent } from "./uploader/gofile";
import "./app.css";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import { supabase } from "./config/supabaseClient";

const App: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<nowPlaying>({
    name: "",
    subName: "",
    url: "",
    hidden: true,
  });
  const [loading, setLoading] = useState(true);
  const [contentArray, setContentArray] = useState<instructionals[]>([]);
  const [progressValue, setProgressValue] = React.useState(0);
  const handleVideoSelect = (selectedNowPlaying: nowPlaying) => {
    setNowPlaying(selectedNowPlaying);
  };

  useEffect(() => {
    //Next step is to Fetch using DB and then move all legacy fetching to the update db onclick function

    async function getVolumesForAllInstructionals() {
      try {
        const { data: instructionalsData, error: instructionalsError } =
          await supabase.from("instructionals").select("instructional");
        if (instructionalsError) {
          throw instructionalsError;
        }
        const allVolumes: instructionals[] = [];

        for (const instructionalData of instructionalsData) {
          const instructional = instructionalData.instructional;

          const { data: volumesData, error: volumesError } = await supabase
            .from("volumes")
            .select("volume, link")
            .eq("instructional", instructional);

          if (volumesError) {
            throw volumesError;
          }

          allVolumes.push({
            instructional: instructional,
            volumes: volumesData,
          });
        }
        setContentArray(allVolumes);
      } catch (error) {
        console.error("Error fetching volumes:", error);
      }
    }

    getVolumesForAllInstructionals();
  }, []);

  useEffect(() => {
    setLoading(contentArray.length === 0);
  }, [contentArray]);

  return (
    <>
      {loading ? (
        <>
          <div>
            <div className="loading-container">
              <CircularProgress />
            </div>
          </div>
        </>
      ) : (
        <div className="App">
          <Router>
            <MainNavigation
              onVideoSelect={handleVideoSelect}
              loading={setLoading}
              data={contentArray}
              currentPlaying={nowPlaying}
            />
            <Routes>
              {!nowPlaying.hidden && (
                <Route
                  path="/"
                  element={<VideoStream nowPlaying={nowPlaying} />}
                />
              )}
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
