"use client";

import { TextField, Stack, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { useForm, Controller, useWatch } from "react-hook-form";
import { SignupValues } from "@/types/auth";

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    mode: "onBlur",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = (data: SignupValues) => {
    console.log(data);
  };

  return (
    <>
      <AuthForm
        title="Create account"
        submitLabel="Sign Up"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Full name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                className="input-rounded-firm"
                label="Full name"
                fullWidth
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
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

          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                className="input-rounded-firm"
                label="Password"
                type="password"
                fullWidth
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="confirm"
            control={control}
            rules={{
              required: "Confirm your password",
              validate: (v) => v === password || "Passwords do not match",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                className="input-rounded-firm"
                label="Confirm password"
                type="password"
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
        Already have an account?{" "}
        <Link component={NextLink} href="/signin">
          Sign in
        </Link>
      </Typography>
    </>
  );
}
