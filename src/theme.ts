import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#f1a332",
    },
    secondary: {
      main: "#757676",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    text: {
      primary: "#FFF",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    divider: "#212121",
  },
});
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#f1a332",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
