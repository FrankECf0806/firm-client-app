import { ReactNode, FormEvent, RefObject } from "react";

export interface GlobalDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  dangerAction?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  formProps?: {
    ref: RefObject<HTMLFormElement | null>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    noValidate?: boolean;
  };
  disableBackdropClose?: boolean;
}
