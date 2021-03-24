import { createMuiTheme, PaletteType, responsiveFontSizes } from '@material-ui/core';

const mode = 'light';
const themeMode: PaletteType = mode === 'light' ? 'light' : 'dark';

// Create a theme instance.
const themeConfig = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    type: themeMode,
  },
};

const theme = createMuiTheme({ ...themeConfig });

export default responsiveFontSizes(theme);
