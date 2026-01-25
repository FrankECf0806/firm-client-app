import { TextField } from "@mui/material";
import { ComponentProps } from "react";

export type ClearableSelectProps = {
  value: string;
  onChange: (value: string) => void;
  clearable?: boolean;
  required?: boolean;
  disabled?: boolean;
} & Omit<ComponentProps<typeof TextField>, "onChange">;
