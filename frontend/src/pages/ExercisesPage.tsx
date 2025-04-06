// src/pages/InterviewPrep.tsx
import React, { useState } from 'react';
import { Box, Button, Paper, Typography, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const data = {
  Python: [
    { title: '1.1. Hello World!', path: '/exercise/hello-world' },
    { title: '1.2. Python If-Else', path: '/exercise/python-if-else' },
    { title: '1.3. Python Loops', path: '/exercise/python-loops' },
  ],
  JavaScript: [
    { title: '1.1. JS Basics', path: '/exercise/js-basics' },
    { title: '1.2. JS Loops', path: '/exercise/js-loops' },
  ],
  Java: [
    { title: '1.1. Java Hello', path: '/exercise/java-hello' },
    { title: '1.2. Java If-Else', path: '/exercise/java-if-else' },
  ],
};

const InterviewPrep: React.FC = () => {
  const [language, setLanguage] = useState<keyof typeof data>('Python');
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Typography variant="h4" mb={3}>
        {language} Challenges
      </Typography>

      {/* Language switch buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {Object.keys(data).map((lang) => (
          <Button
            key={lang}
            variant={lang === language ? 'contained' : 'outlined'}
            onClick={() => setLanguage(lang as keyof typeof data)}
          >
            {lang}
          </Button>
        ))}
      </Box>

      {/* List of challenges */}
      <Paper sx={{ p: 3 }}>
        {data[language].map((challenge, idx) => (
          <List key={idx}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{challenge.title}</Typography>
              <Button
                variant="contained"
                onClick={() => navigate(challenge.path)}
              >
                Solve
              </Button>
            </ListItem>
          </List>
        ))}
      </Paper>
    </Box>
  );
};

export default InterviewPrep;