import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    orange: Palette["primary"];
  }
  interface PaletteOptions {
    orange?: PaletteOptions["primary"];
  }
}

const baseOptions = {
  typography: {
    fontFamily: "var(--font-lexend), Arial, sans-serif",
    h3: {
      fontSize: "24px",
    },
    h4: {
      fontSize: "18px",
    },
    h5: {
      fontSize: "16px",
    },
    body1: {
      fontSize: "14px",
    },
    body2: {
      fontSize: "12px",
    },
    subtitle1: {
      fontSize: "10px",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
};

export const lightTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "light",
    primary: {
      light: "#343B4F",
      main: "#6C72FF",
      dark: "#9A91FB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#9A91FB",
      main: "#57C3FF",
      dark: "#101935",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#FDB52A",
      contrastText: "#101935",
    },

    error: {
      light: "#E49191",
      main: "#EB4040",
      dark: "#C93A3A",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#080F25",
      paper: "#101935",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#AEB9E1",
      disabled: "#7E89AC",
    },

    divider: "#343B4F",
  },
});

export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "dark",
    primary: {
      light: "#343B4F",
      main: "#6C72FF",
      dark: "#9A91FB",
      contrastText: "#FFFFFF",
    },

    secondary: {
      light: "#9A91FB",
      main: "#57C3FF",
      dark: "#101935",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#FDB52A",
      contrastText: "#101935",
    },

    error: {
      light: "#E49191",
      main: "#EB4040",
      dark: "#C93A3A",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#080F25",
      paper: "#101935",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#AEB9E1",
      disabled: "#7E89AC",
    },

    divider: "#343B4F",
  },
});
