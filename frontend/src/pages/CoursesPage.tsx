import React, { useEffect, useState, useCallback } from "react";
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

  const fetchEnrolledCourses = useCallback(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8000/api/courses/enrolled-courses/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        const ids = res.data.map((c: any) => c.id);
        setEnrolledCourseIds(ids);
      })
      .catch((err) => console.error("Error fetching enrolled courses:", err));
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
    
        const res = await axios.get("http://localhost:8000/api/courses/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
    
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, [fetchEnrolledCourses]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (courses.length === 0) return <Typography>No courses found.</Typography>;

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {courses
          .filter((course) => !enrolledCourseIds.includes(course.id)) 
          .map((course) => (
            <Grid item xs={12} sm={12} md={6} lg={6} key={course.id}>
              <CourseCard
                image={`http://localhost:8000${course.image}`}
                title={course.title}
                courseId={course.id}
                isEnrolled={enrolledCourseIds.includes(course.id)}
                refreshCourses={fetchEnrolledCourses}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CoursesPage;