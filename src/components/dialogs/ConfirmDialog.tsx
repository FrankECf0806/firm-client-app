"use client";

import { Button, Box, Typography } from "@mui/material";
import { GlobalDialog } from "@/components/dialogs/GlobalDialog";
import { ReactNode } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "error" | "warning" | "success";
  loading?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirm action",
  description = "Are you sure you want to perform this action? This cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "error",
  loading = false,
  maxWidth = "xs",
}: ConfirmDialogProps) {
  const footerActions = (
    <>
      <Button
        type="button"
        variant="outlined"
        className="button-firm"
        onClick={onClose}
        disabled={loading}
      >
        {cancelText}
      </Button>
      <Button
        type="button"
        variant="contained"
        color={confirmColor}
        className="button-firm"
        onClick={onConfirm}
        disabled={loading}
      >
        {loading ? "Processing..." : confirmText}
      </Button>
    </>
  );

  return (
    <GlobalDialog
      open={open}
      onClose={onClose}
      title={title}
      footerActions={footerActions}
      maxWidth={maxWidth}
      disableBackdropClose
    >
      <Box className="py-2">
        {typeof description === "string" ? (
          <Typography variant="body2" className="text-gray-600">
            {description}
          </Typography>
        ) : (
          description
        )}
      </Box>
    </GlobalDialog>
  );
}
