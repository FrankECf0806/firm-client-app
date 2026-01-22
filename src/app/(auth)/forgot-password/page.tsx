"use client";

import { TextField, Stack, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { useForm, Controller } from "react-hook-form";
import { ForgotPasswordValues } from "@/types/auth";

export default function ForgotPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordValues>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log(data);
  };

  return (
    <>
      <AuthForm
        title="Reset password"
        subtitle="Enter your email address and we’ll send you a reset link."
        submitLabel="Send reset link"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                className="input-rounded-firm"
                label="Email address"
                type="email"
                fullWidth
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>
      </AuthForm>

      <Typography variant="body2" align="center" className="mt-2">
        Remembered your password?{" "}
        <Link component={NextLink} href="/signin">
          Sign in
        </Link>
      </Typography>
    </>
  );
}
