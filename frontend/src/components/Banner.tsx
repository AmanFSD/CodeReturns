// src/components/Banner.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Banner: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 5, backgroundColor: '#e0e0e0' }}>
      <Typography variant="h3" gutterBottom>
        CODE WITH Kaz
      </Typography>
      <Button variant="contained">Join</Button>
    </Box>
  );
};

export default Banner;