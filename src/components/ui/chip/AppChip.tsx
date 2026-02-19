import { Chip, ChipProps as MuiChipProps } from "@mui/material";
import clsx from "clsx";
import { ConfigItem } from "@/types/ui";

export interface AppChipProps extends Omit<MuiChipProps, "onClick"> {
  config: ConfigItem;
  selected?: boolean;
  onClick?: () => void;
}

export function AppChip({
  config,
  selected,
  onClick,
  className,
  ...rest
}: AppChipProps) {
  const { label, styling = {} } = config;

  const chipProps: MuiChipProps = {
    label,
    onClick,
    ...rest,
  };

  // Variant handling
  if (selected !== undefined) {
    chipProps.variant = selected ? "filled" : "outlined";
  }

  // Class name handling (user class + selected/unselected class)
  chipProps.className = clsx(
    className,
    selected ? styling.selectedClass : styling.unselectedClass,
  );

  // Optional color from config
  if (styling.color) {
    chipProps.color = styling.color;
  }

  // Optional sx overrides from config
  if (styling.sx) {
    chipProps.sx = styling.sx;
  }

  return <Chip {...chipProps} />;
}
