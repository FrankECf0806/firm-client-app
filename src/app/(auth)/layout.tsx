import { Grid, Paper } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid className="bg-white" container spacing={1} minHeight={"100vh"}>
      {/* Left image (desktop only) */}
      <Grid
        size={{ xs: 0, sm: 0, md: 6, lg: 8 }}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          backgroundImage: "url('/images/law-gavel.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      />
      {/* Form Component */}
      <Grid
        className="bg-primary-light/10 dark:bg-primary-dark/10"
        size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/law-gavel.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: { xs: 0.1, md: 0 },
            zIndex: 0,
          },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            p: 4,
            margin: 2,
            backgroundColor: "background.paper",
          }}
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
}
