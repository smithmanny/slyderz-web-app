import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#E54E44'
    },
    secondary: {
      main: '#14A3A5'
    },
    white: {
      main: '#FFF'
    },
    content: {
      main: '#484848'
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
  typography: {
    fontSize: 12,
    h1: {
      fontSize: '50px',
      fontWeight: 500
    }
  },
  overrides: {
    MuiButton: {
      root: {
        boxShadhow: 'none'
      }
    },
    MuiFab: {
      root: {
        boxShadow: 'none'
      }
    }
  }
});
const theme = responsiveFontSizes(muiTheme);

export default theme;
