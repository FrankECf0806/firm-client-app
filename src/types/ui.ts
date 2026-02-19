import { SvgIconComponent } from "@mui/icons-material";
import { ChipProps, TextFieldProps } from "@mui/material";

export interface ClearableSelectProps extends Omit<TextFieldProps, "onChange"> {
  value: string;
  clearValue?: string;
  onChange: (value: string) => void;
  clearable?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface ConfigItem<K extends string = string> {
  label: string;
  onClick: (setValue: (value: K) => void) => void;
  styling?: {
    // Either use MUI color
    color?: ChipProps["color"];
    // OR use custom classes
    selectedClass?: string;
    unselectedClass?: string;
    // OR use custom sx prop
    sx?: ChipProps["sx"];
    // OR use an icon
    icon?: SvgIconComponent;
  };
}

// Filter
export type QuickFilterChipsProps<K extends string> = {
  title: string;
  items: [K, ConfigItem<K>][];
  value: K;
  onChange: (value: K) => void;
};

// ResettableSelect
export type OptionsMap = Record<string, string>;

export type ResettableSelectProps<T extends OptionsMap> = {
  label: string;
  value: string;
  onChange: (value: string) => void;

  options: T;

  resetValue: string;
  resetLabel: string;

  size?: "small" | "medium";
  className?: string;
  disabled?: boolean;
};
