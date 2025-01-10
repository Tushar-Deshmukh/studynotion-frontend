import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import CustomeStepper from "./Stepper";
import { Box, Typography } from "@mui/material";
import CourseInformation from "./CourseInformation";
import CourseBuilder from "./CourseBuilder";
import Publish from "./Publish";

const tips = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important",
  "Notes to all enrolled students at once.",
];

export default function Index() {
  const [activeStep, setActiveStep] = useState(0);
  const [courseId, setCourseId] = useState(null);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const steps = [
    {
      id: 1,
      label: "Course Information",
      component: () => (
        <CourseInformation setCourseId={setCourseId} handleNext={handleNext} />
      ),
    },
    {
      id: 2,
      label: "Course Builder",
      component: () => (
        <CourseBuilder
          courseId={courseId}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      ),
    },
    {
      id: 3,
      label: "Publish",
      component: () => <Publish courseId={courseId}/>,
    },
  ];

  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      <div className="col-span-7">
        <Link className="text-text-lightGray flex justify-start gap-2 items-center font-sans">
          <MdArrowBackIos /> Back to Dashboard
        </Link>

        <Box mt={4}>
          <CustomeStepper activeStep={activeStep} />
        </Box>

        <div className="mt-6">{steps[activeStep].component()}</div>
      </div>

      <div className="col-span-4">
        <div className="p-4 border border-[#2C333F] rounded-lg bg-[#161D29]">
          <Typography variant="h6" color="text.primary">
            <span className="text-yellow-500">⚡</span>Course Upload Tips
          </Typography>

          <ul className="list-disc  flex flex-col gap-2 pl-4 mt-4 text-sm text-white">
            {tips.map((tip, i) => {
              return <li key={i}>{tip}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
