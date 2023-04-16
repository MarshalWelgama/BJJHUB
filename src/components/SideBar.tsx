import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import UploadIcon from "@mui/icons-material/Upload";
import { Instructional } from "../components/Instructional";
import AppBar from "@mui/material/AppBar";
import { volumes, nowPlaying, instructionals } from "../types";
import { NavigationBarProps } from "../screens/MainNavigation";

export const SideBarComponent = ({
  instructionalArr,
  openSideBar,
  onVideoSelect,
  closeSideBar,
}: {
  instructionalArr: instructionals[];
  openSideBar: boolean;
  onVideoSelect: (nowPlaying: nowPlaying) => void;
  closeSideBar: () => void;
}) => {
  const theme = useTheme();
  const drawerWidth = 250;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          zIndex: theme.zIndex.appBar - 1,
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#212121",
            border: "#212121",
            marginTop: "45px",
          },
        }}
        anchor="left"
        open={openSideBar}
        onClose={closeSideBar}
      >
        {/* {openModal && (
            <UploadModal openModal={openModal} handleClose={handleClose} />
          )} */}
        <Divider style={{ backgroundColor: theme.palette.grey[800] }} />
        <List style={{ backgroundColor: theme.palette.grey[900] }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => console.log("handleOpen")}>
              <ListItemIcon>{<UploadIcon />}</ListItemIcon>
              <ListItemText primary={"Upload"} />
            </ListItemButton>
          </ListItem>
          <Divider style={{ backgroundColor: theme.palette.grey[800] }} />
          <>
            {instructionalArr.map((item, index) => {
              return (
                <Instructional
                  name={item.name}
                  videos={item.volumes}
                  handleNowPlaying={onVideoSelect}
                  closeSideBar={closeSideBar}
                />
              );
            })}
          </>
        </List>
      </Drawer>
    </Box>
  );
};
