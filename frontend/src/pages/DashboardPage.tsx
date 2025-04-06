import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const cardStyles = {
    height: '100%',
    p: 4,
    borderRadius: 4,
    bgcolor: '#fff',
    boxShadow: 3,
    textAlign: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: 10,
      transform: 'translateY(-5px)',
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fc', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight="bold" gutterBottom textAlign="center" mb={6}>
          Welcome to Your Learning Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* LEARN CARD */}
          <Grid item xs={12} md={6}>
            <Paper sx={cardStyles} onClick={() => navigate('/learn')}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                🚀 Learn Programming
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Master Python, JavaScript, Java, Swift and more through interactive lessons.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <img src="/src/assets/icons/java.png" alt="Java" width={40} />
                <img src="/src/assets/icons/python.png" alt="Python" width={40} />
                <img src="/src/assets/icons/js.png" alt="JS" width={40} />
                <img src="/src/assets/icons/swift.png" alt="Swift" width={40} />
              </Box>
              <Button variant="contained" sx={{ mt: 3 }} color="primary">
                Start Learning
              </Button>
            </Paper>
          </Grid>

          {/* INTERVIEW PREP CARD */}
          <Grid item xs={12} md={6}>
            <Paper sx={cardStyles} onClick={() => navigate('/interview-prep')}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                💼 Interview Preparation
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Practice real coding challenges from top companies and ace your interviews.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <img src="/src/assets/icons/apple.png" alt="Apple" width={40} />
                <img src="/src/assets/icons/facebook.png" alt="Facebook" width={40} />
                <img src="/src/assets/icons/netflix.png" alt="Netflix" width={40} />
                <img src="/src/assets/icons/google.png" alt="Google" width={40} />
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