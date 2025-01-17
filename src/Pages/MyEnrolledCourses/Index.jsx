import React, { useState, useEffect } from "react";
import ApiConfig from "../../config/ApiConfig";
import { Box, Card, Typography, Skeleton } from "@mui/material";
import axios from "../../axios";
import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  async function getMyEnrolledCourses() {
    try {
      setLoading(true);
      const res = await axios.get(ApiConfig.myEnrolledCourses);
      if (res?.data?.success) {
        setEnrolledCourses(res?.data?.data);
      }
    } catch (error) {
      setEnrolledCourses([]);
      if (error) {
        console.error(error);
        console.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyEnrolledCourses();
  }, []);

  // Utility function to display the duration
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
    <div className="p-4">
      <h2 className="text-24">My Learnings</h2>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card
                elevation={2}
                key={index}
                className="w-full max-w-sm cursor-pointer"
              >
                <Skeleton variant="rectangular" height={160} />
                <Box className="p-2">
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Card>
            ))
          : enrolledCourses &&
            enrolledCourses.length > 0 &&
            enrolledCourses.map((course) => {
              return (
                <Card
                  elevation={2}
                  key={course?._id}
                  className="w-full max-w-sm cursor-pointer text-left"
                  component="button"
                  onClick={() =>
                    navigate(`/course-player?id=${course?.courseId?._id}`)
                  }
                >
                  <img
                    src={course?.courseId?.image}
                    className="w-full h-40 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-90 hover:shadow-lg"
                  />
                  <Box className="p-2">
                    <Typography variant="h6">
                      {course?.courseId?.title &&
                        course?.courseId?.title.slice(0, 30) + "..."}
                    </Typography>
                    <p className="text-14 my-2 text-textGray">
                      {course?.courseId?.description &&
                        course?.courseId?.description.slice(0, 60) + "..."}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-14 my-2 text-white flex items-center gap-2">
                        <MdOutlineAccessTime />{" "}
                        {formatDuration(course?.courseId?.totalDuration)}
                      </p>

                      <p
                        className={`${
                          course?.status === "Completed"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {course?.status === "All" ? "In Progress" : course?.status}
                      </p>
                    </div>
                  </Box>
                </Card>
              );
            })}
      </div>
    </div>
  );
}
