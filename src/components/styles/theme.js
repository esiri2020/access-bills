import { createMuiTheme } from '@material-ui/core/styles';
// import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#868e96'
    },
    primary: {
      main: '#007bff'
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Palanquin',
      'sans-serif'
    ].join(',')
  },
  spacing: factor => `${0.5 * factor}rem`,
  overrides: {
    // Style sheet name ⚛️
    MuiPaper: {
      // Name of the rule
      rounded: {
        // Some CSS
        borderRadius: '16px',
      },
    },
  },
});

export default theme;
