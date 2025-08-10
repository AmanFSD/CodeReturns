
import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ForgotIllustration from '../assets/images/login.png'; // Adjust the path as necessary

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ForgotPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/api/reset-password/`, {
        email: formData.email,
        new_password: formData.newPassword,
      });
      setMessage(res.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMessage("");
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Paper elevation={5} sx={{ display: 'flex', overflow: 'hidden', height: 550 }}>
        {/* 2) Use the imported image */}
        <Box
          component="img"
          src={ForgotIllustration}
          alt="Forgot Password"
          sx={{ width: '50%', objectFit: 'cover' }}
        />

        <Box sx={{ width: '50%', p: 5 }}>
          <Typography variant="h4" gutterBottom>
            Reset Password
          </Typography>

          <TextField
            name="email"
            fullWidth
            label="Email"
            variant="standard"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="newPassword"
            fullWidth
            label="New Password"
            type="password"
            variant="standard"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="confirmPassword"
            fullWidth
            label="Confirm Password"
            type="password"
            variant="standard"
            margin="normal"
            onChange={handleChange}
          />

          {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

          <Button
            variant="contained"
            sx={{ bgcolor: '#3F3069', mt: 3, width: '100%' }}
            onClick={handleSubmit}
          >
            Change Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;