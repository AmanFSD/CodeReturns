import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/")
      .then((response) => {
        console.log("Fetched Courses:", response.data);
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses.");
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (courses.length === 0) return <Typography>No courses found.</Typography>;

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {courses.map((course) => (
          <Grid item xs={12} sm={12} md={6} lg={6} key={course.id}>
            <Card sx={{ boxShadow: 3, width: "80%", mx: "auto" }}>
              <CardMedia
                component="img"
                image={course.image ? `http://localhost:8000${course.image}` : "/default-course.png"}
                alt={course.title}
                sx={{ height: 220, objectFit: "contain" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2">{course.description}</Typography>
                <Button 
  component={Link} 
  to={`/courses/${course.id}`} 
  variant="contained" 
  sx={{ mt: 1 }}
>
  View Course
</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoursesPage;