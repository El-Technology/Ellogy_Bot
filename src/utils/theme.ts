import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      tablet: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
