import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

const CourseVideoSection: React.FC<{ course: any }> = ({ course }) => {
  const modules = course.modules || [];
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (modules.length > 0) {
      const firstSection = modules[0];
      const firstLesson = firstSection.lessons?.[0] ?? null;
      setSelectedLesson(firstLesson);
    }
  }, [modules]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    videoEl.addEventListener("play", onPlay);
    videoEl.addEventListener("pause", onPause);

    return () => {
      videoEl.removeEventListener("play", onPlay);
      videoEl.removeEventListener("pause", onPause);
    };
  }, [selectedLesson]);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3, my: 4, height: "90vh" }}>
      {/* Video Display */}
      <Box sx={{ flex: 2 }}>
        <Paper sx={{ height: "100%", borderRadius: "5px", overflow: "hidden" }}>
          {selectedLesson?.video_url ? (
            selectedLesson.video_url.includes("youtube.com") ||
            selectedLesson.video_url.includes("youtu.be") ? (
              <iframe
                width="100%"
                height="100%"
                src={selectedLesson.video_url.replace("watch?v=", "embed/")}
                title={selectedLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              />
            ) : (
              <video ref={videoRef} width="100%" height="100%" controls>
                <source src={selectedLesson.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <Typography p={2}>No video available</Typography>
          )}
        </Paper>
      </Box>

      {/* Module & Lesson List */}
      <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "90vh", px: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          📚 Course Modules
        </Typography>

        {modules.map((mod: any, i: number) => (
          <Box key={i}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, color: "#355E92" }}>
              Section {mod.order_no ?? i + 1}: {mod.title}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {mod.lessons?.map((lesson: any, idx: number) => (
                <ListItem
                  key={idx}
                  button
                  onClick={() => setSelectedLesson(lesson)}
                  sx={{
                    bgcolor: selectedLesson?.id === lesson.id ? "#f0f0f0" : "inherit",
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  {selectedLesson?.id === lesson.id && isPlaying ? (
                    <PauseCircleOutlineIcon sx={{ mr: 2, color: "#355E92" }} />
                  ) : (
                    <PlayCircleOutlineIcon sx={{ mr: 2, color: "#355E92" }} />
                  )}
                  <ListItemText
                    primary={
                      <>
                        {lesson.title}{' '}
                        {lesson.duration && (
                          <Typography component="span" variant="body2" sx={{ ml: 1, color: "#888" }}>
                            ({lesson.duration})
                          </Typography>
                        )}
                      </>
                    }
                    secondary={lesson.content?.slice(0, 50) || "No description available"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CourseVideoSection;