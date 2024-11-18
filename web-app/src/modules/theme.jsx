import { createTheme } from '@mui/material/styles';
import { blue, grey, red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#1976d2',
  },
  secondary: {
    main: '#0288d1',
  },
  warning: {
    main: '#ffc071',
  },
  error: {
    main: red[500],
  },
  success: {
    main: '#00e676',
  },
  background: {
    default: '#ebedff',
    secondary: '#ffffff',
    placeholder: grey[200],
  },
  text: {
    primary: '#000000',
    secondary: grey[900],
  },
  link: {
    primary: '#1976d2',
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#0a0f2e',
  },
  secondary: {
    main: '#016093',
  },
  warning: {
    main: '#ffb74d',
  },
  error: {
    main: red[300],
  },
  success: {
    main: '#66bb6a',
  },
  background: {
    default: '#0a0f2e',
    secondary: '#10184c',
    placeholder: grey[900],
  },
  text: {
    primary: '#ffffff',
    secondary: grey[100],
  },
  link: {
    primary: '#0288d1',
  },
};

export default function theme(themeType) {
  return createTheme({
    palette: themeType === 'Light' ? lightPalette : darkPalette,
    typography: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,

      h1: {
        fontSize: 60,
      },
      h2: {
        fontSize: 48,
      },
      h3: {
        fontSize: 42,
        [createTheme().breakpoints.down('md')]: { fontSize: 24 },

      },
      h4: {
        fontSize: 36,
        [createTheme().breakpoints.down('md')]: { fontSize: 16 },

      },
      h5: {
        fontSize: 20,
        [createTheme().breakpoints.down('md')]: { fontSize: 16 },

      },
      h6: {
        fontSize: 18,
      },
      subtitle1: {
        fontSize: 18,
      },
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
      },
    },
    shape: {
      borderRadius: '40px',
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 3,
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: '16px',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            borderRadius: '16px',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            a: {
              color: themeType === 'Light' ? lightPalette.link.primary : darkPalette.link.primary,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label.Mui-focused': {
              color: lightPalette.primary.main
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: lightPalette.primary.main
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: lightPalette.primary.main
              },
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: lightPalette.primary.main
            },
          },
        },
      },
    },
  });
}
