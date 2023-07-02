import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainNavigation } from "./screens/MainNavigation";
import { instructionals, nowPlaying, volumes } from "./types";
import { VideoStream } from "./screens/VideoStream";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { getContent } from "./uploader/gofile";
import "./app.css";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";

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
    const fetchData = async (): Promise<void> => {
      try {
        const parentFolder = await getContent(
          "7ce5f426-0a7d-46e3-82c2-8870129940ff"
        );
        setProgressValue(parentFolder.childs.length * -1);
        let value = parentFolder.childs.length;
        const fetchedData: any[] = [];
        for (const folder of parentFolder.childs) {
          value = value + 1;
          setProgressValue(value);
          let volumes;
          let retries = 3; // Number of retries for rate limit error

          while (retries > 0) {
            try {
              volumes = await getContent(folder);
              break; // Break out of the loop if getContent is successful
            } catch (error: any) {
              console.log(error.message);
              if (error.message.includes("429")) {
                console.warn("Rate limit exceeded. Retrying in 5 seconds...");
                await new Promise((resolve) => setTimeout(resolve, 5000));
                retries--;
              } else throw error;
            }
          }

          fetchedData.push({
            contents: volumes.contents,
            childs: volumes.childs,
            name: volumes.name,
          });
        }

        const formattedData: instructionals[] = fetchedData.map(
          ({ childs, contents, name }) => {
            const ordered = reOrderContent(childs, contents);
            return formatInstructional(ordered, name);
          }
        );

        setContentArray(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(contentArray.length === 0);
  }, [contentArray]);

  const reOrderContent = (childArray: string[], contentArray: {}[]): {}[] =>
    childArray.map((e: any) => contentArray[e]);

  const formatInstructional = (content: {}[], name: string): instructionals => {
    const volumes: volumes[] = content.map((e: any) => ({
      volume: e.name.slice(0, -4),
      url: e.directLink,
    }));

    return {
      name,
      volumes,
    };
  };
  const LinearDeterminate = () => {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={Math.round(((progressValue - 23) / 23) * 100)}
        />
      </Box>
    );
  };
  return (
    <>
      {loading ? (
        <>
          <div>
            <LinearDeterminate />
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
