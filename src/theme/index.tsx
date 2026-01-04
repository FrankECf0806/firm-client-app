import { createTheme } from "@mui/material/styles";

export const elementColors = {
  primary: {
    light: "#79BBFF",
    main: "#409EFF",
    dark: "#337ECC",
    contrastText: "#FFFFFF",
  },
} as const;

const theme = createTheme({
  palette: {
    primary: elementColors.primary,
  },
  typography: {
    fontFamily: "var(--font-inter)",
  },
});

export default theme;
