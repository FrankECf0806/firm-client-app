"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GlobalDialogProps } from "@/types/global";

export function GlobalDialog({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = "sm",
  formProps,
  disableBackdropClose = false,
}: GlobalDialogProps) {
  const handleClose = (
    _event: object,
    reason: "backdropClick" | "escapeKeyDown",
  ) => {
    if (disableBackdropClose && reason === "backdropClick") {
      return;
    }
    onClose();
  };

  const wrapperProps = formProps ? { component: "form", ...formProps } : {};

  return (
    <Dialog
      className="shadow-2xl"
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          className: "rounded-xl overflow-x-hidden max-h-[90vh]",
        },
      }}
    >
      {/* Wrap the entire dialog paper in form if formProps provided */}
      <Box
        {...wrapperProps}
        className="h-full flex flex-col text-primary rounded-xl overflow-hidden "
      >
        {/* Header */}
        <DialogTitle className="relative shrink-0">
          <Box className="flex flex-col pr-10">
            {title && (
              <Typography variant="h6" className="font-semibold">
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                className="leading-none"
                variant="caption"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            className="hover:bg-primary/10 absolute top-3 right-3"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Body */}
        <DialogContent className="px-6 py-5 overflow-y-auto grow" dividers>
          <Box className="flex flex-col gap-3.5 h-full">{children}</Box>
        </DialogContent>

        {/* Actions */}
        {actions && (
          <DialogActions className="px-6 py-4 shrink-0">
            {actions}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}
