// src/components/CourseCard.tsx
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface CourseCardProps {
  image: string;
  title: string;
  courseId: string;
  isEnrolled: boolean;
  refreshCourses?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  title,
  courseId,
  isEnrolled,
  refreshCourses,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(isEnrolled); // local update after subscribing

  const handleLearn = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(`/courses/${courseId}`); 
    }
  };
  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8000/api/courses/${courseId}/enroll/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Successfully enrolled! Redirecting to course...");
        setEnrolled(true); // update UI locally
        refreshCourses?.(); // refresh list if needed
        setTimeout(() => navigate(`/courses/${courseId}`), 1000); // redirect to course
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to subscribe to the course."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ borderRadius: "8px", boxShadow: 3 }}>
<CardMedia
  component="img"
  image={image}
  alt={title}
  sx={{
    height: 500,
    objectFit: "cover",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  }}
/>      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#283593", mt: 2, color: "white" }}
          onClick={enrolled ? handleLearn : handleSubscribe}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : enrolled ? (
            "LEARN"
          ) : (
            "SUBSCRIBE"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;