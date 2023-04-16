import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { VideoStream } from "./VideoStream";
import UploadIcon from "@mui/icons-material/Upload";
import { Instructional } from "../components/Instructional";
import AppBar from "@mui/material/AppBar";
import "./VideoStream.css";
import { instructionals, nowPlaying, volumes } from "../types";
import { AppBarComponent } from "../components/AppBar";
import { SideBarComponent } from "../components/SideBar";

export interface NavigationBarProps {
  onVideoSelect: (nowPlaying: nowPlaying) => void;
}

export const MainNavigation = ({ onVideoSelect }: NavigationBarProps) => {
  const [open, setOpen] = React.useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };

  const instructionalArr: instructionals[] = [
    {
      name: "Systematicly Attacking",
      volumes: [
        {
          volume: "Vol1",
          url: "https://store1.gofile.io/download/direct/5f3cc675-bf41-4fea-b4ea-23bce53afd00/Half-Guard%20Passing%20by%20Gordon%20Ryan%2010.mp4",
        },
        { volume: "Vol2", url: "" },
        {
          volume: "Vol3",
          url: "https://store1.gofile.io/download/direct/5f3cc675-bf41-4fea-b4ea-23bce53afd00/Half-Guard%20Passing%20by%20Gordon%20Ryan%2010.mp4",
        },
      ],
    },
    { name: "Go Further Faster", volumes: [{ volume: "Vol1", url: "" }] },
    {
      name: "New Wave BJJ",
      volumes: [
        { volume: "Vol1", url: "" },
        { volume: "Vol2", url: "" },
      ],
    },
  ];

  return (
    <>
      <AppBarComponent onOpen={handleDrawer} />
      <SideBarComponent
        instructionalArr={instructionalArr}
        openSideBar={open}
        closeSideBar={handleDrawer}
        onVideoSelect={onVideoSelect}
      />
    </>
  );
};
