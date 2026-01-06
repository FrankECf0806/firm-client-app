"use client";

import { Typography, TextField, Button, Stack, Link, Box } from "@mui/material";
import NextLink from "next/link";

export default function SignupPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Create account
      </Typography>

      <Stack spacing={2}>
        <TextField label="Full name" fullWidth required />
        <TextField label="Email address" type="email" fullWidth required />
        <TextField label="Password" type="password" fullWidth required />
        <TextField
          label="Confirm password"
          type="password"
          fullWidth
          required
        />

        <Button variant="contained" size="large" fullWidth sx={{ mt: 1 }}>
          Sign Up
        </Button>

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link component={NextLink} href="/signin">
            Sign in
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
