import React from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const ForgotPasswordPage: React.FC = () => {
  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: '400px' }} elevation={3}>
        <Typography variant="h4" mb={3}>
          Forgot Password
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" required />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary">Reset Password</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;