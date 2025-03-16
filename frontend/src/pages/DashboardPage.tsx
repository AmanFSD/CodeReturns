import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">Java</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">Python</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">JavaScript</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">Swift</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;