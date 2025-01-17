import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import DataLoader from "../../components/DataLoader";
import VideoPlayer from "./VideoPlayer";
import AddRatingDialog from "./AddRatingDialog";
import toast from "react-hot-toast";

export default function Index() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");
  const [course, setCourse] = useState({});
  const [sectionsLength, setSectionsLength] = useState(0);
  const [subSectionsLength, setSubSectionsLength] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSubTopicId, setCurrentSubTopicId] = useState(null);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [currentSubTopic, setCurrentSubTopic] = useState({});

  const handleOpenRatingDialog = () => {
    setOpenRatingDialog(!openRatingDialog);
  };

  const playerRef = useRef(null);

  const handleProgress = (state) => {
    // Handle progress if needed
    if (state?.played == 1) {
      getCourseByCourseId();
    }
  };

  const handleDuration = (duration) => {};

  const handleSubTopicClick = (videoUrl, subTopicId,subtopic) => {
    setCurrentVideo(videoUrl);
    setCurrentSubTopicId(subTopicId);
    setCurrentSubTopic(subtopic);
  };

  async function getCourseByCourseId() {
    try {
      setLoading(true);
      const res = await axios.get(`${ApiConfig.myEnrolledCourse}/${courseId}`);
      if (res?.data?.success) {
        const coursedata = res?.data?.data;
        setCourse(coursedata);

        setSectionsLength(coursedata?.courseId?.courseContent?.topics.length);

        const subtopics = coursedata?.courseId?.courseContent?.topics?.reduce(
          (count, topic) => {
            return count + topic?.subTopics?.length;
          },
          0
        );

        setSubSectionsLength(subtopics);

        // Set the first video's URL
        if (
          coursedata?.courseId?.courseContent?.topics?.[0]?.subTopics?.[0]
            ?.videoUrl
        ) {
          setCurrentVideo(
            coursedata?.courseId?.courseContent?.topics[0]?.subTopics[0]
              ?.videoUrl
          );
        }

        setCurrentSubTopicId(
          coursedata?.courseId?.courseContent?.topics[0].subTopics[0]._id
        );

        setCurrentSubTopic(
          coursedata?.courseId?.courseContent?.topics[0].subTopics[0]
        );

        if (subtopics == coursedata?.completedSubTopics.length) {
          setIsCourseCompleted(true);
        }
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

  async function addRating(rating, review) {
    try {
      if (rating == 0 || review == "") {
        toast.error("Please give a rating and review");
        return;
      }

      const res = await axios({
        method: "POST",
        url: ApiConfig.addRating,
        data: {
          courseId: courseId,
          rating: rating,
          review: review,
        },
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setOpenRatingDialog(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div>
      <div className="flex justify-start">
        <div className="flex-grow-0 py-6 bg-coolgray border-r border-borderGray">
          <div className="text-white p-4 text-16 flex items-center justify-between gap-4">
            <p className="text-wrap flex-grow-1">{course?.courseId?.title}</p>
            <p
              className={`${
                isCourseCompleted && "text-green-500"
              } flex-shrink-0`}
            >
              {(Array.isArray(course.completedSubTopics) &&
                course?.completedSubTopics.length) ||
                0}{" "}
              / {subSectionsLength}
            </p>
          </div>

          {isCourseCompleted && (
            <div className="p-4">
              <Button
                variant="contained"
                onClick={() => setOpenRatingDialog(true)}
              >
                Add Review
              </Button>
            </div>
          )}

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
            {course?.courseId?.courseContent?.topics?.map((topic) => (
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
                      className="text-text-extraGray space-x-2 flex-shrink-0"
                    >
                      {topic?.topicDuration &&
                        formatDuration(topic?.topicDuration)}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <List>
                    {topic?.subTopics.map((subtopic) => {
                      const isCompletedSubtoic =
                        course?.completedSubTopics.includes(subtopic?._id);
                      return (
                        <ListItem
                          disablePadding
                          key={subtopic?._id}
                          button
                          onClick={() =>
                            handleSubTopicClick(
                              subtopic?.videoUrl,
                              subtopic?._id,
                              subtopic
                            )
                          }
                        >
                          <Checkbox checked={isCompletedSubtoic} />
                          <ListItemText
                            primary={subtopic?.title}
                            className="text-14"
                          />
                          <p>{subtopic?.videoPlaybackTime}</p>
                        </ListItem>
                      );
                    })}
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

          <div className="mt-4">
            <p className="text-24">{currentSubTopic?.title}</p>
            <p className="text-18 text-text-lightGray">
              {currentSubTopic?.description}
            </p>
          </div>
        </div>
      </div>

      {openRatingDialog && (
        <AddRatingDialog
          open={openRatingDialog}
          onClose={handleOpenRatingDialog}
          addRating={addRating}
        />
      )}
    </div>
  );
}
