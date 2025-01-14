import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Formik, Form } from "formik";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import * as Yup from "yup";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const ValidationSchema = Yup.object({
  profileImage: Yup.string().url("Invalid image URL").nullable(),
  displayName: Yup.string()
    .required("Display name is required.")
    .min(3, "Display name must be at least 3 characters.")
    .max(50, "Display name must not exceed 50 characters."),
  profession: Yup.string()
    .required("Profession is required.")
    .oneOf(["Developer", "Student"], "Invalid profession selected."),
  dateOfBirth: Yup.date()
    .nullable()
    .required("Date of birth is required.")
    .max(new Date(), "Date of birth cannot be in the future."),
  gender: Yup.string()
    .required("Please select your gender.")
    .oneOf(["Male", "Female", "Other"], "Invalid gender selection."),
  phoneNumber: Yup.string()
    .required("Phone number is required.")
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits and contain only numbers."
    ),
  about: Yup.string()
    .max(300, "About section must not exceed 300 characters.")
    .nullable(),
  currentPassword: Yup.string()
    .required("Current password is required.")
    .min(6, "Password must be at least 6 characters."),
  changePassword: Yup.string()
    .nullable()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must not exceed 20 characters.")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password cannot be the same as the current password."
    ),
});

const EditProfileContainer = styled("div")({
  "& .MuiOutlinedInput-root": {
    background: "#2C333F",
    border: "1px solid #2C333F",
  },
});

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

