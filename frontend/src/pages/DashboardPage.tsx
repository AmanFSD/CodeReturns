import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [xp, setXp] = useState<number>(0);
  const [rank, setRank] = useState<number>(0);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  // Recommendation state
  const [recommendedTopicSlug, setRecommendedTopicSlug] = useState<string>('');
  const [loadingRec, setLoadingRec] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // No token → no profile, no recommendation
      setLoadingProfile(false);
      setLoadingRec(false);
      return;
    }

    // 1) Fetch user profile (XP & rank)
    axios
      .get(`${API_URL}/api/profile/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setXp(res.data.xp);
        setRank(res.data.rank);
      })
      .catch((err) => console.error('Failed to fetch profile:', err))
      .finally(() => setLoadingProfile(false));

    // 2) Fetch next-challenge recommendation
    axios
      .get(`${API_URL}/api/predictions/recommend_challenge/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        // The backend returns { recommended_topic_slug: "<loops|data_structures|debugging>" }
        const slug = res.data.recommended_topic_slug ?? '';
        setRecommendedTopicSlug(slug);
      })
      .catch((err) => {
        console.error('Failed to fetch recommendation:', err);
        setRecommendedTopicSlug(''); // no recommendation available
      })
      .finally(() => setLoadingRec(false));
  }, []);

  const cardStyles = {
    height: '100%',
    p: 4,
    borderRadius: 4,
    bgcolor: '#fff',
    boxShadow: 3,
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
    '&:hover': { boxShadow: 10, transform: 'translateY(-5px)' },
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fc', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          mb={2}
        >
          Welcome to Your Learning Dashboard
        </Typography>

        {/* Profile Info */}
        {loadingProfile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            textAlign="center"
            mb={4}
          >
            XP: {xp} | Rank: {rank}
          </Typography>
        )}

        {/* Recommendation Card */}
        {loadingRec ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <Paper
            sx={{ ...cardStyles, mb: 4, cursor: recommendedTopicSlug ? 'pointer' : 'default' }}
            onClick={() => {
              if (recommendedTopicSlug) {
       
                navigate(`/interview-prep?topic=${encodeURIComponent(recommendedTopicSlug)}`);
              }
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              🎯 Recommended Next Topic
            </Typography>

            <Typography variant="h6" color="primary">
              {recommendedTopicSlug
                ? recommendedTopicSlug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                : 'No recommendation available'}
            </Typography>

            {recommendedTopicSlug && (
              <Button variant="contained" sx={{ mt: 2 }} color="secondary">
                Practice Now
              </Button>
            )}
          </Paper>
        )}

        {/* Main Cards */}
        <Grid container spacing={4}>
          {/* LEARN CARD */}
          <Grid item xs={12} md={6}>
            <Paper sx={cardStyles} onClick={() => navigate('/learn')}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                🚀 Learn Programming
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
              >
                Master Python, JavaScript, Java, Swift and more through interactive lessons.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 2,
                }}
              >
                <img src="/src/assets/icons/java.png" alt="Java" width={40} />
                <img
                  src="/src/assets/icons/python.png"
                  alt="Python"
                  width={40}
                />
                <img src="/src/assets/icons/js.png" alt="JS" width={40} />
                <img
                  src="/src/assets/icons/swift.png"
                  alt="Swift"
                  width={40}
                />
              </Box>
              <Button variant="contained" sx={{ mt: 3 }} color="primary">
                Start Learning
              </Button>
            </Paper>
          </Grid>

          {/* INTERVIEW PREP CARD */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={cardStyles}
              onClick={() => navigate('/interview-prep')}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                💼 Interview Preparation
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
              >
                Practice real coding challenges from top companies and ace your interviews.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 2,
                }}
              >
                <img
                  src="/src/assets/icons/apple.png"
                  alt="Apple"
                  width={40}
                />
                <img
                  src="/src/assets/icons/facebook.png"
                  alt="Facebook"
                  width={40}
                />
                <img
                  src="/src/assets/icons/netflix.png"
                  alt="Netflix"
                  width={40}
                />
                <img
                  src="/src/assets/icons/google.png"
                  alt="Google"
                  width={40}
                />
              </Box>
              <Button variant="contained" sx={{ mt: 3 }} color="secondary">
                Practice Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
