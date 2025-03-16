import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const CourseVideoSection: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2, my: 4, height: '90vh' }}>
    
    {/* Video Section */}
    <Box sx={{ flex: 2 }}>
      <Paper sx={{ height: '100%' }}>
        <video
          width="100%"
          height="100%"
          controls
          style={{ objectFit: 'cover', borderRadius: '5px' }}
        >
          <source src="/src/assets/teacher.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Paper>
    </Box>

    {/* Lessons List Section */}
    <Box sx={{ flex: 1, overflowY: 'scroll' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Course Sections
      </Typography>
      <List>
        {[1,2,3,4,5].map(section => (
          <Box key={section}>
            <Typography variant="subtitle1">Section {section}: Introduction</Typography>
            {[1,2,3].map(lesson => (
              <ListItem key={lesson}>
                <ListItemText primary={`Lesson ${lesson}: Title goes here`} />
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Box>
  </Box>
);

export default CourseVideoSection;