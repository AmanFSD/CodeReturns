// src/pages/LoginPage.tsx
import React from 'react';
import { Box, Container, TextField, Button, Typography, Paper, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ my: 5, flexGrow: 1 }}>
      <Paper elevation={5} sx={{ display: 'flex', overflow: 'hidden', height: '550px' }}>
        <Box
          component="img"
          sx={{ width: '50%', objectFit: 'cover' }}
          src="/src/assets/images/login.png"
          alt="Login"
        />
        <Box sx={{ width: '50%', p: 5 }}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <TextField fullWidth label="Email" variant="standard" margin="normal" />
          <TextField fullWidth label="Password" type="password" variant="standard" margin="normal" />
          <Button variant="contained" sx={{ bgcolor: '#3F3069', mt: 3, width: '100%' }}>Login</Button>

          <MuiLink component={Link} to="/register" underline="none">
            <Button variant="contained" sx={{ bgcolor: '#3F3069', mt: 2, width: '100%' }}>Sign Up</Button>
          </MuiLink>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            <MuiLink component={Link} to="/forgot-password" underline="hover" sx={{ cursor: 'pointer' }}>
              Forgot Password?
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
