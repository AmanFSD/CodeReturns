import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const CourseDetailPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Python Master Class
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Learn the Python programming language by building unique
          projects, exploring data science, and mastering web development.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 3 }}>
          Enroll
        </Button>
        {/* Student Reviews, Course Modules, etc. */}
      </Paper>
    </Box>
  );
};

export default CourseDetailPage;