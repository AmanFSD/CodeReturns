import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<string[]>([]);
  const [enrolled, setEnrolled] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('http://localhost:8000/api/profile/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setCompleted(res.data.completed_courses);
        setEnrolled(res.data.enrolled_courses);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ mx: 'auto', mt: 4, display: 'block' }} />;

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        My Profile
      </Typography>

      {/* Top Section: Avatar + Info */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          boxShadow: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4,
        }}
      >
<Avatar
  src={`http://localhost:8000${user?.profile?.profile_picture}`}
  alt="Profile Picture"
  sx={{ width: 120, height: 120 }}
/>
        <Box>
          <Typography variant="h5" fontWeight="bold">{user?.name}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Subscription Plan: Free</Typography>
          <Typography>
            Member Since: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
          </Typography>
        </Box>
      </Paper>

      {/* Bottom Section: Completed + Enrolled */}
      <Grid container spacing={4}>
        {/* Completed Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, boxShadow: 3, bgcolor: '#eafbe7' }}>
            <Typography variant="h6" fontWeight="bold" color="green" gutterBottom>
              ✅ COMPLETED
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {completed.length === 0 ? (
                <Typography>No completed courses yet.</Typography>
              ) : (
                completed.map((course, index) => (
                  <ListItem key={index}>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText primary={course} />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>

        {/* Enrolled Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, boxShadow: 3, bgcolor: '#e3efff' }}>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              📘 ENROLLED
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {enrolled.length === 0 ? (
                <Typography>No enrolled courses found.</Typography>
              ) : (
                enrolled.map((course, index) => (
                  <ListItem key={index}>
                    <ListItemIcon><BookmarkIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={course} />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;