import React from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const RegisterPage: React.FC = () => {
  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: '400px' }} elevation={3}>
        <Typography variant="h4" mb={3}>
          Register
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="First Name" required />
          <TextField label="Last Name" required />
          <TextField label="Email" type="email" required />
          <TextField label="Password" type="password" required />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
            <Button variant="outlined" color="primary">
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;