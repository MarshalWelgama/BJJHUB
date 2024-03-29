import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { ListItemText, List } from "@mui/material";
import Collapse from "@mui/material/Collapse/Collapse";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import React from "react";
import { nowPlaying, volumes } from "../types";
import CloudIcon from "@mui/icons-material/Cloud";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

export const Instructional = ({
  name,
  videos,
  handleNowPlaying,
  closeSideBar,
  currentPlaying,
}: {
  name: any;
  videos: volumes[];
  handleNowPlaying: (nowPlaying: nowPlaying) => void;
  closeSideBar: () => void;
  currentPlaying: nowPlaying;
}) => {
  const [listOpen, setListOpen] = React.useState(false);
  const handleClick = () => {
    setListOpen(!listOpen);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CloudIcon
            color={currentPlaying.name === name ? "primary" : "secondary"}
          />
        </ListItemIcon>
        <ListItemText primary={name} />
        {listOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {videos.map((video: volumes, index: number) => {
            return (
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  closeSideBar();
                  handleNowPlaying({
                    name: name,
                    subName: video.volume,
                    url: video.link,
                    upNext:
                      videos[index + 1] && videos[index + 1].volume
                        ? videos[index + 1].volume
                        : undefined,
                  });
                }}
              >
                <ListItemIcon>
                  <PlayCircleOutlinedIcon
                    color={
                      currentPlaying.subName === video.volume
                        ? "primary"
                        : "secondary"
                    }
                  />
                </ListItemIcon>
                <ListItemText primary={video.volume} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
