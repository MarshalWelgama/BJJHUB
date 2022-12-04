import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainNavigation } from "./screens/MainNavigation";
import { AppBar, IconButton, Toolbar, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { OpenInBrowserSharp } from "@mui/icons-material";

export default function App() {
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Router>
        <Routes>
          <Route
            path="/"
            element={<MainNavigation handleDrawer={handleDrawer} open={open} />}
          ></Route>
        </Routes>
      </Router>
    </div>
    // <>
    //   <ButtonAppBar />
    //   <Container>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Create React App example with TypeScript
    //     </Typography>
    //   </Container>
    // </>
  );
}
