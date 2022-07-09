import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export { makeStyles } from "@mui/styles/makeStyles";
export { styled } from "@mui/system";

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
    fontSize: 14,
    h1: {
      fontSize: 50,
      fontWeight: 500,
    },
    h2: {
      fontSize: 40,
      fontWeight: 500,
    },
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  }
});
export const theme = responsiveFontSizes(MuiTheme);
