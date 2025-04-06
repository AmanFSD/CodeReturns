import React from "react";
import { Box, Typography, Paper, Rating } from "@mui/material";

const CourseContentDetails: React.FC<{ course: any }> = ({ course }) => (
  <Paper sx={{ my: 4, p: 3, height: "90vh", overflowY: "auto" }}>
    <Typography variant="h5" fontWeight="bold">{course.title}</Typography>

    <Box sx={{ my: 2 }}>
      <Rating value={course.average_rating ?? 0} precision={0.1} readOnly />
      <Typography variant="body2">
        {course.enrolled_count ?? 0} enrolled • {course.duration ?? 0} Hours
      </Typography>
    </Box>

    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
      {course.description}
    </Typography>
  </Paper>
);

export default CourseContentDetails;