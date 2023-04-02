import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function VideoDescription() {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar sx={{ alignSelf: "center" }}>
        <Avatar sx={{ bgcolor: "red" }}>SA</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Systematically Attacking The Guard"
        secondary={
          <div>
            <div>Volume 1</div>
            <div>
              {" "}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Up Next:
              </Typography>{" "}
              Volume 2
            </div>
          </div>
        }
      />
    </ListItem>
  );
}
