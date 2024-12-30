import React, { useState } from "react";
import {
  Dialog,
  Typography,
  IconButton,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoMdClose } from "react-icons/io";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import ApiConfig from "../../config/ApiConfig";
import Spinner from "../../components/Spinner";

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

const validationSchema = Yup.object().shape({
  videoUrl: Yup.string().required("Video URL is required."),
  title: Yup.string().required("Lecture title is required."),
  description: Yup.string().required("Lecture description is required."),
  hours: Yup.string()
    .matches(/^\d{0,2}$/, "Must be a valid number up to 2 digits.")
    .required("Hours are required."),
  minutes: Yup.string()
    .matches(/^\d{0,2}$/, "Must be a valid number up to 2 digits.")
    .required("Minutes are required."),
  seconds: Yup.string()
    .matches(/^\d{0,2}$/, "Must be a valid number up to 2 digits.")
    .required("Seconds are required."),
});

export default function EditLectureDialog({ open, onClose, topicId }) {
  const [loading, setLoading] = useState(false);

  async function uploadVideo(file, setFieldValue) {
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
        setFieldValue("videoUrl", res?.data?.url);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  async function handleSubmit(values) {
    // Combine the video playback time
    const videoPlaybackTime = `${values.hours.padStart(
      2,
      "0"
    )}:${values.minutes.padStart(2, "0")}:${values.seconds.padStart(2, "0")}`;

    const data = {
      videoUrl: values.videoUrl,
      title: values.title,
      description: values.description,
      videoPlaybackTime,
      topic: topicId,
    };
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.createCourseSubtopic,
        data: data,
      });

      if (res?.data?.success) {
        setLoading(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-4 bg-[#2C333F] border-t border-b border-[#424854]">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="text.primary">
            Edit Lecture
          </Typography>
          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <IoMdClose />
          </IconButton>
        </div>
      </div>

      <div className="p-4 bg-[#2C333F]">
        <Formik
          initialValues={{
            videoUrl: "",
            title: "",
            hours: "",
            minutes: "",
            seconds: "",
            description: "",
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
              {values?.videoUrl ? (
                <div className="flex justify-center items-center mt-4">
                  <video
                    src={values?.videoUrl}
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
                          value={values.videoUrl}
                          type="file"
                          accept="video/mp4"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                              uploadVideo(file, setFieldValue);
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
                  Lecture Title <span className="text-red-500">*</span>
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
                  Video Playback Time <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="HH"
                    name="hours"
                    type="text"
                    value={values.hours}
                    onBlur={handleBlur}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(e) => {
                      const { value } = e.target;
                      const regex = /^[0-9]*$/;
                      if (regex.test(value) && value.length <= 2) {
                        handleChange(e);
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="MM"
                    name="minutes"
                    type="text"
                    value={values.minutes}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(e) => {
                      const { value } = e.target;
                      const regex = /^[0-9]*$/;
                      if (regex.test(value) && value.length <= 2) {
                        handleChange(e);
                      }
                    }}
                    onBlur={handleBlur}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="SS"
                    type="text"
                    name="seconds"
                    value={values.seconds}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(e) => {
                      const { value } = e.target;
                      const regex = /^[0-9]*$/;
                      if (regex.test(value) && value.length <= 2) {
                        handleChange(e);
                      }
                    }}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1 mt-4">
                <label>
                  Lecture Description <span className="text-red-500">*</span>
                </label>

                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter lecture description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <FormHelperText error>
                  {touched.description && errors.description}
                </FormHelperText>
              </div>

              <div className="flex justify-end items-center gap-4 mt-4">
                <Button
                  sx={{
                    backgroundColor: "#161D29",
                  }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save Edits {loading && <Spinner />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
