import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import React from "react";

export const AppBarComponent = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#121213", color: "white" }}
      enableColorOnDark
    >
      <Toolbar style={{ minHeight: "46px" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          edge="start"
          // sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BJJHUB
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
