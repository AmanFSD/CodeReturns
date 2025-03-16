import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import pythonIcon from '/src/assets/images/python.png';
import javaIcon from '/src/assets/images/java.png';
import jsIcon from '/src/assets/images/js.png';
import swiftIcon from '/src/assets/images/swift.png';

const courses = [
  { title: 'Python', image: pythonIcon },
  { title: 'Java', image: javaIcon },
  { title: 'JavaScript', image: jsIcon },
  { title: 'Swift', image: swiftIcon },
];

const CoursesPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course, idx) => (
          <Grid item xs={12} md={6} lg={3} key={idx}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia component="img" image={course.image} alt={course.title} sx={{ height: 200 }} />
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Button variant="contained" sx={{ mt: 1 }}>
                  View
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoursesPage;