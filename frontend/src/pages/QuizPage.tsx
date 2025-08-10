// src/pages/CompanyPage.tsx
import React, { useState, useEffect } from 'react'
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
  Alert
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LANGUAGES = ['python','javascript','java','c++']

const CompanyPage: React.FC = () => {
  const { company } = useParams<{ company: string }>()
  const navigate = useNavigate()

  const [lang, setLang]           = useState(LANGUAGES[0])
  const [questions, setQuestions] = useState<{id:number,question:string}[]>([])
  const [answers, setAnswers]     = useState<Record<number|string,string>>({})
  const [loading, setLoading]     = useState(false)
  const [prob, setProb]           = useState<number|null>(null)
  const [error, setError]         = useState<string|null>(null)

  // Load questions whenever `lang` changes
  useEffect(() => {
    setLoading(true)
    setError(null)
    setQuestions([])
    setAnswers({})
    setProb(null)

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/quiz-questions/`, {
        params: { language: lang }
      })
      .then(r => setQuestions(r.data))
      .catch(() => setError('Could not load questions'))
      .finally(() => setLoading(false))
  }, [lang])

  const handleAnswer = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(a => ({ ...a, [id]: e.target.value }))
  }

  const predict = async () => {
    setError(null)
    try {
      const token = localStorage.getItem('token')
      // build your payload – replace these keys with whatever your TextFields actually set
      const payload = {
        months_experience: Number(answers['_months']   || 0),
        loops_confidence:  Number(answers['_loops']    || 3),
        knows_python:      Number(answers['_knows']    || 0),
        ds_confidence:     Number(answers['_ds']       || 3),
        debug_confidence:  Number(answers['_debug']    || 3),
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/predictions/predict/`,
        payload,
        { headers: { Authorization: `Token ${token}` } }
      )
      setProb(data.probability)
    } catch {
      setError('Prediction failed')
    }
  }

  if (loading) {
    return <CircularProgress sx={{ mt: 8, mx: 'auto', display: 'block' }} />
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {company?.toUpperCase()} Practice
      </Typography>

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

      {questions.map(q => (
        <Box key={q.id} sx={{ mb: 2 }}>
          <Typography>{q.id}. {q.question}</Typography>
          <TextField
            fullWidth
            placeholder="Your answer"
            value={answers[q.id] || ''}
            onChange={handleAnswer(q.id)}
          />
        </Box>
      ))}

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={predict}
      >
        Predict Success
      </Button>

      {prob !== null && (
        <>
          <Typography sx={{ mt: 2 }}>
            🎯 Success probability: {(prob * 100).toFixed(1)}%
          </Typography>

 <Button
             fullWidth
             variant="outlined"
             sx={{ mt: 2 }}
            onClick={() => navigate(`/exercises/${company}/${lang}`)}
           >
            Go To {lang.charAt(0).toUpperCase() + lang.slice(1)} Challenges
           </Button>
        </>
      )}
    </Container>
  )
}

export default CompanyPage
