"use client";

import { Box, Button, Typography } from "@mui/material";
import { FormEvent, ReactNode, useRef } from "react";

type AuthFormProps = {
  title: string;
  subtitle?: string;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export function AuthForm({
  title,
  subtitle,
  submitLabel,
  isSubmitting,
  onSubmit,
  children,
}: AuthFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Box
      component="form"
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      sx={{ width: "100%" }}
    >
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {subtitle}
        </Typography>
      )}

      {children}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : submitLabel}
      </Button>
    </Box>
  );
}
