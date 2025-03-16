import React from 'react';
import { Card, CardMedia, CardContent, Button, Typography, Box } from '@mui/material';

interface HomeCardProps {
  image: string;
  title: string;
  buttonText: string;
  bgColor?: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ image, title, buttonText, bgColor = "#fff" }) => (
  <Card sx={{ bgcolor: bgColor, boxShadow: 3 }}>
    <CardMedia component="img" image={image} sx={{ height: 200 }} />
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
      <Button variant="contained" sx={{ bgcolor: '#2E1A47', borderRadius: '20px', px: 3 }}>
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

export default HomeCard;