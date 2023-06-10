import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainNavigation } from "./screens/MainNavigation";
import { instructionals, nowPlaying, volumes } from "./types";
import { VideoStream } from "./screens/VideoStream";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { getContent } from "./uploader/gofile";
import "./app.css";

const App: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<nowPlaying>({
    name: "MAIN PAGE",
    subName: "DEFAULT",
    url: "",
  });
  const [loading, setLoading] = useState(true);
  const [contentArray, setContentArray] = useState<instructionals[]>([]);

  const handleVideoSelect = (selectedNowPlaying: nowPlaying) => {
    setNowPlaying(selectedNowPlaying);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const parentFolder = await getContent(
          "7ce5f426-0a7d-46e3-82c2-8870129940ff"
        );

        const fetchedData = await Promise.all(
          parentFolder.childs.map(async (folder: string) => {
            const volumes = await getContent(folder);
            return {
              contents: volumes.contents,
              childs: volumes.childs,
              name: volumes.name,
            };
          })
        );

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
      volume: e.name,
      url: e.directLink,
    }));

    return {
      name,
      volumes,
    };
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="App">
          <Router>
            <MainNavigation
              onVideoSelect={handleVideoSelect}
              loading={setLoading}
              data={contentArray}
            />
            <Routes>
              <Route
                path="/"
                element={<VideoStream nowPlaying={nowPlaying} />}
              />
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
