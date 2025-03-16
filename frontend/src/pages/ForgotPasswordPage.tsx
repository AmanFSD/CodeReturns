// src/pages/ForgotPasswordPage.tsx
import React from 'react';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';

const ForgotPasswordPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ my: 5, flexGrow: 1 }}>
      <Paper elevation={5} sx={{ display: 'flex', overflow: 'hidden', height: '550px' }}>
        <Box
          component="img"
          sx={{ width: '50%', objectFit: 'cover' }}
          src="/src/assets/images/forgot-password-image.jpg"
          alt="Forgot Password"
        />
        <Box sx={{ width: '50%', p: 5 }}>
          <Typography variant="h4" gutterBottom>Forgot Password</Typography>
          <TextField fullWidth label="Email" variant="standard" margin="normal" />
          <TextField fullWidth label="New Password" type="password" variant="standard" margin="normal" />
          <TextField fullWidth label="Confirm Password" type="password" variant="standard" margin="normal" />
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>Check your email</Typography>
          <Button variant="contained" sx={{ bgcolor: '#3F3069', mt: 3, width: '100%' }}>Change</Button>
          <Button variant="contained" sx={{ bgcolor: '#3F3069', mt: 2, width: '100%' }}>Login</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;