import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ProfilePage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography>First Name: John</Typography>
        <Typography>Last Name: Smith</Typography>
        <Typography>Email: smith12@gmail.com</Typography>
        <Typography>Member Since: 2024</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Completed
            </Typography>
            {/* Show Completed courses/achievements */}
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Enrolled
            </Typography>
            {/* Show Enrolled courses/achievements */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;