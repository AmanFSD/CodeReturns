import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:8000";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/register/`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", response.data.token);
      if (response.data.user_role === "mentor") {
        alert("Your instructor account is pending admin approval.");
      }
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      const res = error.response?.data;
      if (res?.error) setError(res.error);
      else if (res?.email) setError(res.email[0]);
      else setError("Registration failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, bgcolor: "#f8f9fa" }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", md: "50%" }, height: "auto" }}
          image="/src/assets/images/laptop-hand.png"
          alt="Register"
        />
        <CardContent sx={{ width: { xs: "100%", md: "50%" }, p: 4 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Register
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="name"
              label="Full Name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
            />

            <TextField
              select
              name="role"
              label="Role"
              fullWidth
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="mentor">Instructor</MenuItem>
            </TextField>

            <Button
              variant="contained"
              sx={{ bgcolor: "#3F3069" }}
              fullWidth
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>

            <Button component={Link} to="/login" variant="contained" sx={{ bgcolor: "#3F3069" }} fullWidth>
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;