import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { ListItemText, List } from "@mui/material";
import Collapse from "@mui/material/Collapse/Collapse";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import { FunctionComponent } from "react";

export const Instructional = ({
  name,
  videos,
}: {
  name: any;
  videos: string[];
}) => {
  const [listOpen, setListOpen] = React.useState(true);
  const handleClick = () => {
    setListOpen(!listOpen);
  };
  console.log(name);
  console.log(videos);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {listOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {videos.map((video: string) => {
            return (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={video} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
