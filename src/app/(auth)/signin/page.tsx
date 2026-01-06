"use client";

import { Typography, TextField, Button, Link, Box } from "@mui/material";
import NextLink from "next/link";

export default function Signin() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Sign In
      </Typography>

      <TextField
        label="Email address"
        type="email"
        variant="outlined"
        color="primary"
        fullWidth
        required
        margin="dense"
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        margin="dense"
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Link component={NextLink} href="/forgot-password" variant="body2">
          Forgot password?
        </Link>
      </Box>

      <Button variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
        Sign In
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don’t have an account?{" "}
        <Link component={NextLink} href="/signup">
          Sign up
        </Link>
      </Typography>
    </Box>
  );
}
