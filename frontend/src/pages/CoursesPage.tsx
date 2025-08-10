import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers: any = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Token ${token}`;
        }

        const res = await axios.get("http://localhost:8000/api/courses/", {
          headers,
        });

        setCourses(res.data.courses || []);
        setEnrolledCourseIds(res.data.enrolled_ids || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
    );

  if (error)
    return <Typography color="error">{error}</Typography>;

  if (courses.length === 0)
    return <Typography>No courses found.</Typography>;

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>            <CourseCard
              image={`http://localhost:8000${course.image}`}
              title={course.title}
              courseId={course.id}
              isEnrolled={enrolledCourseIds.includes(course.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoursesPage;