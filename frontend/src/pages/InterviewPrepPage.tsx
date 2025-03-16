import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import YouTubeIcon from "@mui/icons-material/YouTube";

const InterviewPrep: React.FC = () => {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Interview Prep</Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Facebook Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <FacebookIcon sx={{ fontSize: 60, color: "#1877F2" }} />
            <CardContent>
              <Typography variant="h6">Facebook</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Apple Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <AppleIcon sx={{ fontSize: 60, color: "#000" }} />
            <CardContent>
              <Typography variant="h6">Apple</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Netflix Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <YouTubeIcon sx={{ fontSize: 60, color: "#FF0000" }} />
            <CardContent>
              <Typography variant="h6">Netflix</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterviewPrep;