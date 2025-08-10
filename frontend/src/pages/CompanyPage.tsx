// src/pages/CompanyPage.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  TextField,
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LANGUAGES = ['python','javascript','java','c++'];

const CompanyPage: React.FC = () => {
  const { companySlug = '' } = useParams<{ companySlug: string }>();
  const navigate = useNavigate();

  // model inputs
  const [lang, setLang] = useState<string>(LANGUAGES[0]);
  const [monthsExp, setMonthsExp] = useState<number>(0);
  const [loopsConf, setLoopsConf] = useState<number>(3);
  const [knowsPy, setKnowsPy] = useState<boolean>(false);
  const [dsConf, setDsConf] = useState<number>(3);
  const [debugConf, setDebugConf] = useState<number>(3);

  const [loading, setLoading] = useState(false);
  const [prob, setProb] = useState<number|null>(null);
  const [error, setError] = useState<string|null>(null);

  const handlePredict = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        months_experience:  monthsExp,
        loops_confidence:   loopsConf,
        knows_python:       knowsPy ? 1 : 0,
        ds_confidence:      dsConf,
        debug_confidence:   debugConf,
        language:           lang
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/predictions/predict/`,
        payload,
        { headers: { Authorization: `Token ${token}` } }
      );
      setProb(data.probability);
    } catch {
      setError('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {companySlug.toUpperCase()} Practice
      </Typography>

      {/* Language Picker */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Language</InputLabel>
        <Select
          label="Language"
          value={lang}
          onChange={e => setLang(e.target.value as string)}
        >
          {LANGUAGES.map(l => (
            <MenuItem key={l} value={l}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Numeric features */}
      <TextField
        fullWidth
        type="number"
        label="Months of experience"
        margin="normal"
        value={monthsExp}
        onChange={e => setMonthsExp(Number(e.target.value))}
      />

      <TextField
        fullWidth
        type="number"
        label="Loops confidence (1–5)"
        margin="normal"
        inputProps={{ min:1, max:5 }}
        value={loopsConf}
        onChange={e => setLoopsConf(Number(e.target.value))}
      />

      <FormControlLabel
        control={
          <Switch
            checked={knowsPy}
            onChange={(_, v) => setKnowsPy(v)}
          />
        }
        label="Know Python?"
      />

      <TextField
        fullWidth
        type="number"
        label="Data-structures confidence (1–5)"
        margin="normal"
        inputProps={{ min:1, max:5 }}
        value={dsConf}
        onChange={e => setDsConf(Number(e.target.value))}
      />

      <TextField
        fullWidth
        type="number"
        label="Debugging confidence (1–5)"
        margin="normal"
        inputProps={{ min:1, max:5 }}
        value={debugConf}
        onChange={e => setDebugConf(Number(e.target.value))}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Box sx={{ position: 'relative', mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          onClick={handlePredict}
        >
          Predict Success
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%', left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px'
            }}
          />
        )}
      </Box>

      {prob != null && (
        <>
          <Typography sx={{ mt: 3, mb: 1 }}>
            🎯 Success probability: {(prob * 100).toFixed(1)}%
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(`/exercises/${companySlug}/${lang}`)}
          >
            Go To {lang.charAt(0).toUpperCase() + lang.slice(1)} Challenges
          </Button>
        </>
      )}
    </Container>
  );
};

export default CompanyPage;
