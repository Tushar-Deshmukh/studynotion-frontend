import { Button } from "@mui/material";
import React from "react";
import { IoArrowForward } from "react-icons/io5";
import Ratings from "../../components/Ratings";

export default function BecomeAnInstructor() {
  return (
    <div className="p-10 bg-hotgray">
      <div className="flex fle-col md:flex-row justify-between items-center gap-8">

        <div className="p-5">
          <img src="/images/instructor.png" />
        </div>

        <div className="max-w-lg p-5">
          <h2 className="text-36 font-semibold">
            Become an <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              instructor
            </span>{" "}
          </h2>

          <p className="text-tableGray">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="mt-8">
            <Button variant="contained" endIcon={<IoArrowForward size={20} />}>
              Start Teaching Today
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Ratings />
      </div>
    </div>
  );
}
