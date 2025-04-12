// src/pages/InterviewPrep.tsx
import React, { useState } from 'react';
import { Box, Button, Paper, Typography, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const data = {
  Python: [
    { title: '1. Hello World!', path: '/exercise/python-hello-world' },
    { title: '2. If-Else', path: '/exercise/python-if-else' },
    { title: '3. Loops', path: '/exercise/python-loops' },
    { title: '4. Sum of N', path: '/exercise/python-sum-n' },
    { title: '5. Factorial', path: '/exercise/python-factorial' },
    { title: '6. Palindrome Check', path: '/exercise/python-palindrome' },
    { title: '7. Prime Number', path: '/exercise/python-prime' },
    { title: '8. Fibonacci Series', path: '/exercise/python-fibonacci' },
    { title: '9. Max in List', path: '/exercise/python-max-list' },
    { title: '10. Reverse String', path: '/exercise/python-reverse' },
    { title: '11. Sum of List', path: '/exercise/python-sum-list' },
    { title: '12. Count Vowels', path: '/exercise/python-count-vowels' },
    { title: '13. Remove Duplicates', path: '/exercise/python-remove-duplicates' },
    { title: '14. Anagram Checker', path: '/exercise/python-anagram' },
    { title: '15. Word Frequency', path: '/exercise/python-word-frequency' },
    { title: '16. Swap Variables', path: '/exercise/python-swap' },
    { title: '17. List of Primes', path: '/exercise/python-prime-list' },
    { title: '18. Pattern Printing', path: '/exercise/python-patterns' },
    { title: '19. Armstrong Number', path: '/exercise/python-armstrong' },
    { title: '20. Simple Calculator', path: '/exercise/python-calculator' },
  ],
  JavaScript: [
    { title: '1. JS Hello World', path: '/exercise/js-hello-world' },
    { title: '2. If-Else', path: '/exercise/js-if-else' },
    { title: '3. For Loops', path: '/exercise/js-loops' },
    { title: '4. Sum of Array', path: '/exercise/js-sum-array' },
    { title: '5. Factorial Recursion', path: '/exercise/js-factorial' },
    { title: '6. Palindrome String', path: '/exercise/js-palindrome' },
    { title: '7. Prime Checker', path: '/exercise/js-prime-checker' },
    { title: '8. Fibonacci Series', path: '/exercise/js-fibonacci' },
    { title: '9. Max in Array', path: '/exercise/js-max' },
    { title: '10. Reverse String', path: '/exercise/js-reverse-string' },
    { title: '11. List Sum', path: '/exercise/js-sum-list' },
    { title: '12. Count Vowels', path: '/exercise/js-count-vowels' },
    { title: '13. Remove Duplicates', path: '/exercise/js-remove-duplicates' },
    { title: '14. Anagram Test', path: '/exercise/js-anagram' },
    { title: '15. Frequency Map', path: '/exercise/js-frequency-map' },
    { title: '16. Swap Variables', path: '/exercise/js-swap' },
    { title: '17. List of Primes', path: '/exercise/js-prime-list' },
    { title: '18. Star Pattern', path: '/exercise/js-pattern' },
    { title: '19. Armstrong Check', path: '/exercise/js-armstrong' },
    { title: '20. JS Calculator', path: '/exercise/js-calculator' },
  ],
  Java: [
    { title: '1. Java Hello', path: '/exercise/java-hello' },
    { title: '2. If-Else', path: '/exercise/java-if-else' },
    { title: '3. Loops', path: '/exercise/java-loops' },
    { title: '4. Sum Numbers', path: '/exercise/java-sum' },
    { title: '5. Recursion Factorial', path: '/exercise/java-factorial' },
    { title: '6. Palindrome', path: '/exercise/java-palindrome' },
    { title: '7. Prime Check', path: '/exercise/java-prime' },
    { title: '8. Fibonacci', path: '/exercise/java-fibonacci' },
    { title: '9. Max Array', path: '/exercise/java-max' },
    { title: '10. Reverse Word', path: '/exercise/java-reverse' },
    { title: '11. List Sum', path: '/exercise/java-sum-list' },
    { title: '12. Count Vowels', path: '/exercise/java-count-vowels' },
    { title: '13. Remove Duplicates', path: '/exercise/java-remove-duplicates' },
    { title: '14. Is Anagram', path: '/exercise/java-anagram' },
    { title: '15. Word Frequency', path: '/exercise/java-frequency' },
    { title: '16. Swap Vars', path: '/exercise/java-swap' },
    { title: '17. Prime List', path: '/exercise/java-prime-list' },
    { title: '18. Print Pattern', path: '/exercise/java-pattern' },
    { title: '19. Armstrong No.', path: '/exercise/java-armstrong' },
    { title: '20. Java Calculator', path: '/exercise/java-calculator' },
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