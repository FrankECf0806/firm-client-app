import { TextFieldProps } from "@mui/material/TextField";

export type SearchInputProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  clearable?: boolean;
};
