import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2'
    },
    secondary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
