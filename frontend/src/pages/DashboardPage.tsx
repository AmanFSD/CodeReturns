// src/pages/DashboardPage.tsx
import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ flexGrow: 1, my: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={5} sx={{ p: 3, height: 400, textAlign: 'center' }}>
            <Typography variant="h5">LEARN</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', mt: 3 }}>
              <img src="/src/assets/icons/java.png" alt="Java" style={{ width: 80 }} />
              <img src="/src/assets/icons/python.png" alt="Python" style={{ width: 80 }} />
              <img src="/src/assets/icons/js.png" alt="JavaScript" style={{ width: 80 }} />
              <img src="/src/assets/icons/swift.png" alt="Swift" style={{ width: 80 }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={5} sx={{ p: 3, height: 400, textAlign: 'center' }}>
            <Typography variant="h5">INTERVIEW PREP</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', mt: 3 }}>
              <img src="/src/assets/icons/apple.png" alt="Apple" style={{ width: 80 }} />
              <img src="/src/assets/icons/facebook.png" alt="Facebook" style={{ width: 80 }} />
              <img src="/src/assets/icons/netflix.png" alt="Netflix" style={{ width: 80 }} />
              <img src="/src/assets/icons/google.png" alt="Google" style={{ width: 80 }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;