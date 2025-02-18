import { Button } from "@mui/material";
import React from "react";
import { IoArrowForward } from "react-icons/io5";
import Ratings from "../../components/Ratings";
import { useNavigate } from "react-router-dom";

export default function BecomeAnInstructor() {
  const navigate = useNavigate();
  return (
    <div className="p-5 md:p-10 bg-hotgray">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden">
        <div data-aos="fade-right" className="p-5">
          <img src="/images/instructor.png" />
        </div>

        <div data-aos="fade-left" className="max-w-lg p-5">
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
            <Button
              variant="contained"
              endIcon={<IoArrowForward size={20} />}
              onClick={() => navigate("/signup")}
            >
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
