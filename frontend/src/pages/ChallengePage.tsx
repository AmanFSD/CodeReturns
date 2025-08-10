import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface Challenge {
  slug:        string;
  title:       string;
  description: string;
  difficulty:  string;
  company:     { slug: string; name: string };
  language:    { slug: string };
}

const ChallengePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode]           = useState<string>('print("Hello, World!")');
  const [output, setOutput]       = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Estimate–time state
  const [estimate, setEstimate]      = useState<number | null>(null);
  const [loadingEst, setLoadingEst]  = useState<boolean>(false);

  // Recommendation state
  const [loadingRec, setLoadingRec]  = useState<boolean>(false);

  // 1) Load the challenge details
  useEffect(() => {
    if (!slug) return;
    axios
      .get<Challenge>(`${API_URL}/api/challenges/${slug}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => setChallenge(res.data))
      .catch(err => console.error('Failed to fetch challenge:', err));
  }, [slug]);

  // 2) Estimate Solve Time
  const fetchEstimate = async () => {
    if (!challenge) return;
    setLoadingEst(true);

    try {
      // a) fetch profile
      const profileRes = await axios.get(`${API_URL}/api/profile/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const { xp, quiz_responses } = profileRes.data;

      // b) pull quiz answers for this language
      const answers = quiz_responses?.[challenge.language.slug] || {};

      // c) compute quiz_score
      const raw = Object.values(answers);
      const scores = raw.flatMap((v: any) => {
        if (typeof v === 'number') return [v];
        if (v && typeof v === 'object') {
          if (typeof v.score === 'number') return [v.score];
          if ('correct' in v)           return [v.correct ? 1 : 0];
        }
        return [];
      });
      const quiz_score = scores.length
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 0;

      // d) map difficulty to number
      const diffMap: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
      const difficulty = diffMap[challenge.difficulty] ?? 2;

      // e) build payload
      const payload = {
        months_experience: answers.months_experience || 0,
        loops_confidence:  answers.loops_confidence  || 0,
        knows_python:      answers.knows_python      || 0,
        ds_confidence:     answers.ds_confidence     || 0,
        debug_confidence:  answers.debug_confidence  || 0,
        xp,
        quiz_score,
        difficulty,
      };

      // f) POST to predict_time
      const resp = await axios.post<{
        estimated_time_minutes: number;
      }>(
        `${API_URL}/api/predictions/predict_time/`,
        payload,
        { headers: { Authorization: `Token ${token}` } }
      );
      setEstimate(resp.data.estimated_time_minutes);
    } catch (err) {
      console.error('Estimate call failed:', err);
    } finally {
      setLoadingEst(false);
    }
  };

  // 3) Recommend Next Challenge
  const fetchRecommendation = async () => {
    if (!challenge) return;
    setLoadingRec(true);

    try {
      const resp = await axios.get<{
        recommended_topic_slug: string;
      }>(
        `${API_URL}/api/predictions/recommend_challenge/`,
        { headers: { Authorization: `Token ${token}` } }
      );

      const topicSlug = resp.data.recommended_topic_slug;
      // navigate into exercises page, passing topic
      navigate(
        `/exercises/${challenge.company.slug}/${challenge.language.slug}` +
        `?topic=${encodeURIComponent(topicSlug)}`
      );
    } catch (err) {
      console.error('Recommendation call failed:', err);
    } finally {
      setLoadingRec(false);
    }
  };

  // 4) Submit & incremental ML fit
  const submitSolution = async () => {
    if (!challenge) return;
    setSubmitting(true);

    try {
      const res = await axios.post<{
        correct: boolean;
        xp:      number;
        rank:    number;
      }>(
        `${API_URL}/api/challenges/${challenge.slug}/submit/`,
        { code, language: challenge.language.slug },
        { headers: { Authorization: `Token ${token}` } }
      );

      if (res.data.correct) {
        setOutput(`✅ Correct! Your XP: ${res.data.xp}, Rank: ${res.data.rank}`);
      } else {
        setOutput('❌ Incorrect, try again.');
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      setOutput(err.response?.data?.error || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  // Render
  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Typography variant="h4" mb={2}>
        Challenge: {challenge?.title ?? 'Loading…'}
      </Typography>

      {/* Estimate Solve Time */}
      <Box mb={2}>
        <Button
          variant="outlined"
          onClick={fetchEstimate}
          disabled={loadingEst || !challenge}
        >
          {loadingEst ? 'Estimating…' : 'Estimate Solve Time'}
        </Button>
        {estimate != null && (
          <Typography component="span" ml={2}>
            ≈ {estimate.toFixed(1)} min
          </Typography>
        )}
      </Box>

      {/* Recommend Next Challenge */}
      <Box mb={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchRecommendation}
          disabled={loadingRec || !challenge}
        >
          {loadingRec ? 'Finding Next…' : 'Get Recommendation'}
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={4}>
        {/* Problem Description */}
        <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
          <Typography>{challenge?.description}</Typography>
          <Typography mt={2}>Difficulty: {challenge?.difficulty}</Typography>
          <Typography mt={1} color="textSecondary">
            Company: {challenge?.company.name}
          </Typography>
        </Paper>

        {/* Code Editor & Submit */}
        <Paper sx={{ flex: 1, p: 3, minWidth: 300 }}>
          <Typography variant="h6" mb={1}>Your Solution</Typography>
          <TextField
            multiline
            minRows={10}
            fullWidth
            value={code}
            onChange={e => setCode(e.target.value)}
            sx={{
              fontFamily: 'monospace',
              bgcolor: '#000',
              color: '#0f0',
              '& .MuiInputBase-input': { color: '#0f0' },
            }}
          />
          <Button
            variant="contained"
            onClick={submitSolution}
            sx={{ mt: 2 }}
            disabled={submitting || !challenge}
          >
            {submitting ? 'Submitting…' : 'Submit'}
          </Button>

          {output && (
            <Paper sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5' }}>
              <Typography fontWeight="bold">Result:</Typography>
              <Typography component="pre">{output}</Typography>
            </Paper>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ChallengePage;
