import * as React from "react";
import "./VideoStream.css";
import { instructionals, nowPlaying } from "../types";
import { AppBarComponent } from "../components/AppBar";
import { SideBarComponent } from "../components/SideBar";

export interface NavigationBarProps {
  loading: Function;
  onVideoSelect: (nowPlaying: nowPlaying) => void;
  data: instructionals[];
  currentPlaying: nowPlaying;
}

export const MainNavigation = ({
  onVideoSelect,
  loading,
  data,
  currentPlaying,
}: NavigationBarProps) => {
  const [open, setOpen] = React.useState(true);
  const handleDrawer = () => {
    setOpen(!open);
    window.localStorage["Navigation"] = !open;
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <AppBarComponent onOpen={handleDrawer} />
      <SideBarComponent
        instructionalArr={data}
        openSideBar={open}
        closeSideBar={handleDrawer}
        onVideoSelect={onVideoSelect}
        currentPlaying={currentPlaying}
      />
    </>
  );
};
