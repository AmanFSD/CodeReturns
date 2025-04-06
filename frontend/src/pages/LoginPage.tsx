import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Paper, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth(); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", formData);
      auth.login(response.data.token); 
// After successful login:
const token = response.data.token;
localStorage.setItem("token", token);
const profileResponse = await axios.get(`${API_URL}/api/profile/`, {
  headers: { Authorization: `Token ${token}` }
});

const role = profileResponse.data.user.role;
localStorage.setItem("user_role", role);
if (role === "mentor") {
  navigate("/instructor-dashboard");
} else {
  navigate("/dashboard");
}    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5, flexGrow: 1 }}>
      <Paper elevation={5} sx={{ display: "flex", overflow: "hidden", height: "550px" }}>
        <Box component="img" sx={{ width: "50%", objectFit: "cover" }} src="/src/assets/images/login.png" alt="Login" />
        
        <Box sx={{ width: "50%", p: 5 }}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          {error && <Typography color="error">{error}</Typography>}
          
          <TextField name="email" fullWidth label="Email" variant="standard" margin="normal" onChange={handleChange} />
          <TextField name="password" fullWidth label="Password" type="password" variant="standard" margin="normal" onChange={handleChange} />

          <Button variant="contained" sx={{ bgcolor: "#3F3069", mt: 3, width: "100%" }} onClick={handleLogin}>
            Login
          </Button>

          <MuiLink component={Link} to="/register" underline="none">
            <Button variant="contained" sx={{ bgcolor: "#3F3069", mt: 2, width: "100%" }}>
              Sign Up
            </Button>
          </MuiLink>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            <MuiLink component={Link} to="/forgot-password" underline="hover" sx={{ cursor: "pointer" }}>
              Forgot Password?
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;