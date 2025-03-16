import React from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <Box sx={{ width: '90%', mx: 'auto', mt: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, bgcolor: '#f8f9fa' }}>
        
        {/* Left Side - Image */}
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: '50%' }, height: 'auto' }}
          image="/src/assets/images/laptop-hand.png" 
          alt="Register Image"
        />

        {/* Right Side - Form */}
        <CardContent sx={{ width: { xs: '100%', md: '50%' }, p: 4 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Register
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="First Name" variant="outlined" fullWidth />
            <TextField label="Last Name" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField label="Password" type="password" variant="outlined" fullWidth />

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#3F3069' }} fullWidth>
                Sign Up
              </Button>
              <Button component={Link} to="/login" variant="contained" sx={{ bgcolor: '#3F3069' }} fullWidth>
                Login
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;