import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { FunctionComponent } from "react"; // importing FunctionComponent
import ReactPlayer from "react-player/lazy";
import "./VideoStream.css";

type CardProps = {
  title: string;
  paragraph: string;
};

export const VideoStream: FunctionComponent = () => (
  <div className="player-wrapper">
    <ReactPlayer
      className="react-player"
      width="100%"
      height="100%"
      url="https://vimeo.com/431691585"
    />
  </div>
);