export default function EditProfile({ profile, handleTypeChange }) {


  async function uploadImage(image) {
    let formData = new FormData();
    formData.append("image", image);

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
        return res;
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
        return error;
      }
    }
  }

  async function handleSubmit(values) {
    console.log(values);
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.updateProfile,
        data: {
          profileImage: values.profileImage,
          mobileNumber: values.phoneNumber,
          displayName: values.displayName,
          profession: values.profession,
          dateOfBirth: values.dateOfBirth,
          about: values.about,
          password: values.changePassword,
          gender: values.gender,
        },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        handleTypeChange('view');
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      }
    }
  }

  return (
    <EditProfileContainer>
      <p className="text-30">Edit Profile</p>

      <Formik
        initialValues={{
          profileImage: profile?.profileImage || "",
          displayName: profile?.displayName || "",
          profession: profile?.profession || "",
          dateOfBirth: profile?.dateOfBirth
            ? dayjs(profile?.dateOfBirth)
            : null,
          gender: profile?.gender || "",
          phoneNumber: profile?.mobileNumber || "",
          about: profile?.about || "",
          currentPassword: profile?.password || "",
          changePassword: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <Form>
            <Container maxWidth="md" className="mt-8">
              <div className="p-4 border border-borderGray rounded-lg bg-coolgray">
                <div className="flex justify-start gap-4 items-center">
                  {values?.profileImage ? (
                    <img
                      src={values?.profileImage}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar className="w-16 h-16 rounded-full object-cover" />
                  )}

                  <div>
                    <p>Change Profile Picture</p>

                    <div className="mt-2 flex justify-start gap-2">
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                      >
                        Change
                        <VisuallyHiddenInput
                          type="file"
                          name="profileImage"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                              uploadImage(file)
                                .then((response) => {
                                  setFieldValue(
                                    "profileImage",
                                    response?.data?.url
                                  );
                                })
                                .catch((error) => {
                                  console.log(error);
                                  setFieldValue("profileImage", "");
                                });
                            }
                          }}
                        />
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          background: "#2C333F",
                          color: "#C5C7D4",

                          "&:hover": {
                            background: "#2C333F",
                          },
                        }}
                        onClick={() => setFieldValue("profileImage", "")}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-18">Profile Information</p>

                  <Box mt={2} className="grid gird-cols-1 md:grid-cols-2 gap-4">
                    <Box className="flex flex-col gap-1">
                      <label>Display Name</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="******"
                        name="displayName"
                        value={values.displayName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <FormHelperText error>
                        {touched.displayName && errors.displayName}
                      </FormHelperText>
                    </Box>

                    <Box className="flex flex-col gap-1">
                      <label>Profession</label>
                      <Select
                        fullWidth
                        variant="outlined"
                        name="profession"
                        value={values.profession}
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
                        <MenuItem value="">Select Profession</MenuItem>
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                      </Select>

                      <FormHelperText error>
                        {touched.profession && errors.profession}
                      </FormHelperText>
                    </Box>
                  </Box>

                  <Box mt={2} className="grid gird-cols-1 md:grid-cols-2 gap-4">
                    <Box className="flex flex-col gap-1">
                      <label>Date of Birth</label>
                      <DatePicker
                        className="date-picker w-full"
                        name="dateOfBirth"
                        value={values.dateOfBirth}
                        onChange={(newValue) =>
                          setFieldValue("dateOfBirth", newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            placeholder="Date of Birth"
                          />
                        )}
                      />

                      <FormHelperText error>
                        {touched.dateOfBirth && errors.dateOfBirth}
                      </FormHelperText>
                    </Box>

                    <Box className="flex justify-center items-center">
                      <FormControl
                        component="fieldset"
                        error={Boolean(touched.gender && errors.gender)}
                        fullWidth
                      >
                        <FormLabel component="legend">Gender</FormLabel>

                        <RadioGroup
                          name="gender"
                          value={values.gender}
                          onChange={handleChange}
                          row
                          className="flex justify-between items-center"
                        >
                          <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="Male"
                          />

                          <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                          />

                          <FormControlLabel
                            value="Other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                        {touched.gender && errors.gender && (
                          <FormHelperText>{errors.gender}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Box>

                  <Box mt={2} className="grid gird-cols-1 md:grid-cols-2 gap-4">
                    <Box className="flex flex-col gap-1">
                      <label>Phone Number</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Phone Number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <FormHelperText error>
                        {touched.phoneNumber && errors.phoneNumber}
                      </FormHelperText>
                    </Box>

                    <Box className="flex flex-col gap-1">
                      <label>About</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter you bio"
                        name="about"
                        value={values.about}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <FormHelperText error>
                        {touched.about && errors.about}
                      </FormHelperText>
                    </Box>
                  </Box>
                </div>

                <div className="mt-8">
                  <p className="text-18">Password</p>

                  <Box mt={2} className="grid gird-cols-1 md:grid-cols-2 gap-4">
                    <Box className="flex flex-col gap-1">
                      <label>Current Password</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="currentPassword"
                        // value={values.currentPassword}
                        value="******"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                      />

                      <FormHelperText error>
                        {touched.currentPassword && errors.currentPassword}
                      </FormHelperText>
                    </Box>

                    <Box className="flex flex-col gap-1">
                      <label>Change Password</label>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter New Password"
                        name="changePassword"
                        value={values.changePassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <FormHelperText error>
                        {touched.changePassword && errors.changePassword}
                      </FormHelperText>
                    </Box>
                  </Box>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#340019] boder border-[#691432] rounded-lg">
                <div className="flex justify-start items-start gap-6">
                  <img src="/images/delete_icon.png" />

                  <div>
                    <p className="text-18">Delete Account</p>
                    <p className="text-14 mt-4">
                      Would you like to delete account?
                    </p>
                    <p className="text-14 mt-2">
                      This account contains Paid Courses. Deleting your account
                      will remove all the <br />
                      contain associated with it.
                    </p>

                    <p className="text-16 mt-3 text-[#D43D63] italic">
                      I want to delete my account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end items-center gap-4">
                <Button
                  variant="contained"
                  onClick={() => handleTypeChange('view')}
                  sx={{
                    background: "#161D29",
                    color: "white",

                    "&:hover": {
                      background: "#161D29",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </div>
            </Container>
          </Form>
        )}
      </Formik>
    </EditProfileContainer>
  );
}
