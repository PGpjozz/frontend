import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0056A3" },
    secondary: { main: "#FF9800" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
  },
});

export default theme;
