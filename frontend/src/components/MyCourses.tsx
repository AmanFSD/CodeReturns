import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Course {
  id: string;
  title: string;
  image?: string;
  enrolled_count: number;
  average_rating: number;
}

const MyCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/courses/instructor/my-courses/`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("Fetched courses:", res.data); 
        setCourses(res.data);
      });
  }, []);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card elevation={3}>
            <CardMedia
  component="img"
  height="160"
  image={
    course.image
      ? `${API_URL}${course.image}`
      : "/default-course.jpg"
  }
  alt={course.title}
/>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Chip
                  label={`Enrolled: ${course.enrolled_count}`}
                  size="small"
                  sx={{ mt: 1, mr: 1 }}
                />
                <Chip
                  label={`Rating: ${course.average_rating}`}
                  size="small"
                  color="primary"
                  sx={{ mt: 1 }}
                />
              </CardContent>
  
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyCourses;