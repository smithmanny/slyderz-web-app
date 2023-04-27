import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export { default } from "@mui/styles/makeStyles";
export { styled } from "@mui/material/styles";

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#E54E44",
    },
    secondary: {
      main: "#14A3A5",
    },
    white: {
      main: "#FFF",
    },
    grey: {
      main: "#f3f7f5",
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    h1: {
      fontSize: 50,
      fontWeight: 500,
    },
    h2: {
      fontSize: 40,
      fontWeight: 500,
    },
    h3: {
      fontSize: 18,
      fontWeight: 450,
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: 16,
    },
    allVariants: {
      letterSpacing: "1.2px",
      lineHeight: 2,
    },
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
});
export const theme = responsiveFontSizes(MuiTheme);
