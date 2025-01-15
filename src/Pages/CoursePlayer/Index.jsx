import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import DataLoader from "../../components/DataLoader";
import VideoPlayer from "./VideoPlayer";

export default function Index() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");
  const [course, setCourse] = useState({});
  const [sectionsLength, setSectionsLength] = useState(0);
  const [subSectionsLength, setSubSectionsLength] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSubTopicId , setCurrentSubTopicId] = useState(null);

  const playerRef = useRef(null);

  const handleProgress = (state) => {
    // Handle progress if needed
  };

  const handleDuration = (duration) => {
    // Handle duration if needed
  };

  const handleSubTopicClick = (videoUrl, subTopicId) => {
    setCurrentVideo(videoUrl);
    setCurrentSubTopicId(subTopicId);
  };

  async function getCourseByCourseId() {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiConfig.course}/${courseId}`);
      if (res?.data?.success) {
        const coursedata = res?.data?.data;
        setCourse(coursedata);

        setSectionsLength(coursedata?.courseContent?.topics.length);

        const subtopics = coursedata?.courseContent?.topics?.reduce(
          (count, topic) => {
            return count + topic?.subTopics?.length;
          },
          0
        );

        setSubSectionsLength(subtopics);

        // Set the first video's URL
        if (coursedata?.courseContent?.topics?.[0]?.subTopics?.[0]?.videoUrl) {
          setCurrentVideo(
            coursedata.courseContent.topics[0].subTopics[0].videoUrl
          );
        }

        setCurrentSubTopicId(
          coursedata.courseContent.topics[0].subTopics[0]._id
        );
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (courseId) {
      getCourseByCourseId();
    }
  }, [courseId]);

  function formatDuration(duration) {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours} hr${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes} min${minutes > 1 ? "s" : ""}`;
    }
    return formattedDuration.trim();
  }

  return (
    <div>
      <div className="flex justify-start">
        <div className="flex-grow-0 py-6 bg-coolgray border-r border-borderGray">
          <div className="text-white p-4 text-16 flex items-center justify-between gap-4">
            <p className="text-wrap flex-grow-1">{course?.title}</p>
            <p className="flex-shrink-0">0 / {subSectionsLength}</p>
          </div>

          <hr className="border border-borderGray" />

          <Box
            className="mt-2"
            sx={{
              "& .MuiAccordion-root": {
                backgroundColor: "#2C333F",
                borderRadius: "0",
                borderBottom: "1px solid #424854",
              },
            }}
          >
            {course?.courseContent?.topics?.map((topic) => (
              <Accordion key={topic._id}>
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  aria-controls={`${topic._id}-content`}
                  id={`${topic._id}-header`}
                  sx={{
                    gap: "10px",
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      color: "white",
                      fontSize: "25px",
                    },
                  }}
                >
                  <Box className="w-full flex items-center justify-between gap-4">
                    <Typography variant="body1">{topic?.name}</Typography>
                    <Typography
                      variant="body2"
                      className="text-text-extraGray space-x-2"
                    >
                      {topic?.topicDuration &&
                        formatDuration(topic?.topicDuration)}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <List>
                    {topic?.subTopics.map((subtopic) => (
                      <ListItem
                        key={subtopic?._id}
                        button
                        onClick={() => handleSubTopicClick(subtopic?.videoUrl,subtopic?._id)}
                      >
                        <Checkbox />
                        <ListItemText primary={subtopic?.title} />
                        <p>{subtopic?.videoPlaybackTime}</p>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </div>

        <div className="flex-grow-1 p-4">
          {currentVideo && currentVideo !== "" && (
            <VideoPlayer
              ref={playerRef}
              url={currentVideo}
              onProgress={handleProgress}
              onDuration={handleDuration}
              courseId={courseId}
              subTopicId={currentSubTopicId}
            />
          )}
        </div>
      </div>
    </div>
  );
}