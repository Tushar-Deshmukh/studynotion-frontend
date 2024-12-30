import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";
import axios from "../../axios";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CourseCard from "./CourseCard";



export default function Index() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("id");
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({});

  async function getAllCoursesByCategoryId() {
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.getAllCoursesByCategory}/${categoryId}`,
      });
      if (res?.data?.success) {
        setCourses(res?.data?.data);
      }
    } catch (error) {
      setCourses([]);
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  async function getCategoryDetails() {
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.category}/${categoryId}`,
      });
      if (res?.data?.success) {
        setCategory(res?.data?.data);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    if (categoryId) {
      getAllCoursesByCategoryId();
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div>
      <div className="bg-[#161D29]">
        <Container maxWidth="lg">
          <Box className="p-4">
            <Typography variant="h4">{category?.name}</Typography>
            <br />

            <Typography variant="body1" color="text.secondary" className="mt-3">
              {category?.description}
            </Typography>
          </Box>
        </Container>
      </div>

      <Box mt={4}>
        <Container maxWidth="lg">
          <Box className="p-4">
            <Typography variant="h4">Courses to get you started</Typography>
            <Box mt={2} className="flex items-start flex-wrap gap-4">
              {courses.length > 0 &&
                courses?.map((course) => {
                  return (
                    <CourseCard key={course?._id} course={course}/>
                  );
                })}
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}