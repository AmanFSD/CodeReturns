import React from 'react';
import { Box, Typography, Paper, Avatar, Rating } from '@mui/material';

const reviews = [
  { name: 'Kaz Salem', rating: 5, comment: 'Sarah is excellent!', date: '2 days ago' },
  { name: 'Lucy', rating: 4, comment: 'Sarah is great!', date: '3 days ago' },
];

const CourseReviews: React.FC = () => (
  <Paper sx={{ my: 4, p: 3, height: '90vh', overflowY: 'auto' }}>
    <Typography variant="h5" fontWeight="bold" gutterBottom>What our Students Say?</Typography>

    {reviews.map((review, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ mr: 2 }}>{review.name.charAt(0)}</Avatar>
        <Box>
          <Typography fontWeight="bold">{review.name}</Typography>
          <Rating value={review.rating} readOnly />
          <Typography variant="body2">{review.comment}</Typography>
          <Typography variant="caption">{review.date}</Typography>
        </Box>
      </Box>
    ))}
  </Paper>
);

export default CourseReviews;