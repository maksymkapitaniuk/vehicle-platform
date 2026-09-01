import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    text?: string;
  }

  interface SimplePaletteColorOptions {
    text?: string;
  }
}

export const theme = createTheme({
  palette: {
    error: {
      main: '#dd4444',
      text: '#ffeeeeee',
    },
  },
});
