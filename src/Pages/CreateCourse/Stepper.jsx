import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const steps = ["Course Information", "Course Builder", "Publish"];

export default function CustomeStepper({activeStep}) {
  // const [activeStep, setActiveStep] = useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                sx={{
                  "& svg": {
                    color: "inherit",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
