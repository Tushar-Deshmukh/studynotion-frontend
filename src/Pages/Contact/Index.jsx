import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Ratings from "../../components/Ratings";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters")
    .required("Message is required"),
});

export default function Index() {

  async function handleSubmit(values, { resetForm }) {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.contactUs,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          message: values.message,
        },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      className="p-5 md:p-10"
      sx={{
        "& .rfm-child": {
          margin: "0 20px",
          maxWidth: "400px",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid  data-aos='fade-left' item xs={12} sm={12} md={6} lg={4}>
          <Box className="p-4 flex flex-col gap-4 bg-[#161D29]">
            <Box className="flex items-start gap-2">
              <img src="/images/chat.png" />
              <Box>
                <p className="text-18 text-white">Chat on us</p>
                <p className="text-textGray text-14">
                  Our friendly team is here to help.
                </p>
                <p className="text-textGray text-14 font-semibold">
                  tushard11020@gmail.com
                </p>
              </Box>
            </Box>

            <Box className="flex items-start gap-2">
              <img src="/images/globe.png" />
              <Box>
                <p className="text-18 text-white">Visit us</p>
                <p className="text-textGray text-14">
                  Come and say hello at our office HQ.
                </p>
                <p className="text-textGray text-14 font-semibold">
                  Please contact on mail.
                </p>
              </Box>
            </Box>

            <Box className="flex items-start gap-2">
              <img src="/images/phone.png" />
              <Box>
                <p className="text-18 text-white">Call us</p>
                <p className="text-textGray text-14">
                  Mon - Fri From 8am to 5pm
                </p>
                <p className="text-textGray text-14 font-semibold">
                  +123 456 7890
                </p>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid  data-aos='fade-right' item xs={12} sm={12} md={6} lg={8}>
          <Box className="max-w-2xl p-5 m:p-10 mx-auto border border-[#424854] rounded-md">
            <div>
              <h2 className="text-36 text-white font-semibold">
                Got a Idea? We’ve got the skills.
                <br />
                Let’s team up
              </h2>

              <p className="text-16 text-textGray">
                Tell us more about yourself and what you’re got in mind.
              </p>
            </div>

            <Box mt={2}>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values,{resetForm}) => handleSubmit(values, { resetForm })}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Box className="flex flex-col gap-1">
                        <lable>First Name</lable>
                        <TextField
                          variant="outlined"
                          placeholder="Enter first name"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormHelperText error>
                          {touched.firstName && errors.firstName}
                        </FormHelperText>
                      </Box>

                      <Box className="flex flex-col gap-1">
                        <lable>Last Name</lable>
                        <TextField
                          variant="outlined"
                          placeholder="Enter last name"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <FormHelperText error>
                          {touched.lastName && errors.lastName}
                        </FormHelperText>
                      </Box>
                    </Box>

                    <Box
                      mt={2}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <Box className="flex flex-col gap-1">
                        <lable>Email</lable>
                        <TextField
                          variant="outlined"
                          placeholder="Enter email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <FormHelperText error>
                          {touched.email && errors.email}
                        </FormHelperText>
                      </Box>

                      <Box className="flex flex-col gap-1">
                        <lable>Phone Number</lable>
                        <TextField
                          variant="outlined"
                          placeholder="Enter phone number"
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <FormHelperText error>
                          {touched.phoneNumber && errors.phoneNumber}
                        </FormHelperText>
                      </Box>
                    </Box>

                    <Box mt={2} className="flex flex-col gap-1">
                      <lable>Message</lable>

                      <TextField
                        variant="outlined"
                        placeholder="Enter message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={5}
                      />

                      <FormHelperText error>
                        {touched.message && errors.message}
                      </FormHelperText>
                    </Box>

                    <Box mt={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        className="w-full"
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box mt={2} mb={2}>
        <Ratings />
      </Box>
    </Box>
  );
}
