import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

const InterviewPrep: React.FC = () => {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        INTERVIEW PREP
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Facebook Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Link to="/exercises" style={{ textDecoration: "none" }}>
            <Card sx={{ p: 2, height: 250, textAlign: "center", cursor: "pointer" }}>
              <FacebookIcon sx={{ fontSize: 60, color: "#1877F2" }} />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Facebook
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        {/* Apple Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Link to="/exercises" style={{ textDecoration: "none" }}>
            <Card sx={{ p: 2, height: 250, textAlign: "center", cursor: "pointer" }}>
              <AppleIcon sx={{ fontSize: 60, color: "#000" }} />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Apple
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        {/* Netflix Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Link to="/exercises" style={{ textDecoration: "none" }}>
            <Card sx={{ p: 2, height: 250, textAlign: "center", cursor: "pointer" }}>
              <YouTubeIcon sx={{ fontSize: 60, color: "#E50914" }} />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Netflix
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        {/* Google Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Link to="/exercises" style={{ textDecoration: "none" }}>
            <Card sx={{ p: 2, height: 250, textAlign: "center", cursor: "pointer" }}>
              <CardMedia
                component="img"
                src="/src/assets/icons/google.png"
                alt="Google"
                sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Google
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterviewPrep;