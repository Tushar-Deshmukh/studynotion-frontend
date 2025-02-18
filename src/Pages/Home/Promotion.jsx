import { Button } from "@mui/material";
import React from "react";
import { IoArrowForward } from "react-icons/io5";
import CodeTyping from "./CodeTyping";
import { useNavigate } from "react-router-dom";

export default function Promotion() {
  const navigate = useNavigate();
  return (
    <div className="p-5 md:p-10 bg-coolgray">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
        <div data-aos="fade-right" className="p-0 md:p-12">
          <h2 className="text-36 text-white font-semibold">
            Unlock your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              coding potential
            </span>{" "}
            with our online courses.
          </h2>

          <p className="text-tableGray">
            Our courses are designed and taught by industry experts who have
            years of experience in coding and are passionate about sharing their
            knowledge with you.
          </p>

          <div className="mt-8 flex justify-start items-center gap-6">
            <Button
              variant="contained"
              endIcon={<IoArrowForward />}
              onClick={() => navigate("/login")}
            >
              Try it Yourself
            </Button>

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
              onClick={() => navigate("/login")}
            >
              Learn More
            </Button>
          </div>
        </div>

        <div data-aos="fade-left" className="p-0 md:p-12 relative">
          <div
            className="absolute"
            style={{
              borderRadius: "100%",
              height: "257.05px",
              left: "calc(50% - 263.005px)",
              opacity: 0.2,
              top: "calc(50% - 175.995px)",
              width: "372.95px",
              background:
                "linear-gradient(123.77deg, #8a2be2 -6.46%, orange 59.04%, #f8f8ff 124.53%)",
              filter: "blur(34px)",
              WebkitFilter: "blur(34px)",
              transform: "matrix(1, 0, -0.03, 1, 0, 0)",
              WebkitTransform: "matrix(1, 0, -0.03, 1, 0, 0)",
            }}
          ></div>
          <CodeTyping />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">

        <div data-aos="fade-right" className="p-0 md:p-12 relative order-2 md:order-1">
          <div
            className="absolute"
            style={{
              borderRadius: "100%",
              height: "257.05px",
              left: "calc(50% - 263.005px)",
              opacity: 0.2,
              top: "calc(50% - 175.995px)",
              width: "372.95px",
              background:
                "linear-gradient(118.19deg, #1fa2ff -3.62%, #12d8fa 50.44%, #a6ffcb 104.51%)",
              filter: "blur(34px)",
              WebkitFilter: "blur(34px)",
              transform: "matrix(1, 0, -0.03, 1, 0, 0)",
              WebkitTransform: "matrix(1, 0, -0.03, 1, 0, 0)",
            }}
          ></div>
          <CodeTyping />
        </div>

        <div data-aos="fade-left" className="p-0 md:p-12 order-1 md:order-2">
          <h2 className="text-36 text-white font-semibold">
            Start{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              coding <br /> in seconds
            </span>{" "}
          </h2>

          <p className="text-tableGray">
            Go ahead, give it a try. Our hands-on learning environment means
            you'll be writing real code from your very first lesson.
          </p>

          <div className="mt-8 flex justify-start items-center gap-6">
            <Button variant="contained" endIcon={<IoArrowForward />} onClick={() => navigate("/login")}>
              Try it Yourself
            </Button>

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
              onClick={() => navigate("/login")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
