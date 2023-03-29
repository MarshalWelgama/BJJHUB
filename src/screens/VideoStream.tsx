import Plyr, { APITypes } from "plyr-react";
import React, { FunctionComponent, useRef } from "react"; // importing FunctionComponent
import "plyr-react/plyr.css";
import "./VideoStream.css";
import { Editor } from "../components/Editor";

const plyrProps: any = {
  source: {
    type: "video",
    title: "Example title",
    sources: [
      {
        src: "https://store1.gofile.io/download/direct/5f3cc675-bf41-4fea-b4ea-23bce53afd00/Half-Guard%20Passing%20by%20Gordon%20Ryan%2010.mp4",
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

export const VideoStream = () => {
  const ref = useRef<APITypes>();

  return (
    <div className="player-wrapper">
      <Plyr ref={ref} {...plyrProps} />
      <div style={{ padding: "20px" }}>
        <Editor plyrRef={ref.current?.plyr as Plyr} />
      </div>
    </div>
  );
};
