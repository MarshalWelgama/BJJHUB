import Plyr, { APITypes } from "plyr-react";
import React, { useEffect, useRef } from "react"; // importing FunctionComponent
import "plyr-react/plyr.css";
import "./VideoStream.css";
import { Editor } from "../components/Editor";
import { Paper } from "@mui/material";
import VideoDescription from "../components/VideoDescription";
import { nowPlaying } from "../types";
import ResumePlaybackModal from "../components/ResumePlaybackModal";
import { getLastTimeDb, updateTimeDb } from "../config/supabaseClient";

export const VideoStream = ({ nowPlaying }: { nowPlaying: nowPlaying }) => {
  const ref = useRef<APITypes>();

  const getPlyrInstance = () => {
    return ref.current?.plyr!;
  };

  const plyrProps: any = {
    source: {
      type: "video",
      title: nowPlaying.subName,
      sources: [
        {
          src: nowPlaying.url,
          type: "video/mp4",
        },
      ],
    }, // https://github.com/sampotts/plyr#the-source-setter
    options: {
      ratio: "21:9",
      fullscreen: { enabled: true, fallback: true, iosNative: true },
      quality: {
        default: 576,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      },
      disableContextMenu: true,
      markers: { enabled: true, points: [{ time: 30, label: "test" }] },
      tooltips: { controls: false, seek: true },
      style: {},
      blankVideo: "nowPlaying.url",

      //  previewThumbnails: { enabled: true, src: "" },
    }, // https://github.com/sampotts/plyr#options
    // Direct props for inner video tag (mdn.io/video)
  };

  const handlePageHide = () => {
    if (getPlyrInstance().currentTime > 0) {
      updateTimeDb(
        nowPlaying.name,
        nowPlaying.subName,
        getPlyrInstance().currentTime.toString()
      );
    }
  };

  const handleStorageChange = () => {
    if (window.localStorage.getItem("Navigation") === "true") {
      handlePageHide();
    }
  };

  useEffect(() => {
    window.onpagehide = handlePageHide;
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.onpagehide = null;
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [nowPlaying]);

  const handleResumePlayback = () => {
    getLastTimeDb(nowPlaying.name, nowPlaying.subName).then(
      (t: string | undefined) => {
        getPlyrInstance().currentTime = Number(t);
        getPlyrInstance().once("loadeddata", (e) => {
          getPlyrInstance().currentTime = Number(t);
        });
      }
    );
  };

  return (
    <div className="player-wrapper">
      <>
        {" "}
        {/* <Button onClick={handleCurrentTime}>Set Current Time</Button> */}
        <Plyr
          ref={ref}
          {...plyrProps}
          options={{
            ...plyrProps.options,
            // Add the event listener for the 'ready' event
          }}
          event={{
            loadeddata: "loadeddata",
          }}
        />
        <Paper sx={{ textAlign: "center" }} elevation={0}>
          <VideoDescription nowPlaying={nowPlaying} />
        </Paper>
        <div style={{ padding: "0px 20px 20px 20px" }}>
          <Editor getPlyrInstance={getPlyrInstance} />
        </div>
        <ResumePlaybackModal
          handleResumePlayback={handleResumePlayback}
          nowPlaying={nowPlaying}
          getPlyr={getPlyrInstance}
        />
      </>
    </div>
  );
};
