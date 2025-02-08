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
import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ButtonLoader from "../../components/ButtonLoader";
import ApiConfig from "../../config/ApiConfig";
import axios from "../../axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../context/AuthContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

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
  const auth = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState("Instructor");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleNavigation(role) {
    if (role === "Student") {
      navigate("/my-profile");
    } else {
      navigate("/dashboard");
    }
  }

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.login,
        data: {
          email: values.email,
          password: values.password,
        },
      });

      if (res?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        auth.userLogin(true, res?.data?.token);
        handleNavigation(res?.data?.user?.role);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <SignUpContainer className="h-full flex justify-center items-center">
      <Container maxWidth="md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div data-aos='fade-left' className="max-w-md mx-auto">
            <div>
              <Typography variant="h4" fontWeight={600}>
                Welcome Back
              </Typography>
              <Typography variant="body1">
                Build skills for today, tomorrow, and beyond.
                <br />
                <span color="secondary">
                  Education to future-proof your career.
                </span>
              </Typography>
            </div>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
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

                  <div className="w-full flex flex-col gap-1 mt-4">
                    <label>
                      Password <span className="text-red-500">*</span>
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

                  <div className="flex justify-end">
                    <Link to="/forgot-password" color="secondary">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="w-full mt-8">
                    <Button
                      variant="contained"
                      className="w-full"
                      type="submit"
                    >
                      Sign In {loading && <Spinner />}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div data-aos='fade-right' className="w-full h-full hidden md:block">
            <div className="w-full h-full flex justify-center items-center">
              <img src="images/login.png" className="max-w-sm" />
            </div>
          </div>
        </div>
      </Container>
    </SignUpContainer>
  );
}
