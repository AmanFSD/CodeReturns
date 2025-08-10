// src/pages/InterviewPrepPage.tsx
import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, Navigate } from "react-router-dom";

const companies = [
  { slug: "meta-facebook",   name: "Facebook", icon: <FacebookIcon sx={{ fontSize: 60, color: "#1877F2" }} /> },
  { slug: "apple",           name: "Apple",    icon: <AppleIcon    sx={{ fontSize: 60, color: "#000"     }} /> },
  { slug: "netflix",         name: "Netflix",  icon: <YouTubeIcon  sx={{ fontSize: 60, color: "#E50914" }} /> },
  { slug: "google",          name: "Google",   icon: <CardMedia
                                                   component="img"
                                                   src="/src/assets/icons/google.png"
                                                   alt="Google"
                                                   sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
                                                 /> },
];

const InterviewPrepPage: React.FC = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        INTERVIEW PREP
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {companies.map((c) => (
          <Grid item xs={12} sm={6} md={6} key={c.slug}>
            <Link to={`/interview-prep/${c.slug}`} style={{ textDecoration: "none" }}>
              <Card sx={{ p: 2, height: 250, textAlign: "center", cursor: "pointer" }}>
                {c.icon}
                <CardContent>
                  <Typography variant="h6" color="textPrimary">
                    {c.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InterviewPrepPage;
