import React from 'react';
import { Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: '400px' }} elevation={3}>
        <Typography variant="h4" mb={3}>
          Login
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" required />
          <TextField label="Password" type="password" required />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary">Login</Button>
            <Link component={RouterLink} to="/forgot-password" underline="hover">
              Forgot Password?
            </Link>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Link component={RouterLink} to="/register" underline="hover">
              Need an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;