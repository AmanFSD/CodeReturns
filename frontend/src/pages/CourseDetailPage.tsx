import React from 'react';
import { Box, Container } from '@mui/material';
import CourseVideoSection from '../components/CourseVideoSection';
import CourseContentDetails from '../components/CourseContentDetails';
import CourseReviews from '../components/CourseReviews';

const CourseDetailPage: React.FC = () => (
  <Box sx={{ width: '100%', overflowY: 'auto' }}>
    <Container maxWidth="xl">
      <CourseVideoSection />
      <CourseContentDetails />
      <CourseReviews />
    </Container>
  </Box>
);

export default CourseDetailPage;