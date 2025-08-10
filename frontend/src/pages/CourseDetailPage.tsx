import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Container, CircularProgress, Typography, Button } from "@mui/material";
import CourseVideoSection from "../components/CourseVideoSection";
import CourseContentDetails from "../components/CourseContentDetails";
import CourseReviews from "../components/CourseReviews";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId?: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setError("Course ID is missing.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8000/api/courses/${courseId}/`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Could not load course.");
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: "100%", overflowY: "auto" }}>
      <Container maxWidth="xl">
        <CourseVideoSection course={course} />
        <CourseContentDetails course={course} />
        <CourseReviews courseId={courseId!} />
      </Container>
    </Box>
  );
};

export default CourseDetailPage;