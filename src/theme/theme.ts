import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  }
});
