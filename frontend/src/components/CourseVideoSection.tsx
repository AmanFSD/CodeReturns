import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";

const CourseVideoSection: React.FC<{ course: any }> = ({ course }) => (
  <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3, my: 4, height: "90vh" }}>
    {/* Video Section */}
    <Box sx={{ flex: 2 }}>
      <Paper sx={{ height: "100%", overflow: "hidden", borderRadius: "5px" }}>
        <video width="100%" height="100%" controls style={{ objectFit: "cover", borderRadius: "5px" }}>
          <source src="/src/assets/teacher.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Paper>
    </Box>

    {/* Lessons List Section */}
    <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "90vh", px: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        📚 Course Modules
      </Typography>
      <List>
        {course.modules.map((module: any, index: number) => (
          <Box key={index}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, color: "#355E92" }}>
              {module.title}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <ListItem sx={{ pl: 2 }}>
              <ListItemText primary={`📌 ${module.content}`} />
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  </Box>
);

export default CourseVideoSection;