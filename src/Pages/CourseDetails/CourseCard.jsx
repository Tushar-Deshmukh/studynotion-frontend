import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ key, course }) => {
  const navigate = useNavigate();

  return (
    <Box
      key={key}
      className="w-[300px] h-[350px] cursor-pointer"
      onClick={() => navigate(`/checkout-course?id=${course?._id}`)}
    >
      <Box className="w-full h-[200px] rounded-lg">
        <img
          src={course?.image}
          className="w-full h-full"
          alt={course?.title}
        />
      </Box>
      <Box className="">
        <Typography variant="h6" className="!mt-2" sx={{ fontSize: "16px" }}>
          {course?.title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          className="mt-1"
          sx={{ fontSize: "14px" }}
        >
          {`${course?.createdBy?.firstName} ${course?.createdBy?.lastName}`}
        </Typography>

        <Typography variant="h6" className="mt-2">
          Rs. {course?.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default CourseCard;
