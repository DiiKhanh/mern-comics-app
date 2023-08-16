import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

export const themeModes = {
  dark: 'dark',
  light: 'light'
};

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#55E6C1',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#f44336',
          contrastText: '#ffffff'
        },
        background: {
          default: '#000000',
          paper: '#131313'
        }
      }
    },
    light: {
      palette: {
        primary: {
          main: '#55E6C1'
        },
        secondary: {
          main: '#f44336'
        },
        background: {
          default: colors.grey['100']
        }
      }
    }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true }
    }
  }
});

export default theme;