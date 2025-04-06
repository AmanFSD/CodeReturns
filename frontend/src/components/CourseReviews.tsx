import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Rating,
  TextField,
  Button,
} from "@mui/material";

const CourseReviews: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = () => {
    axios
      .get(`http://localhost:8000/api/courses/${courseId}/reviews/`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const submitReview = () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required.");

    setSubmitting(true);

    axios
      .post(
        `http://localhost:8000/api/courses/${courseId}/submit-review/`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setRating(0);
        setComment("");
        fetchReviews();
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        alert("Error submitting review.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Paper sx={{ my: 4, p: 3, height: "90vh", overflowY: "auto" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        What our Students Say?
      </Typography>

      {reviews.map((review, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>{review.user?.charAt(0) || "S"}</Avatar>
          <Box>
            <Typography fontWeight="bold">{review.user}</Typography>
            <Rating value={parseFloat(review.rating)} precision={0.5} readOnly />
            <Typography variant="body2">{review.comment}</Typography>
            <Typography variant="caption">{review.created_at?.split("T")[0]}</Typography>
          </Box>
        </Box>
      ))}

      <Box mt={4}>
        <Typography variant="h6" mb={1}>
          Leave a Review
        </Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={submitReview}
          disabled={submitting}
        >
          Submit Review
        </Button>
      </Box>
    </Paper>
  );
};

export default CourseReviews;