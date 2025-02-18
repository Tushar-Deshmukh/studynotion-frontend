import { Button } from "@mui/material";
import React from "react";

export default function Index() {
  return (
    <div className="">

      <div data-aos="fade-up" className="text-center bg-coolgray flex flex-col justify-center items-center">

        <div className="max-w-50 p-10">
          <h2 className="text-24 font-semibold text-white">
            Driving Innovation in Online Education for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              Brighter Future
            </span>
          </h2>

          <p className="text-tableGray mt-6">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          <img src="/images/about1.png" />

          <img src="/images/about2.png" />

          <img src="/images/about3.png" />
        </div>

      </div>

      <div data-aos="fade-up" className="px-8 md:px-28 my-4 md:my-10">
        <p className="text-30 md:text-36 text-center text-text-lightGray">
          "We are passionate about revolutionizing the way we learn. Our
          innovative platform{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
            combines technology,
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF512F] to-[#F09819]">
            expertise,
          </span>{" "}
          and community to create{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] to-[#F9D423]">
            an unparalleled educational
          </span>
          &nbsp;experience."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-10 overflow-hidden">
        <div data-aos='fade-left' className="p-6">
          <h2 className="text-36 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
            Our Founding Story{" "}
          </h2>
          <p className="text-tableGray mt-6">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>
          <br />
          <p className="text-tableGray">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </p>
        </div>

        <div  data-aos='fade-right' className="p-6">
          <img src="/images/founding_story.png" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-10 overflow-hidden">

        <div  data-aos='fade-left' className="p-6">
          <h2 className="text-36 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] to-[#F9D423]">
            Our Vision
          </h2>

          <p className="text-tableGray mt-6">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>

        <div  data-aos='fade-right' className="p-6">
          <h2 className="text-36 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] to-[#A6FFCB]">
            Our Mission
          </h2>

          <p className="text-tableGray mt-6">
            our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>

      <div  data-aos='fade-up' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4 p-10 bg-coolgray border border-borderGray">
        <div className="p-4 text-center">
          <h2 className="text-30 text-white">5K</h2>
          <p className="text-tableGray">Active Students</p>
        </div>

        <div className="p-4 text-center">
          <h2 className="text-30 text-white">10+</h2>
          <p className="text-tableGray">Mentors</p>
        </div>

        <div className="p-4 text-center">
          <h2 className="text-30 text-white">200+</h2>
          <p className="text-tableGray">Courses</p>
        </div>

        <div className="p-4 text-center">
          <h2 className="text-30 text-white">50+</h2>
          <p className="text-tableGray">Awards</p>
        </div>
      </div>

      <div  data-aos='fade-up' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-2 p-10">
        {/* First row */}
        <div className="col-span-2 p-4">
          <h2 className="text-36 text-white font-semibold">
            World-Class Learning for <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              Anyone, Anywhere
            </span>
          </h2>

          <p className="text-tableGray mt-4 mb-8">
            Studynotion partners with more than 275+ leading universities and
            companies to bring flexible, affordable, job-relevant online
            learning to individuals and organizations worldwide.
          </p>

          <Button variant="contained">Learn More</Button>
        </div>
        <div className="bg-borderGray p-6">
          <h2 className="text-18 text-white">
            Curriculum Based on Industry Needs
          </h2>

          <p className="mt-4 text-textGray">
            Save time and money! The Belajar curriculum is made to be easier to
            understand and in line with industry needs.
          </p>
        </div>
        <div className="bg-coolgray p-6">
          <h2 className="text-18 text-white">Our Learning Methods</h2>

          <p className="mt-4 text-textGray">
            The learning process uses the namely online and offline.
          </p>
        </div>

        {/* Second row */}
        <div className="p-4"></div>

        <div className="bg-borderGray p-6">
          <h2 className="text-18 text-white">Certification</h2>

          <p className="mt-4 text-textGray">
            You will get a certificate that can be used as a certification
            during job hunting.
          </p>
        </div>

        <div className="bg-coolgray p-6">
          <h2 className="text-18 text-white">Rating "Auto-grading"</h2>

          <p className="mt-4 text-textGray">
            You will immediately get feedback during the learning process
            without having to wait for an answer or response from the mentor.
          </p>
        </div>

        <div className="bg-borderGray p-6">
          <h2 className="text-18 text-white">Ready to Work</h2>

          <p className="mt-4 text-textGray">
            Connected with over 150+ hiring partners, you will have the
            opportunity to find a job after graduating from our program.
          </p>
        </div>
      </div>
    </div>
  );
}
