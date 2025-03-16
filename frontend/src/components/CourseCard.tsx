// src/components/CourseCard.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

interface CourseCardProps {
  image: string;
  title: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ image, title }) => {
  return (
    <Card sx={{ borderRadius: "8px", boxShadow: 3 }}>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#283593", mt: 2, color: "white" }}
        >
          Join
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;