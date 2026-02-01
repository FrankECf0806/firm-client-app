import { ChipProps, TextField } from "@mui/material";
import { ComponentProps } from "react";

export type ClearableSelectProps = {
  value: string;
  clearValue?: string;
  onChange: (value: string) => void;
  clearable?: boolean;
  required?: boolean;
  disabled?: boolean;
} & Omit<ComponentProps<typeof TextField>, "onChange">;

export interface QuickFilterItem<K extends string = string> {
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
  };
}

export type QuickFilterChipsProps<K extends string> = {
  title: string;
  items: [K, QuickFilterItem<K>][];
  value: K;
  onChange: (value: K) => void;
};
