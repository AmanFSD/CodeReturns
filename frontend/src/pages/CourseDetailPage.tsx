import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import CourseVideoSection from "../components/CourseVideoSection";
import CourseContentDetails from "../components/CourseContentDetails";
import CourseReviews from "../components/CourseReviews";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("Extracted Course ID from URL:", courseId); // Debugging Line

  useEffect(() => {
    if (!courseId) {
      console.error("Error: courseId is undefined!");
      return;
    }

    axios
      .get(`http://localhost:8000/api/courses/${courseId}/`) // Fetch course details
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setLoading(false);
      });
  }, [courseId]);

  if (!courseId) return <Typography>Error: Course ID is missing.</Typography>; // Prevent 404 calls
  if (loading) return <CircularProgress />; // Show loader while fetching data
  if (!course) return <Typography>Error loading course.</Typography>;

  return (
    <Box sx={{ width: "100%", overflowY: "auto" }}>
      <Container maxWidth="xl">
        <CourseVideoSection course={course} />
        <CourseContentDetails course={course} />
        <CourseReviews courseId={courseId} />
      </Container>
    </Box>
  );
};

export default CourseDetailPage;