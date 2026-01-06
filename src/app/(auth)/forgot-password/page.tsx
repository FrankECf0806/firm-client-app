"use client";

import { Typography, TextField, Button, Stack, Box, Link } from "@mui/material";
import NextLink from "next/link";

export default function ForgotPasswordPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Reset password
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Enter your email address and we’ll send you a reset link.
      </Typography>

      <Stack spacing={2}>
        <TextField label="Email address" type="email" fullWidth required />

        <Button variant="contained" size="large" fullWidth>
          Send reset link
        </Button>

        <Typography variant="body2" align="center">
          Remembered your password?{" "}
          <Link component={NextLink} href="/signin">
            Sign in
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
