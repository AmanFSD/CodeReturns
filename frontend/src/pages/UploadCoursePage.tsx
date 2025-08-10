import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Input,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const UploadCoursePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [duration, setDuration] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${API_URL}/api/courses/create/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Course uploaded successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setDuration("");
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload failed.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          📹 Upload New Course
        </Typography>

        {success && <Typography color="green">{success}</Typography>}

        <TextField
          fullWidth
          label="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Duration (e.g. 5.5)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Upload Course
        </Button>
      </Paper>
    </Box>
  );
};

export default UploadCoursePage;