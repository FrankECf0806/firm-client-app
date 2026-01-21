"use client";

import { Button } from "@mui/material";
import { GlobalDialog } from "@/components/dialogs/GlobalDialog";
import { FormEvent, ReactNode, useRef } from "react";

type DialogFormProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  submitLabel: string;
  children: ReactNode;
};

export function DialogForm({
  open,
  onClose,
  title,
  subtitle,
  onSubmit,
  isSubmitting,
  submitLabel,
  children,
}: DialogFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const actions = (
    <>
      <Button
        type="button"
        variant="outlined"
        className="button-firm"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="button-firm"
        variant="contained"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </>
  );

  return (
    <GlobalDialog
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      actions={actions}
      formProps={{
        ref: formRef,
        onSubmit,
        noValidate: true,
      }}
      disableBackdropClose
    >
      {children}
    </GlobalDialog>
  );
}
