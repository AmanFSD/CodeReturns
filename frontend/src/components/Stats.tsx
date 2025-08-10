import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Stats: React.FC = () => {
  const [stats, setStats] = useState({ total_courses: 0, total_students: 0 });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/courses/instructor/stats/`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => setStats(res.data));
  }, []);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Instructor Statistics
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SchoolIcon fontSize="large" color="primary" />
                <Typography variant="h5" sx={{ ml: 2 }}>
                  Total Courses
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ mt: 2 }}>
                {stats.total_courses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon fontSize="large" color="secondary" />
                <Typography variant="h5" sx={{ ml: 2 }}>
                  Total Students
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ mt: 2 }}>
                {stats.total_students}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Stats;