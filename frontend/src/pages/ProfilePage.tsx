import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Grid, Avatar,
  Divider, List, ListItem, ListItemIcon, ListItemText,
  CircularProgress, Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<string[]>([]);
  const [enrolled, setEnrolled] = useState<string[]>([]);

  // Fetch profile on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setLoading(false);
    axios
      .get(`${API_URL}/api/profile/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => {
        const {
          user,
          profile_picture,    // ← grab it
          xp,
          rank,
          completed_courses,
          enrolled_courses
        } = res.data;
      
        setUser({ ...user, profile_picture, xp, rank });
        setCompleted(completed_courses);
        setEnrolled(enrolled_courses);
      })
      .catch(() => { /* handle errors */ })
      .finally(() => setLoading(false));
  }, []);

  // Handle avatar upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const form = new FormData();
    form.append('profile_picture', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/api/profile/upload-avatar/`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`
          }
        }
      );
      // update local user state
      setUser(u => ({
        ...u,
        profile_picture: res.data.profile_picture
      }));
    } catch (err) {
      console.error('Avatar upload failed', err);
    }
  };

  if (loading) return <CircularProgress sx={{ mx: 'auto', mt: 4, display: 'block' }} />;

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        My Profile
      </Typography>

      <Paper sx={{
        p: 4, mb: 4, boxShadow:3,
        display:'flex', flexDirection:{ xs:'column', md:'row' },
        alignItems:'center', gap:4
      }}>
        {/* file input */}
        <Box>
          <Avatar
            src={ user?.profile_picture ? `${API_URL}${user.profile_picture}` : undefined }
            alt={user?.name}
            sx={{ width:120, height:120, mb:2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Box>

        <Box>
          <Typography variant="h5" fontWeight="bold">{user?.name}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>XP: {user.xp} | Rank: {user.rank}</Typography>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p:4, boxShadow:3, bgcolor:'#eafbe7' }}>
            <Typography variant="h6" fontWeight="bold" color="green" gutterBottom>
              ✅ COMPLETED
            </Typography>
            <Divider sx={{ mb:2 }}/>
            <List>
              {completed.length
                ? completed.map((c,i)=>(
                    <ListItem key={i}>
                      <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                      <ListItemText primary={c}/>
                    </ListItem>
                  ))
                : <Typography>No completed courses yet.</Typography>
              }
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p:4, boxShadow:3, bgcolor:'#e3efff' }}>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              📘 ENROLLED
            </Typography>
            <Divider sx={{ mb:2 }}/>
            <List>
              {enrolled.length
                ? enrolled.map((c,i)=>(
                    <ListItem key={i}>
                      <ListItemIcon><BookmarkIcon color="primary" /></ListItemIcon>
                      <ListItemText primary={c}/>
                    </ListItem>
                  ))
                : <Typography>No enrolled courses found.</Typography>
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;