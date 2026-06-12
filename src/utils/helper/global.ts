import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { NavItem } from "@/types/navbar";

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

const normalize = (path: string) =>
  path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;

export function getActiveNavPath(
  pathname: string,
  items: readonly NavItem[],
): string | null {
  const current = normalize(pathname);

  let bestMatch: string | null = null;
  let bestScore = -1;

  for (const item of items) {
    const target = item.normalizedPath;

    let score = -1;

    if (item.type === "exact") {
      if (current !== target) continue;

      score = 1000 + target.length;
    } else if (item.type === "prefix") {
      const matches = current === target || current.startsWith(`${target}/`);

      if (!matches) continue;

      score = target.length;
    } else {
      continue;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item.path;
    }
  }

  return bestMatch;
}
