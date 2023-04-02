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

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  navbarActive: boolean;
  open?: boolean;
}>(({ theme, open, navbarActive }) => ({
  flexGrow: 1,
  opacity: navbarActive ? 0.1 : "",
  pointerEvents: navbarActive ? "none" : "all",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const MainNavigation = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleDrawer = () => {
    setOpen(!open);
  };

  interface instructionals {
    name: String;
    volumes: string[];
  }

  const instructionalArr: instructionals[] = [
    { name: "Systematicly Attacking", volumes: ["Vol1", "Vol2", "Vol3"] },
    { name: "Go Further Faster", volumes: ["Vol1"] },
    { name: "New Wave BJJ", volumes: ["Vol1", "Vol2"] },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "black", color: "white" }}
          enableColorOnDark
        >
          <Toolbar style={{ minHeight: "46px" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              // sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BJJFANATICS
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            zIndex: theme.zIndex.appBar - 1,
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "#212121",
              border: "#212121",
              marginTop: "45px",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {/* {openModal && (
            <UploadModal openModal={openModal} handleClose={handleClose} />
          )} */}
          <Divider style={{ backgroundColor: theme.palette.grey[800] }} />
          <List style={{ backgroundColor: theme.palette.grey[900] }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon>{<UploadIcon />}</ListItemIcon>
                <ListItemText primary={"Upload"} />
              </ListItemButton>
            </ListItem>
            <Divider style={{ backgroundColor: theme.palette.grey[800] }} />
            <>
              {instructionalArr.map((item, index) => {
                return <Instructional name={item.name} videos={item.volumes} />;
              })}
            </>
          </List>
        </Drawer>
      </Box>

      <Main
        style={{
          padding: "50px 0px 0px 0px",
          transition: ".2s cubic-bezier(.4,0,.2,1)",
        }}
        open={true}
        navbarActive={open}
      >
        <VideoStream />
      </Main>
    </>
  );
};
