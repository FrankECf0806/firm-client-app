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
  headerChip,
  headerMenu,
  children,
  footerActions,
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
      <Box
        {...wrapperProps}
        className="h-full flex flex-col text-primary rounded-xl overflow-hidden"
      >
        <DialogTitle className="shrink-0 p-4 pb-1">
          {/* First row: title + chip + menu + close */}
          <Box className="flex justify-between items-center gap-2">
            <Box className="flex items-center gap-2 min-w-0">
              {title && (
                <Typography
                  variant="h6"
                  className="font-semibold leading-tight truncate"
                >
                  {title}
                </Typography>
              )}
              {headerChip}
            </Box>
            <Box className="flex items-center gap-1 shrink-0">
              {headerMenu}
              <IconButton onClick={onClose} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          {/* Second row: subtitle – directly below, no extra margin */}
          {subtitle && (
            <Typography
              variant="caption"
              color="text.secondary"
              className="block leading-tight mt-0.5"
            >
              {subtitle}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent className="px-6 py-5 overflow-y-auto grow" dividers>
          <Box className="flex flex-col gap-3.5 h-full">{children}</Box>
        </DialogContent>

        {footerActions && (
          <DialogActions className="px-6 py-4 shrink-0">
            {footerActions}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}
