import { ReactNode, FormEvent, RefObject } from "react";
import { ConfigItem } from "./ui";

// Global Dialog Props
export interface GlobalDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  headerChip?: ReactNode;
  headerMenu?: ReactNode;
  children: ReactNode;
  footerActions?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  formProps?: {
    ref: RefObject<HTMLFormElement | null>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    noValidate?: boolean;
  };
  disableBackdropClose?: boolean;
}

// DialogForm Props
export type DialogFormProps<T extends string = string> = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  chipConfig?: DialogChipConfig<T>;
  headerMenuItems?: headerMenuItem[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  submitLabel: string;
  onDelete?: () => void;
  deleteEntityName?: string;
  children: ReactNode;
};

// Menu Item Props
export type headerMenuItem = {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

// Chip Config Props
export interface DialogChipConfig<T extends string = string> {
  value: T;
  config: Record<T, ConfigItem<T>>;
  onChange: (value: T) => void;
}

export type CalendarStats = {
  today: number;
  week: number;
  month: number;
};
