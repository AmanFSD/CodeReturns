import React from 'react';
import { Box, Typography, Paper, Rating } from '@mui/material';

const CourseContentDetails: React.FC = () => (
  <Paper sx={{ my: 4, p: 3, height: '90vh', overflowY: 'auto' }}>
    <Typography variant="h5" fontWeight="bold">Python Master Class By Sarah Johnson</Typography>

    <Box sx={{ my: 2 }}>
      <Rating value={4.7} precision={0.1} readOnly />
      <Typography variant="body2">916 enrolled • 22 Hours</Typography>
    </Box>

    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
      {`
      About Course:
      - You will master the Python programming language by building unique projects.
      - You will learn automation, game, app, and web development, data science and machine learning all using Python.
      - You will be able to program in Python professionally.
      `}
    </Typography>
  </Paper>
);

export default CourseContentDetails;