import * as React from "react";
import "./VideoStream.css";
import { instructionals, nowPlaying } from "../types";
import { AppBarComponent } from "../components/AppBar";
import { SideBarComponent } from "../components/SideBar";

export interface NavigationBarProps {
  loading: Function;
  onVideoSelect: (nowPlaying: nowPlaying) => void;
  data: instructionals[];
}

export const MainNavigation = ({
  onVideoSelect,
  loading,
  data,
}: NavigationBarProps) => {
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
          url: "https://mediacdn.cincopa.com/v2/1099353/6256!ZxjFAAAAAAg6iC/0/LachlanGilesAroundandUnder1.mp4",
        },
        { volume: "Vol2", url: "" },
        {
          volume: "Vol3",
          url: "https://cold1.gofile.io/download/direct/60f76fb3-d9a6-4681-b8e0-e3105233189e/Half-Guard%20Passing%20by%20Gordon%20Ryan%201.mp4",
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
        instructionalArr={data ?? instructionalArr}
        openSideBar={open}
        closeSideBar={handleDrawer}
        onVideoSelect={onVideoSelect}
      />
    </>
  );
};
