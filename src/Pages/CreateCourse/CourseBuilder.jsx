import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import ApiConfig from "../../config/ApiConfig";
import { styled } from "@mui/material/styles";
import axios from "../../axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


export default function CourseBuilder({
  courseId,
  handleNext,
  handlePrevious,
}) {
  const [topics, setTopics] = useState([]); // Array of topics with subtopics

  // Add a new topic
  const addTopic = () => {
    setTopics([...topics, { name: "", subTopics: [] }]);
  };

  // Remove a topic
  const removeTopic = (index) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    setTopics(updatedTopics);
  };

  // Update topic name
  const updateTopicName = (index, name) => {
    const updatedTopics = [...topics];
    updatedTopics[index].name = name;
    setTopics(updatedTopics);
  };

  // Add a new subtopic to a topic
  const addSubtopic = (topicIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].subTopics.push({
      videoUrl: "", // Add videoUrl to subtopic
      title: "",
      description: "",
      videoPlaybackTime: "00:00:00",
    });
    setTopics(updatedTopics);
  };

  // Remove a subtopic from a topic
  const removeSubtopic = (topicIndex, subtopicIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].subTopics.splice(subtopicIndex, 1);
    setTopics(updatedTopics);
  };

  // Update subtopic details
  const updateSubtopic = (topicIndex, subtopicIndex, field, value) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].subTopics[subtopicIndex][field] = value;
    setTopics(updatedTopics);
  };

  // Save topics and subtopics to the backend
  const saveCourseContent = async () => {
    try {
      const res = await axios.put(
        `${ApiConfig.updateCourse}/${courseId}`,
        { topics },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        handleNext(); // Move to the next step
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update course content"
      );
    }
  };

  // Upload video for a specific subtopic
  const uploadVideo = async (file, topicIndex, subtopicIndex) => {
    let formData = new FormData();
    formData.append("video", file);

    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadVideo,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (res?.data?.success) {
        // Update the video URL for the specific subtopic
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].subTopics[subtopicIndex].videoUrl =
          res?.data?.url;
        setTopics(updatedTopics);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  };

  return (
    <div className="p-4 bg-[#2C333F] border rounded-lg border-[#161D29]">
      <Typography variant="h4" color="text.primary">
        Course Builder
      </Typography>

      {/* Render topics and subtopics */}
      {topics.map((topic, topicIndex) => (
        <Box key={topicIndex} mt={2} className="border p-4 rounded-lg">
          <Box className="flex items-center justify-between gap-2">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter topic name"
              value={topic.name}
              onChange={(e) => updateTopicName(topicIndex, e.target.value)}
            />
            <IconButton
              sx={{ color: "gray" }}
              onClick={() => removeTopic(topicIndex)}
            >
              <RiDeleteBin5Line />
            </IconButton>
          </Box>

          {/* Render subtopics */}
          {topic.subTopics.map((subtopic, subtopicIndex) => (
            <Box key={subtopicIndex} mt={2} className="border p-4 rounded-lg">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter subtopic title"
                value={subtopic.title}
                onChange={(e) =>
                  updateSubtopic(
                    topicIndex,
                    subtopicIndex,
                    "title",
                    e.target.value
                  )
                }
              />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter subtopic description"
                value={subtopic.description}
                onChange={(e) =>
                  updateSubtopic(
                    topicIndex,
                    subtopicIndex,
                    "description",
                    e.target.value
                  )
                }
                sx={{ mt: 2 }}
              />

              {/* Video Preview */}
              {subtopic.videoUrl ? (
                <div className="flex justify-center items-center mt-4">
                  <video
                    src={subtopic.videoUrl}
                    className="w-full h-40 object-contain"
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-1 mt-4">
                  <label>
                    Course Thumbnail <span className="text-red-500">*</span>
                  </label>

                  <div className="flex flex-col justify-center items-center p-4 border border-dashed border-[#424854] rounded-lg gap-4">
                    <img src="images/upload_video_img.png" />

                    <Typography variant="body1" color="text.secondary">
                      Drag and drop an image, or{" "}
                      <Button
                        component="label"
                        role={undefined}
                        variant="text"
                        tabIndex={-1}
                        sx={{
                          padding: 0,
                        }}
                      >
                        Browse
                        <VisuallyHiddenInput
                          name="videoUrl"
                          type="file"
                          accept="video/mp4"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                              uploadVideo(file, topicIndex, subtopicIndex);
                            }
                          }}
                        />
                      </Button>{" "}
                      <br />
                      Max 6MB each (12MB for videos)
                    </Typography>

                    <ul className="flex items-center text-text-lightGray list-disc gap-8">
                      <li>Aspect ratio 16:9</li>
                      <li>Recommended size 1024x576</li>
                    </ul>
                  </div>
                </div>
              )}

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter video playback time (HH:MM:SS)"
                value={subtopic.videoPlaybackTime}
                onChange={(e) =>
                  updateSubtopic(
                    topicIndex,
                    subtopicIndex,
                    "videoPlaybackTime",
                    e.target.value
                  )
                }
                sx={{ mt: 2 }}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeSubtopic(topicIndex, subtopicIndex)}
                sx={{ mt: 2 }}
              >
                Remove Subtopic
              </Button>
            </Box>
          ))}

          {/* Add subtopic button */}
          <Button
            variant="outlined"
            startIcon={<FiPlusCircle />}
            onClick={() => addSubtopic(topicIndex)}
            sx={{ mt: 2 }}
          >
            Add Subtopic
          </Button>
        </Box>
      ))}

      {/* Add topic button */}
      <Button
        variant="outlined"
        startIcon={<FiPlusCircle />}
        onClick={addTopic}
        sx={{ mt: 2 }}
      >
        Add Topic
      </Button>

      {/* Navigation buttons */}
      <Box mt={2} className="flex justify-center items-center gap-4">
        <Button
          variant="contained"
          startIcon={<IoIosArrowBack />}
          sx={{
            background: "#161D29",
            color: "white",
            "&:hover": {
              background: "#161D29",
            },
          }}
          onClick={handlePrevious}
        >
          Back
        </Button>
        <Button
          variant="contained"
          endIcon={<MdNavigateNext />}
          onClick={saveCourseContent}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}