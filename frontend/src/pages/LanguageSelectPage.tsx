import React, { useState } from "react";
import { Container, Box, Typography, Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
];

const LanguageSelectPage: React.FC = () => {
  const [lang, setLang] = useState(LANGUAGES[0].value);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/quiz/${lang}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Select Quiz Language
      </Typography>
      <Box sx={{ my: 4 }}>
        <Select
          value={lang}
          onChange={(e: SelectChangeEvent) => setLang(e.target.value)}
          fullWidth
        >
          {LANGUAGES.map((l) => (
            <MenuItem key={l.value} value={l.value}>
              {l.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Button variant="contained" size="large" onClick={handleStart}>
        Start Quiz
      </Button>
    </Container>
  );
};

export default LanguageSelectPage;
