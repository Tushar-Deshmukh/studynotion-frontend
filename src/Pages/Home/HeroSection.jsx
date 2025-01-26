import React from "react";
import { Button } from "@mui/material";
import { IoArrowForward } from "react-icons/io5";

export default function HeroSection() {
  return (
    <div className="p-10 flex flex-col  justify-center items-center gap-8 bg-coolgray">
      {/* Instructor content */}
      <div className="max-w-2xl flex flex-col justify-center items-center gap-8">
        <div>
          <Button
            variant="contained"
            endIcon={<IoArrowForward size={20} />}
            sx={{
              backgroundColor: "#000814",
              borderRadius: "50px",
              color: "#999DAA",
              boxShadow: "inset 0px -1px 0px 0px #FFF",
              fontSize: "16px",

              "&:hover": {
                backgroundColor: "#000814",
                boxShadow: "inset 0px -1px 0px 0px #FFF",
              },
            }}
          >
            Become an Instructor
          </Button>
        </div>

        <div>
          <h2 className="text-36 font-semibold">
            Empower Your Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              Coding Skills
            </span>
          </h2>

          <p className="text-tableGray text-center">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Button variant="contained">Learn More</Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000814",
              color: "#FFF",
              boxShadow: "inset 0px -1px 0px 0px #FFF",
              fontSize: "16px",

              "&:hover": {
                backgroundColor: "#000814",
                boxShadow: "inset 0px -1px 0px 0px #FFF",
              },
            }}
          >
            Book a Demo
          </Button>
        </div>
      </div>

      {/* video */}
      <div
        className="w-full max-w-[900px]"
        style={{
          boxShadow: "20px 20px #fff",
        }}
      >
        <video controls autoPlay className="w-full">
          <source
            src="https://res.cloudinary.com/dxifrqxkm/video/upload/v1737911608/videos/vnlbgzvug1uzuq9c4pow.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
