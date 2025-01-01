import { Button, Container } from "@mui/material";
import React from "react";
import { Formik, Form } from "formik";

export default function EditProfile({ profile, handleTypeChange }) {
  return (
    <div>
      <p className="text-30">Edit Profile</p>

      <Formik
        initialValues={{
          profileImage: profile?.profileImage || "",
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Container maxWidth="md" className="mt-8">
              <div className="p-4 border border-borderGray rounded-lg bg-coolgray">

                <div className="flex justify-start gap-4 items-center">
                  <img
                    src={profile?.profileImage}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p>Change Profile Picture</p>
                    <div className="mt-2 flex justify-start gap-2">
                      <Button variant="contained">Change</Button>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#2C333F",
                          color: "#C5C7D4",

                          "&:hover": {
                            background: "#2C333F",
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                    <p className="text-18">Profile Information</p>
                </div>

              </div>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}
