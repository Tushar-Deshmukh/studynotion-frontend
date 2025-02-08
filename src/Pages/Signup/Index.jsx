import {
  Typography,
  ButtonGroup,
  Button,
  TextField,
  Container,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ButtonLoader from "../../components/ButtonLoader";
import ApiConfig from "../../config/ApiConfig";
import axios from "../../axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpContainer = styled("div")((theme) => ({
  "& p": {
    fontFamily: "Inter",
    "& span": {
      color: "#1FA2FF",
      fontWeight: 600,
      fontStyle: "italic",
    },
  },

  "& label": {
    fontFamily: "Inter",
  },

  "& .btngroup": {
    background: "#161D29",
    gap: "5px",
    padding: "5px",
    borderRadius: "50px",
    boxShadow: "inset 0px -1px 0px 0px #FFFFFF",

    "& .MuiButtonGroup-firstButton": {
      borderRadius: "25px",
      height: "36px",
      fontSize: "16px",
    },

    "& .MuiButtonGroup-lastButton": {
      borderRadius: "25px",
      height: "36px",
      fontSize: "16px",
    },
  },
}));

export default function Index() {
  const [selectedRole, setSelectedRole] = useState("Instructor");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.register,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: selectedRole,
          mobileNumber: values.phoneNumber,
        },
      });

      if (res?.status === 201) {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate(`/verify-otp?email=${values.email}`);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <SignUpContainer>
      <Container maxWidth="lg">
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          <div data-aos='fade-left' className="w-full sm:max-w-md mx-auto">
            <div className="my-4">
              <Typography variant="h4" fontWeight={600}>
                Welcome Back
              </Typography>
              <Typography variant="body1">
                Discover your passions,
                <br />
                <span color="secondary">Be Unstoppable</span>
              </Typography>
            </div>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <div>
                    <ButtonGroup className="btngroup my-4">
                      <Button
                        variant="contained"
                        onClick={() => setSelectedRole("Student")}
                        sx={{
                          background:
                            selectedRole === "Student"
                              ? "black"
                              : "transparent",
                          color:
                            selectedRole === "Student" ? "#FFF" : "#999DAA",
                          "&:hover": {
                            backgroundColor:
                              selectedRole === "Student"
                                ? "black"
                                : "transparent",
                          },
                        }}
                      >
                        Student
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => setSelectedRole("Instructor")}
                        sx={{
                          background:
                            selectedRole === "Instructor"
                              ? "black"
                              : "transparent",
                          color:
                            selectedRole === "Instructor" ? "#FFF" : "#999DAA",
                          "&:hover": {
                            backgroundColor:
                              selectedRole === "Instructor"
                                ? "black"
                                : "transparent",
                          },
                        }}
                      >
                        Instructor
                      </Button>
                    </ButtonGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full flex flex-col gap-1">
                      <label>
                        Firstname <span className="text-red-500">*</span>
                      </label>

                      <TextField
                        fullWidth
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
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <label>
                        Lastname <span className="text-red-500">*</span>
                      </label>

                      <TextField
                        fullWidth
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
                    </div>
                  </div>

                  <div className="w-full mt-4 flex flex-col gap-1">
                    <label>
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Enter email address"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </div>

                  <div className="w-full mt-4 flex flex-col gap-1">
                    <label>
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <TextField
                      fullWidth
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="w-full flex flex-col gap-1">
                      <label>
                        Create Password <span className="text-red-500">*</span>
                      </label>

                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: "#AFB2BF" }}
                              >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <FormHelperText error>
                        {touched.password && errors.password}
                      </FormHelperText>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <label>
                        Confirm Password <span className="text-red-500">*</span>
                      </label>

                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                                sx={{ color: "#AFB2BF" }}
                              >
                                {showConfirmPassword ? (
                                  <FaEye />
                                ) : (
                                  <FaEyeSlash />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <FormHelperText error>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormHelperText>
                    </div>
                  </div>

                  <div className="w-full mt-8">
                    <Button
                      variant="contained"
                      className="w-full"
                      type="submit"
                    >
                      Create Account {loading && <Spinner />}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div data-aos='fade-right' className="w-full h-full hidden md:block">
            <div className="w-full h-full flex justify-center items-center">
              <img src="images/signup.png" className="max-w-md" />
            </div>
          </div>
        </div>
      </Container>
    </SignUpContainer>
  );
}
