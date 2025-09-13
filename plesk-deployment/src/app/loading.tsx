"use client";

import { Box, CircularProgress, Typography } from "@mui/joy";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: 3,
      }}
    >
      <div className="animate-fade-in">
        <CircularProgress size="lg" color="primary" />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Typography level="body-lg" sx={{ color: "neutral.600" }}>
          Loading...
        </Typography>
      </div>
    </Box>
  );
}
