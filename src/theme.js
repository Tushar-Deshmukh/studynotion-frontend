import { createTheme } from "@mui/material/styles";

const baseLightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#FFD60A",
    },
    secondary: {
      main: "#1FA2FF",
    },
    background: {
      default: "#000",
      paper: "#161D29",
    },
    text: {
      primary: "#F1F2FF",
      secondary: "#AFB2BF",
    },
  },
};

const baseDarkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#161D29",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
};

export const lightTheme = createTheme({
  ...baseLightTheme,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontFamily: "Inter",
        },
        contained: {
          boxShadow: "none",
          backgroundColor: baseLightTheme.palette.primary.main,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inter",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {},

        outlined: {
          background: "#161D29",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // This targets the `MuiOutlinedInput-root` class
          color: "#999DAA",
          fontFamily: "Inter",
          background: "#161D29",
          boxShadow: "inset 0px -1px 0px 0px #FFFFFF",
          borderRadius: "8px",

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: baseLightTheme.palette.primary.main,
          },

          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: baseLightTheme.palette.secondary.main,
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
          },
        },
        notchedOutline: {
          borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
          borderWidth: "1px",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseDarkTheme,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
        },
        contained: {
          boxShadow: "none",
          backgroundColor: baseDarkTheme.palette.primary.main,
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
