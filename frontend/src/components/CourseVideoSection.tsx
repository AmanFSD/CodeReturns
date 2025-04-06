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
  const defaultLesson = modules[0]?.lessons?.[0];
  const [selectedLesson, setSelectedLesson] = useState<any>(defaultLesson);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (modules.length && modules[0].lessons?.length) {
      setSelectedLesson(modules[0].lessons[0]);
    }
  }, [course]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [selectedLesson]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: 3,
        my: 4,
        height: "90vh",
      }}
    >
      {/* LEFT: Video Section */}
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
              ></iframe>
            ) : (
              <video ref={videoRef} width="100%" height="100%" controls>
                <source src={selectedLesson.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <Typography p={2}>No video selected</Typography>
          )}
        </Paper>
      </Box>

      {/* RIGHT: Module + Lessons List */}
      <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "90vh", px: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          📚 Course Modules
        </Typography>

        {modules.map((mod: any, i: number) => (
          <Box key={i}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mt: 2, color: "#355E92" }}
            >
              Section {mod.order_no ?? i + 1}: {mod.title ?? "Untitled"}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {mod.lessons?.map((lesson: any, idx: number) => (
                <ListItem
                  key={idx}
                  button
                  onClick={() => setSelectedLesson(lesson)}
                  sx={{
                    bgcolor:
                      selectedLesson?.id === lesson.id ? "#f0f0f0" : "inherit",
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
                        {lesson.title ?? "Untitled Lesson"}{" "}
                        {lesson.duration && (
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ ml: 1, color: "#888" }}
                          >
                            ({lesson.duration})
                          </Typography>
                        )}
                      </>
                    }
                    secondary={
                      lesson.content?.slice(0, 50) ?? "No description available"
                    }
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