// src/components/HeroSection.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F9B4C1",
        textAlign: "center",
        padding: "30px",
        borderRadius: "8px",
        mt: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
        CODE WITH Kaz
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#283593", mt: 2, color: "white" }}
      >
        Join
      </Button>
    </Box>
  );
};

export default HeroSection;