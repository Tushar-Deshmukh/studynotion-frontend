import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LearningLanguage() {
  const navigate = useNavigate();

  return (
    <div data-aos="fade-up" className="p-5 md:p-10 bg-white">
      <h2 className="text-36 text-hotgray font-semibold text-center">
        Your swiss knife for{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
          learning any language
        </span>
      </h2>

      <p className="text-center max-w-2xl mx-auto text-borderGray">
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
        <img src="/images/progress.png" className="object-contain lg:-mr-32 "/>

        <img src="/images/compare.png" className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"/>

        <img src="/images/plan.png" className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"/>
      </div>

      <div className="mt-8 flex justify-center">
            <Button variant='contained'  onClick={() => navigate("/login")}>Learn More</Button>
      </div>
    </div>
  );
}
