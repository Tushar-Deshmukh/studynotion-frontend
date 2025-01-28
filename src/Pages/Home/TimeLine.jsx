import { Button } from "@mui/material";
import React from "react";

export default function TimeLine() {
  return (
    <div className="p-10 bg-[#F9F9F9]">
      <div className="flex justify-between items-center flex-wrap">
        <div className="max-w-lg">
          <h2 className="text-hotgray text-36 font-semibold">
            Get the skills you need for a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              job that is in demand.
            </span>
          </h2>
        </div>

        <div className="max-w-lg">
          <p className="text-tableGray mb-8">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </p>

          <Button variant="contained">Learn More</Button>
        </div>
      </div>

      <div className="my-12 flex justify-between items-center">
        {/* timeline */}
        <div>
          <div className="flex gap-x-3">
            <div className="relative last:after:hidden after:absolute after:top-[4.5rem] after:bottom-[-0.5rem] after:start-[1.875rem] after:w-px after:-translate-x-[0.5px] after:border-l after:border-dashed after:border-gray-200 dark:after:border-neutral-700">
              <div className="w-14 h-14 flex justify-center items-center rounded-full bg-white">
                <img src="/images/badge.png" />
              </div>
            </div>

            <div className="grow pt-0.5 pb-8">
              <h2 className="text-24 text-hotgray">Leadership</h2>
              <p className="text-tableGray">
                Fully committed to the success company
              </p>
            </div>
          </div>

          <div className="flex gap-x-3 mt-4">
            <div className="relative last:after:hidden after:absolute after:top-[4.5rem] after:bottom-[-0.5rem] after:start-[1.875rem] after:w-px after:-translate-x-[0.5px] after:border-l after:border-dashed after:border-gray-200 dark:after:border-neutral-700">
              <div className="w-14 h-14 flex justify-center items-center rounded-full bg-white">
                <img src="/images/cap.png" />
              </div>
            </div>

            <div className="grow pt-0.5 pb-8">
              <h2 className="text-24 text-hotgray">Responsibility</h2>
              <p className="text-tableGray">
                Students will always be our top priority
              </p>
            </div>
          </div>

          <div className="flex gap-x-3 mt-4">
            <div className="relative last:after:hidden after:absolute after:top-[4.5rem] after:bottom-[-0.5rem] after:start-[1.875rem] after:w-px after:-translate-x-[0.5px] after:border-l after:border-dashed after:border-gray-200 dark:after:border-neutral-700">
              <div className="w-14 h-14 flex justify-center items-center rounded-full bg-white">
                <img src="/images/diamond.png" />
              </div>
            </div>

            <div className="grow pt-0.5 pb-8">
              <h2 className="text-24 text-hotgray">Flexibility</h2>
              <p className="text-tableGray">
                The ability to switch is an important skills
              </p>
            </div>
          </div>

          <div className="flex gap-x-3 mt-4">
            <div className="relative">
              <div className="w-14 h-14 flex justify-center items-center rounded-full bg-white">
                <img src="/images/code.png" />
              </div>
            </div>

            <div className="grow pt-0.5 pb-8">
              <h2 className="text-24 text-hotgray">Solve the problem</h2>
              <p className="text-tableGray">Code your way to a solution</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img src="/images/working-girl.png" />
          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2  flex justify-between items-center p-2 bg-[#014A32]">
            <div className="flex items-center gap-8 p-4">
              <h2 className="text-36 text-white">10</h2>
              <p className="text-[#05A77B]">
                YEARS
                <br />
                EXPERIENCES
              </p>
            </div>

            <div className="border border-[#037957] h-20"></div>

            <div className="flex items-center gap-8 p-4">
              <h2 className="text-36 text-white">10</h2>
              <p className="text-[#05A77B]">
                YEARS
                <br />
                EXPERIENCES
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
