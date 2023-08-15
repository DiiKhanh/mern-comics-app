import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

export const themeModes = {
  dark: 'dark',
  light: 'light'
};

const theme = extendTheme({
  colorSchemes: {
    dark: {
    },
    light: {
    }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true }
    }
  }
});

export default theme;