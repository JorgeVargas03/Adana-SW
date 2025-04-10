// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primaryBG: {
        main: '#F0F1D2', //Background Color
    },
    primaryBar: {
        main: '#FFFDEF', //NavBar BG
    },
    fontColor: {
        main: '#413324', //Font Color
    },
    secondary: {
        main: '#C3C37E', //Contraste 1
    },
    secondary2: {
        main: '7E7EC3', //Contraste 2
    }
  },
  // Puedes agregar otras personalizaciones como tipografía, spacing, etc.
  typography: {
    fontFamily: 'Outfit, sans-serif',
  },
});

export default theme;
