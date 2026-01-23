"use client";

import { TextField, Link, Box, Typography } from "@mui/material";
import NextLink from "next/link";
import { AuthForm } from "@/components/forms/AuthForm";
import { useForm, Controller } from "react-hook-form";
import { SigninValues } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function Signin() {
  const router = useRouter();
  const { setAuthenticated, setTempAuthToken } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SigninValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SigninValues) => {
    console.log(data);
    setTempAuthToken();
    setAuthenticated(true);
    router.replace("/");
  };

  return (
    <>
      <AuthForm
        title="Sign In"
        submitLabel="Sign In"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              label="Email address"
              type="email"
              fullWidth
              required
              margin="dense"
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
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Link component={NextLink} href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>
      </AuthForm>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don’t have an account?{" "}
        <Link component={NextLink} href="/signup">
          Sign up
        </Link>
      </Typography>
    </>
  );
}
