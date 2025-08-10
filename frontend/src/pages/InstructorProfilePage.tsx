import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:8000";

const InstructorProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${API_URL}/api/profile/`, {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.data?.user?.role !== "mentor") {
          window.location.href = "/dashboard"; // redirect if not instructor
        } else {
          setProfile(response.data.user);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            src={profile.profile?.profile_picture}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {profile.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.email}
            </Typography>
            <Typography variant="body2" color="primary">
              Role: {profile.role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" gutterBottom>
          <strong>Location:</strong> {profile.profile?.location || "N/A"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Phone:</strong> {profile.profile?.phone || "N/A"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Bio:</strong> {profile.profile?.bio || "No bio provided."}
        </Typography>
      </Paper>
    </Box>
  );
};

export default InstructorProfilePage;