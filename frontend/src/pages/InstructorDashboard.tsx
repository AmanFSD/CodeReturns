
import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InstructorDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        🎓 Instructor Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Upload New Course */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>📹 Upload New Course</Typography>
            <Button variant="contained" onClick={() => navigate("/instructor/upload")}>
              Upload
            </Button>
          </Paper>
        </Grid>

        {/* View My Courses */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>📂 View My Courses</Typography>
            <Button variant="contained" onClick={() => navigate("/instructor/my-courses")}>
              View
            </Button>
          </Paper>
        </Grid>

        {/* See Who Enrolled */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>👨‍🎓 See Who Enrolled</Typography>
            <Button variant="contained" onClick={() => navigate("/instructor/enrollments")}>
              View Enrollments
            </Button>
          </Paper>
        </Grid>

        {/* Course Stats */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>📊 Course Stats</Typography>
            <Button variant="contained" onClick={() => navigate("/instructor/stats")}>
              View Stats
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstructorDashboard;
