import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ flex: 1, height: '50vh' }}>
        {/* LEARN CARD */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
            }}
            onClick={() => navigate('/learn')}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              LEARN
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
              <img src="/src/assets/icons/java.png" alt="Java" style={{ width: 50 }} />
              <img src="/src/assets/icons/python.png" alt="Python" style={{ width: 50 }} />
              <img src="/src/assets/icons/js.png" alt="JS" style={{ width: 50 }} />
              <img src="/src/assets/icons/swift.png" alt="Swift" style={{ width: 50 }} />
            </Box>
          </Paper>
        </Grid>

        {/* INTERVIEW PREP CARD */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
            }}
            onClick={() => navigate('/interview-prep')}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              INTERVIEW PREP
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
              <img src="/src/assets/icons/apple.png" alt="Apple" style={{ width: 50 }} />
              <img src="/src/assets/icons/facebook.png" alt="Facebook" style={{ width: 50 }} />
              <img src="/src/assets/icons/netflix.png" alt="Netflix" style={{ width: 50 }} />
              <img src="/src/assets/icons/google.png" alt="Google" style={{ width: 50 }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;