import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";
import axios from "../../axios";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import EditLectureDialog from "./EditLectureDialog";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

export default function CourseBuilder({
  courseId,
  handleNext,
  handlePrevious,
}) {
  const [topic, setTopic] = useState("");
  const [courseTopics, setCourseTopics] = useState([]);
  const [openEditLectureDialog, setOpenEditLectureDialog] = useState(false);
  const [topicId, setTopicId] = useState(null);

  function handleOpenEditLectureDialog(id) {
    setOpenEditLectureDialog(!openEditLectureDialog);
    setTopicId(id);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.createCourseTopic,
        data: {
          name: topic,
          course: courseId,
        },
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setTopic("");
        getAllCourseTopics(res?.data?.data?.course);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  async function getAllCourseTopics(courseId) {
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.courseTopics}/${courseId}`,
      });

      if (res?.data?.success) {
        setCourseTopics(res?.data?.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    if (courseId) {
      getAllCourseTopics(courseId);
    }
  }, [courseId]);

  return (
    <div className="p-4 bg-[#2C333F] border rounded-lg border-[#161D29]">
      <Typography variant="h4" color="text.primary">
        Course Builder
      </Typography>

      <form onSubmit={handleSubmit}>
        {courseTopics.length > 0 &&
          courseTopics.map((topic) => {
            return (
              <Box
                mt={1}
                mb={1}
                className="flex items-center justify-between gap-2"
              >
                <Box className="flex-grow">
                  <TextField fullWidth variant="outlined" value={topic?.name} />
                </Box>

                <Box className="flex items-center gap-2">
                  <IconButton
                    sx={{ color: "gray" }}
                    onClick={() => handleOpenEditLectureDialog(topic?._id)}
                  >
                    <MdModeEditOutline />
                  </IconButton>

                  <IconButton sx={{ color: "gray" }}>
                    <RiDeleteBin5Line />
                  </IconButton>
                </Box>
              </Box>
            );
          })}

        <Box mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter the name of the topic"
            required
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </Box>

        <Box mt={2}>
          <Button type="submit" variant="outlined" startIcon={<FiPlusCircle />}>
            Create Section
          </Button>
        </Box>
      </form>

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
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>

      {openEditLectureDialog && (
        <EditLectureDialog
          open={openEditLectureDialog}
          onClose={handleOpenEditLectureDialog}
          topicId={topicId}
        />
      )}
    </div>
  );
}
