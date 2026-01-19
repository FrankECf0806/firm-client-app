import { FormHTMLAttributes, ReactNode } from "react";

export interface GlobalDialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  // Form-specific props
  formProps?: FormHTMLAttributes<HTMLFormElement> & {
    ref?: React.Ref<HTMLFormElement>;
  };
  disableBackdropClose?: boolean;
}
