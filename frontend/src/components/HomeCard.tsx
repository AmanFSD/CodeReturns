import React from 'react';
import { Card, Box, Typography, Button, CardMedia } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const HomeCard: React.FC<HomeCardProps> = ({ title, buttonText, image, reversed = false, bgColor }) => {
  const isMobile = useMediaQuery('(max-width:900px)'); // Detects if screen is mobile

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : reversed ? 'row-reverse' : 'row', // Stack vertically on mobile
        bgcolor: bgColor || '#fff',
        width: '90%',
        mx: 'auto',
        my: 3,
        height: isMobile ? 'auto' : 750, // Auto height on mobile
      }}
    >
      {/* Text Section - 30% on Desktop, Full Width on Mobile */}
      <Box
        sx={{
          flex: isMobile ? 'none' : '3',
          width: isMobile ? '100%' : '30%',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Button variant="contained" sx={{ bgcolor: '#3F3069', width: '100px' }}>
          {buttonText}
        </Button>
      </Box>

      {/* Image Section - 70% on Desktop, Full Width on Mobile */}
      <CardMedia
        component="img"
        sx={{
          flex: isMobile ? 'none' : '7',
          width: isMobile ? '100%' : '70%',
          objectFit: 'cover',
          height: '100%',
        }}
        image={image}
      />
    </Card>
  );
};

export default HomeCard;