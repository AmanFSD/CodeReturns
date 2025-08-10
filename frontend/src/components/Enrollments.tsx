import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Enrollment {
  id: string;
  student_name: string;
  course_title: string;
  enrolled_at: string;
}

const Enrollments: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/courses/instructor/enrollments/`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => setEnrollments(res.data));
  }, []);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Course Enrollments
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        {enrollments.map((enrollment) => (
          <Grid item xs={12} md={6} lg={4} key={enrollment.id}>
            <Card elevation={3}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "#1976D2" }}>
                    <PeopleIcon />
                  </Avatar>
                  <Typography variant="h6">
                    {enrollment.student_name}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Enrolled in:
                  <Typography component="span" sx={{ fontWeight: "bold", ml: 1 }}>
                    {enrollment.course_title}
                  </Typography>
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                  Date: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Enrollments;