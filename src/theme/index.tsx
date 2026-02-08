import { createTheme } from "@mui/material/styles";

export const elementColors = {
  primary: {
    light: "#79BBFF",
    main: "#409EFF",
    dark: "#337ECC",
    contrastText: "#FFFFFF",
  },
  success: {
    light: "#6fbf73",
    main: "#4caf50",
    dark: "#357a38",
    contrastText: "#FFFFFF",
  },
  warning: {
    light: "#ffb74d",
    main: "#ff9800",
    dark: "#f57c00",
    contrastText: "#000000",
  },
  error: {
    light: "#e57373",
    main: "#f44336",
    dark: "#d32f2f",
    contrastText: "#FFFFFF",
  },
  info: {
    light: "#64b5f6",
    main: "#2196f3",
    dark: "#1976d2",
    contrastText: "#FFFFFF",
  },
} as const;

const theme = createTheme({
  palette: {
    primary: elementColors.primary,
    success: elementColors.success,
    warning: elementColors.warning,
    error: elementColors.error,
    info: elementColors.info,
  },
  typography: {
    fontFamily: "var(--font-inter)",
    button: {
      textTransform: "capitalize" as const,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, // Tailwind sm
      md: 900, // Tailwind md
      lg: 1200, // Tailwind lg
      xl: 1536, // Tailwind xl
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          border: "1px solid #f3f4f6",
          backgroundColor: "#fff",
        },
      },
      defaultProps: {
        elevation: 12,
      },
    },
    MuiPopover: {
      defaultProps: {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: {
              borderRadius: 2,
              border: "1px solid #f3f4f6",
              elevation: 12,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          //   fontWeight: 400,
        },
      },
    },
  },
});

export default theme;
