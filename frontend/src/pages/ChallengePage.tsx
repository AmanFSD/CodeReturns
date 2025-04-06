// src/pages/ChallengePage.tsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChallengePage: React.FC = () => {
  const { slug } = useParams();
  const [code, setCode] = useState<string>('print("Hello, World!")');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/execute/', {
        code,
        language: 'python', // for now hardcoded, we can make it dynamic later
      });
      setOutput(res.data.output || 'No output returned');
    } catch (err: any) {
      setOutput(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Typography variant="h4" mb={3}>
        Challenge: {slug?.replaceAll('-', ' ')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Problem Description */}
        <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
          <Typography variant="body1">
            Write a program to solve: <b>{slug?.replaceAll('-', ' ')}</b>
          </Typography>
          <Typography mt={2}>
            Input Format, Output Format, Examples etc...
          </Typography>
        </Paper>

        {/* Code Editor + Output */}
        <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
          <Typography variant="h6" mb={1}>
            Your Solution
          </Typography>

          <TextField
            multiline
            minRows={10}
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{
              fontFamily: 'monospace',
              bgcolor: '#000',
              color: '#0f0',
              '& .MuiInputBase-input': {
                color: '#0f0',
              },
            }}
          />

          <Button variant="contained" onClick={runCode} sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Running...' : 'Run'}
          </Button>

          {output && (
            <Paper sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Output:
              </Typography>
              <Typography component="pre">{output}</Typography>
            </Paper>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ChallengePage;