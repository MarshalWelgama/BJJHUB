import Plyr, { APITypes } from "plyr-react";
import React, { FunctionComponent, useRef } from "react"; // importing FunctionComponent
import "plyr-react/plyr.css";
import "./VideoStream.css";
import { Editor } from "../components/Editor";
import { Paper } from "@mui/material";
import VideoDescription from "../components/VideoDescription";
import { nowPlaying } from "../types";
import { getContent, getServer } from "../uploader/gofile";

export const VideoStream = ({ nowPlaying }: { nowPlaying: nowPlaying }) => {
  const ref = useRef<APITypes>();

  const plyrProps: any = {
    source: {
      type: "video",
      title: "Example title",
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
      //  previewThumbnails: { enabled: true, src: "" },
    }, // https://github.com/sampotts/plyr#options
    // Direct props for inner video tag (mdn.io/video)
  };

  return (
    <div className="player-wrapper">
      <Plyr ref={ref} {...plyrProps} />
      <Paper sx={{ textAlign: "center" }} elevation={0}>
        <VideoDescription nowPlaying={nowPlaying} />
      </Paper>
      <div style={{ padding: "0px 20px 20px 20px" }}>
        <Editor plyrRef={ref.current?.plyr as Plyr} />
      </div>
    </div>
  );
};
