import React from 'react';
import { Box, Typography, List, ListItem, Button, Paper } from '@mui/material';

const challenges = [
  { title: '1.1. Hello World!', path: '/exercise/hello-world' },
  { title: '1.2. Python If-Else', path: '/exercise/python-if-else' },
  // ... etc ...
];

const ExercisesPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Python Challenge
      </Typography>
      <Paper sx={{ p: 3 }}>
        <List>
          {challenges.map((challenge, idx) => (
            <ListItem
              key={idx}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{challenge.title}</Typography>
              <Button variant="contained" color="primary">
                Solve
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ExercisesPage;