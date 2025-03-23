// src/components/CourseCard.tsx
import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
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

const CourseCard: React.FC<CourseCardProps> = ({ image, title, courseId, isEnrolled, refreshCourses }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLearn = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (isEnrolled) {
      navigate(`/courses/${courseId}`);
    } else {
      alert("You are not enrolled in this course!");
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
      
      await axios.post(`http://localhost:8000/api/courses/${courseId}/enroll/`, {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      refreshCourses?.();
    } catch (err) {
      alert("Failed to subscribe to the course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ borderRadius: "8px", boxShadow: 3 }}>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#283593", mt: 2, color: "white" }}
          onClick={isEnrolled ? handleLearn : handleSubscribe}
          disabled={loading}
        >
          {isEnrolled ? "LEARN" : "SUBSCRIBE"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;