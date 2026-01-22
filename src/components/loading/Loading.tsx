import { Box, Typography } from "@mui/material";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "gradient";
  label?: string;
  centered?: boolean;
}

export default function Loading({
  size = "md",
  color = "primary",
  label,
  centered = true,
}: LoadingProps) {
  const sizeConfig = {
    sm: { container: "h-10 w-10", border: "border-3", text: "text-sm" },
    md: { container: "h-14 w-14", border: "border-4", text: "text-base" },
    lg: { container: "h-20 w-20", border: "border-4", text: "text-lg" },
  };

  const colorConfig = {
    primary: {
      gradient: "from-primary via-primary/80 to-primary/60",
      text: "text-primary",
    },
    secondary: {
      gradient: "from-secondary via-secondary/80 to-secondary/60",
      text: "text-secondary",
    },
    gradient: {
      gradient: "from-primary via-accent to-secondary",
      text: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary",
    },
  };

  const config = sizeConfig[size];
  const colors = colorConfig[color];

  const spinner = (
    <Box className="flex flex-col items-center space-y-4">
      <Box className="relative">
        {/* Background pulse */}
        <Box
          className={`absolute inset-0 ${config.container} rounded-full bg-linear-to-r ${colors.gradient} opacity-20 animate-ping`}
        />

        {/* Main spinner */}
        <Box
          className={`
            ${config.container} ${config.border}
            rounded-full border-transparent
            animate-spin
          `}
          style={{
            background: `linear-gradient(white, white) padding-box,
                        conic-gradient(transparent 30%, var(--color-${color === "gradient" ? "primary" : color}), transparent 70%) border-box`,
          }}
        />

        {/* Inner circle */}
        <Box className="absolute inset-2 rounded-full border border-gray-200/50" />

        {/* Center dot */}
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Box
            className={`h-2 w-2 rounded-full bg-linear-to-r ${colors.gradient} animate-pulse`}
          />
        </Box>
      </Box>

      {label && (
        <Typography
          variant="body1"
          className={`font-medium ${colors.text} animate-pulse ${config.text}`}
        >
          {label}...
        </Typography>
      )}
    </Box>
  );

  if (centered) {
    return (
      <Box className="fixed inset-0 flex items-center justify-center bg-background overflow-hidden">
        {spinner}
      </Box>
    );
  }

  return spinner;
}
