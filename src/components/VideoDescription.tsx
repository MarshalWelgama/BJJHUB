import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { nowPlaying } from "../types";

export default function VideoDescription({
  nowPlaying,
}: {
  nowPlaying: nowPlaying;
}) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar sx={{ alignSelf: "center" }}>
        <Avatar sx={{ bgcolor: "red" }}>SA</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={nowPlaying.name}
        secondary={
          <div>
            <div>{nowPlaying.subName}</div>
            <div>
              {" "}
              {nowPlaying.upNext ? (
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Up Next:
                  </Typography>{" "}
                  {nowPlaying.upNext}
                </>
              ) : (
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Instructional Complete
                  </Typography>
                </>
              )}
            </div>
          </div>
        }
      />
    </ListItem>
  );
}
