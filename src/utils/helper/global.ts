import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";

const getThemeColorFromTheme = (theme: Theme, colorKey?: string): string => {
  const key = colorKey ?? "primary";

  const paletteColor = theme.palette[key as keyof typeof theme.palette];

  if (
    paletteColor &&
    typeof paletteColor === "object" &&
    "main" in paletteColor
  ) {
    return paletteColor.main;
  }

  return "#000000";
};

export const useHelperFunctions = () => {
  const theme = useTheme();

  const getThemeColor = (colorKey?: string): string => {
    return getThemeColorFromTheme(theme, colorKey);
  };

  return {
    getThemeColor,
  };
};

export const normalizeUrl = (url: string): string => {
  if (!url) return "";

  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
};
