import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import {
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

interface Challenge {
  id:     string;
  title:  string;
  slug:   string;
  topic:  string;       // e.g. "loops" | "data_structures" | "debugging"
}
interface Language {
  id:   string;
  name: string;
  slug: string;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ExercisesPage: React.FC = () => {
  // ← THIS MUST MATCH YOUR ROUTE: /exercises/:companySlug/:lang
  const { companySlug = "", lang: activeLang = "" } =
    useParams<{ companySlug: string; lang: string }>();
  const [searchParams] = useSearchParams();
  const urlTopic = searchParams.get("topic") || "";

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [languages, setLanguages] = useState<Language[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>(urlTopic);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // helper to normalize paginated vs array
  const toArray = (data: any): any[] =>
    Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];

  // 1) load available languages for this company
  useEffect(() => {
    if (!companySlug) return;
    setLoading(true);
    axios
      .get(`${API}/api/challenge-languages/`, {
        params: { company: companySlug },
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => setLanguages(toArray(res.data)))
      .catch(err => setError(`Error ${err.response?.status}`))
      .finally(() => setLoading(false));
  }, [companySlug]);

  // 2) load challenges whenever companySlug or activeLang changes
  useEffect(() => {
    if (!companySlug || !activeLang) return;
    setLoading(true);
    axios
      .get(`${API}/api/challenges/`, {
        params: { company: companySlug, language: activeLang },
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => {
        const arr: Challenge[] = toArray(res.data);
        setChallenges(arr);

        // extract unique topic slugs
        const uniq = Array.from(new Set(arr.map((c) => c.topic)));
        setTopics(uniq);

        // if URL’s topic isn’t in the new list, clear it
        if (urlTopic && !uniq.includes(urlTopic)) {
          setSelectedTopic("");
          navigate(`/exercises/${companySlug}/${activeLang}`, { replace: true });
        }
      })
      .catch(err => setError(`Error ${err.response?.status}`))
      .finally(() => setLoading(false));
  }, [companySlug, activeLang]);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  // now filter by selectedTopic (if any)
  const displayed = selectedTopic
    ? challenges.filter((c) => c.topic === selectedTopic)
    : challenges;

  return (
    <Box p={4} minHeight="100vh">
      {/* Heading */}
      <Typography variant="h4" mb={3}>
        {activeLang.toUpperCase()} Challenges |{" "}
        {companySlug.replace(/-/g, " ").toUpperCase()}
      </Typography>

      {/* Language tabs */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        {languages.map((l) => (
          <Button
            key={l.slug}
            variant={l.slug === activeLang ? "contained" : "outlined"}
            onClick={() => {
              setSelectedTopic("");
              navigate(`/exercises/${companySlug}/${l.slug}`);
            }}
          >
            {l.name}
          </Button>
        ))}
      </Box>

      {/* Topic tabs */}
      {topics.length > 0 && (
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <Button
            variant={!selectedTopic ? "contained" : "outlined"}
            onClick={() => {
              setSelectedTopic("");
              navigate(`/exercises/${companySlug}/${activeLang}`);
            }}
          >
            All Topics
          </Button>
          {topics.map((t) => (
            <Button
              key={t}
              variant={t === selectedTopic ? "contained" : "outlined"}
              onClick={() => {
                setSelectedTopic(t);
                navigate(
                  `/exercises/${companySlug}/${activeLang}?topic=${encodeURIComponent(
                    t
                  )}`
                );
              }}
            >
              {/* humanize the slug */}
              {t.replace(/_/g, " ").replace(/\b\w/g, (x) => x.toUpperCase())}
            </Button>
          ))}
        </Box>
      )}

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {/* Challenge list */}
      <Paper sx={{ p: 2 }}>
        {displayed.length ? (
          <List>
            {displayed.map((ch) => (
              <ListItem
                key={ch.id}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{ch.title}</Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/exercise/${ch.slug}`)}
                >
                  Solve
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No challenges for this topic.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ExercisesPage;
