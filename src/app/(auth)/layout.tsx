"use client";

import { Box, Grid, Paper } from "@mui/material";
import Image from "next/image";
import lawGavel from "public/images/law-gavel.jpg";
import { useState, ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  return (
    <Grid className="bg-white" container spacing={1} minHeight={"100vh"}>
      {/* Left image (desktop only) */}
      <Grid
        size={{ xs: 0, sm: 0, md: 6, lg: 8 }}
        className="relative hidden md:block overflow-hidden"
      >
        <Box
          className={`
            absolute inset-0
            bg-primary/5
            transition-opacity duration-500
            ${desktopLoaded ? "opacity-0" : "opacity-100"}
          `}
        />
        <Image
          src={lawGavel}
          alt="Law Firm Image"
          fill
          preload
          quality={75}
          placeholder="blur"
          className="object-cover opacity-80"
          onLoad={() => setDesktopLoaded(true)}
        />
      </Grid>

      {/* Form Component */}
      <Grid
        size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
        className="
          relative
          flex
          items-center
          justify-center
          min-h-screen
          bg-gray-50
          overflow-hidden
        "
      >
        <Box
          className="
            absolute
            inset-0
            block
            md:hidden
            z-0
          "
        >
          <Box
            className={`
              absolute inset-0
              bg-primary/5
              transition-opacity duration-500
              ${mobileLoaded ? "opacity-0" : "opacity-100"}
            `}
          />
          <Image
            src={lawGavel}
            alt="Law Firm Image"
            fill
            sizes="100vw"
            quality={60}
            placeholder="blur"
            className="object-cover opacity-20 object-center"
            onLoad={() => setMobileLoaded(true)}
          />
        </Box>
        <Paper
          elevation={8}
          className="
            relative
            z-10
            w-full
            max-w-105
            rounded-2xl
            p-8
            m-2
            bg-white
          "
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
}
