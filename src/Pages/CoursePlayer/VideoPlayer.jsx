import React, { forwardRef, useState } from "react";
import ReactPlayer from "react-player";
import { Box, Slider, IconButton, Typography } from "@mui/material";
import {
  VolumeUp,
  VolumeOff,
  PlayArrow,
  Pause,
  Fullscreen,
} from "@mui/icons-material";
import ApiConfig from "../../config/ApiConfig";
import axios from "../../axios";

const VideoPlayer = forwardRef(
  ({ url, onProgress, onDuration, courseId, subTopicId }, ref) => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => setPlaying((prev) => !prev);
    const toggleMute = () => setMuted((prev) => !prev);

    const handleVolumeChange = (event, newValue) => {
      setVolume(newValue / 100);
      setMuted(newValue === 0);
    };

    const handleProgress = (state) => {
      setProgress(state.played * 100);
      onProgress(state);
    };

    const handleDuration = (duration) => {
      setDuration(duration);
      onDuration(duration);
    };

    const handleVideoEnd = async () => {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.updateCourseProgress,
          data: {
            courseId: courseId,
            subTopicId: subTopicId,
          },
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
      return `${mins}:${secs}`;
    };

    return (
      <Box
        sx={{
          position: "relative",
          background: "#000",
          borderRadius: "8px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <ReactPlayer
          ref={ref}
          url={url}
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleVideoEnd}
          controls={false}
          width="100%"
          height="100%"
          style={{ position: "relative" }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              minWidth: "50px",
              textAlign: "center",
            }}
          >
            {`${formatTime((progress / 100) * duration)} / ${formatTime(
              duration
            )}`}
          </Typography>
          <Slider
            value={progress}
            onChange={(event, newValue) => {
              setProgress(newValue);
              ref.current.seekTo(newValue / 100, "fraction");
            }}
            sx={{
              color: "#fff",
              width: "50%",
            }}
            size="small"
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 1,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="primary" onClick={toggleMute}>
              {muted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <Slider
              value={volume * 100}
              onChange={handleVolumeChange}
              sx={{ width: 100, color: "#fff" }}
              size="small"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton color="primary" onClick={togglePlay}>
              {playing ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton color="primary">
              <Fullscreen />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default VideoPlayer;
