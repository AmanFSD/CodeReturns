import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField, MenuItem, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ChallengePage: React.FC = () => {
  const { slug } = useParams();
  const [code, setCode] = useState<string>('print("Hello, World!")');
  const [language, setLanguage] = useState<string>('python'); // <-- NEW
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState<any>(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/challenges/${slug}/`)
      .then(res => setChallenge(res.data))
      .catch(err => console.error("Failed to fetch challenge", err));
  }, [slug]);

  const runCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/execute/`, {
        code,
        language, // <-- USE selected language
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
        Challenge: {challenge?.title || "Loading..."}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Problem Description */}
        <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
          <Typography variant="body1">
            {challenge?.description || "Loading challenge description..."}
          </Typography>
          <Typography mt={2}>Difficulty: {challenge?.difficulty}</Typography>

          {/* Language Selector */}
          <Box mt={3}>
            <Typography variant="subtitle2">Select Language:</Typography>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              size="small"
              sx={{ mt: 1, width: 200 }}
            >
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
            </Select>
          </Box>
        </Paper>

        {/* Code Editor + Output */}
        <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
          <Typography variant="h6" mb={1}>Your Solution</Typography>

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
              <Typography variant="subtitle1" fontWeight="bold">Output:</Typography>
              <Typography component="pre">{output}</Typography>
            </Paper>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ChallengePage;