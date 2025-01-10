import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";

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

// Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Course title is required"),
  description: Yup.string().required("Course description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("At least one tag is required"),
  thumbnail: Yup.string().required("Course thumbnail is required"),
  benefits: Yup.string().required("Course benefits are required"),
});

export default function CourseInformation({handleNext,setCourseId}) {
  const [categories, setCategories] = useState([]);
  const [requirements, setRequirements] = useState([""]);

  const handleAddRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
  };

  async function handleSubmit(values) {
    const data = {
      ...values,
      image: values.thumbnail,
      tags: values.tags.split(",").map((tag) => tag.trim()),
      requirements: requirements,
      profession:"Instructor"
    };
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.createCourse,
        data: data,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setCourseId(res?.data?.data?._id);
        handleNext();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  async function uploadImage(file, setFieldValue) {
    let formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadImage,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (res?.data?.success) {
        setFieldValue("thumbnail", res?.data?.url);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response?.data?.message);
      }
    }
  }

  async function getCourseCategories() {
    try {
      const res = await axios.get(ApiConfig.categories);
      if (res?.data?.success) {
        setCategories(res?.data?.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getCourseCategories();
  }, []);

  return (
    <div className="p-4 bg-[#2C333F] border border-[#2C333F] rounded-xl">
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          category: "",
          tags: "",
          thumbnail: "",
          benefits:""
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          values,
          errors,
          handleBlur,
          handleChange,
          touched,
          setFieldValue,
        }) => (
          <Form>
            <div className="w-full flex flex-col gap-1">
              <label>
                Course Title <span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter course title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FormHelperText error>
                {touched.title && errors.title}
              </FormHelperText>
            </div>

            <div className="w-full flex flex-col gap-1 mt-4">
              <label>
                Course Short Description <span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter course description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={5}
              />

              <FormHelperText error>
                {touched.description && errors.description}
              </FormHelperText>
            </div>

            <div className="w-full flex flex-col gap-1 mt-4">
              <label>
                Price <span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter course price"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        style={{ width: 24, height: 24 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              />

              <FormHelperText error>
                {touched.price && errors.price}
              </FormHelperText>
            </div>

            <div className="w-full flex flex-col gap-1 mt-4">
              <label>
                Category <span className="text-red-500">*</span>
              </label>

              <Select
                fullWidth
                variant="outlined"
                name="category"
                component="Select"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                displayEmpty
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
              >
                <MenuItem value="">Choose a Category</MenuItem>
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <MenuItem key={category?._id} value={category?._id}>
                        {category?.name}
                      </MenuItem>
                    );
                  })}
              </Select>

              <FormHelperText error>
                {touched.category && errors.category}
              </FormHelperText>
            </div>

            <div className="w-full flex flex-col gap-1 mt-4">
              <label>
                Tags <span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter course tags"
                name="tags"
                value={values.tags}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FormHelperText error>
                {touched.tags && errors.tags}
              </FormHelperText>
            </div>

            {values?.thumbnail ? (
              <div className="flex justify-center items-center mt-4">
                <img
                  src={values?.thumbnail}
                  className="w-20 h-20 object-contain"
                />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-1 mt-4">
                <label>
                  Course Thumbnail <span className="text-red-500">*</span>
                </label>

                <div className="flex flex-col justify-center items-center p-4 border border-dashed border-[#424854] rounded-lg gap-4">
                  <img src="images/upload-cloud.png" />

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
                        name="thumbnail"
                        value={values.thumbnail}
                        type="file"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file) {
                            uploadImage(file, setFieldValue);
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

            <div className="w-full flex flex-col gap-1 mt-4">
              <label>
                Benefits of the course <span className="text-red-500">*</span>
              </label>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter course benefits"
                name="benefits"
                value={values.benefits}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={3}
              />

              <FormHelperText error>
                {touched.benefits && errors.benefits}
              </FormHelperText>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-1 mt-4">
              <label>
                Requirements/Instructions{" "}
                <span className="text-red-500">*</span>
              </label>

              {requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2 w-full"
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={`Enter Requirement/Intruction no ${index + 1}`}
                    value={requirement}
                    onChange={(e) =>
                      handleRequirementChange(index, e.target.value)
                    }
                  />
                  {index > 0 && (
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveRequirement(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              <Button variant="text" onClick={handleAddRequirement}>
                Add
              </Button>
            </div>

            <div className="mt-8 flex justify-end items-center">
              <Button type="submit" variant="contained" endIcon={<IoIosArrowForward />}>
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
