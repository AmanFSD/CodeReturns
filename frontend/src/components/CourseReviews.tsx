import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Avatar, Rating } from "@mui/material";

const CourseReviews: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/courses/${courseId}/reviews/`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [courseId]);

  return (
    <Paper sx={{ my: 4, p: 3, height: "90vh", overflowY: "auto" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        What our Students Say?
      </Typography>

      {reviews.map((review, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>{review.user.charAt(0)}</Avatar>
          <Box>
            <Typography fontWeight="bold">{review.user}</Typography>
            <Rating value={4} readOnly />
            <Typography variant="body2">{review.status}</Typography>
            <Typography variant="caption">{review.enrolled_at}</Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default CourseReviews;