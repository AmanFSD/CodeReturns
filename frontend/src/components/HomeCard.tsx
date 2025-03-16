import React from 'react';
import { Box, Button, Typography, Card, CardMedia } from '@mui/material';

interface HomeCardProps {
  title: string;
  buttonText: string;
  image: string;
  reversed?: boolean;
  bgColor?: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, buttonText, image, reversed = false, bgColor }) => (
  <Card sx={{ display: 'flex', flexDirection: reversed ? 'row-reverse' : 'row', bgcolor: bgColor || '#fff', width: '90%', mx: 'auto', my: 3, height: 250 }}>
    <Box sx={{ flex: '1', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>{title}</Typography>
      <Button variant="contained" sx={{ bgcolor: '#3F3069', width: '100px' }}>{buttonText}</Button>
    </Box>
    <CardMedia component="img" sx={{ flex: '1', objectFit: 'cover' }} image={image} />
  </Card>
);

export default HomeCard;