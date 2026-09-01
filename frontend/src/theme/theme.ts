import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    clean: Palette['primary'];
    'error.light': Palette['primary'];
  }

  interface PaletteOptions {
    clean?: PaletteOptions['primary'];
    'error.light'?: PaletteOptions['primary'];
  }

  interface PaletteColor {
    secondary?: string;
  }

  interface SimplePaletteColorOptions {
    secondary?: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    clean: true;
    'error.light': true;
  }
}

export const theme = createTheme({
  palette: {
    clean: {
      main: '#000000',
    },
    'error.light': {
      main: '#ffeeee',
    },
    error: {
      main: '#dd4444',
      secondary: '#ffeeee',
    },
  },
});
