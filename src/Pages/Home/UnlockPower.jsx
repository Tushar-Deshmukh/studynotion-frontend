import React from "react";

export default function UnlockPower() {
  return (
    <div className="p-5 md:p-10 bg-[#F9F9F9]">
      <h2 className="text-36 text-hotgray font-semibold text-center">
        Unlock the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
          Power of Code
        </span>
      </h2>

      <p className="text-center text-textGray">
        Learn to Build Anything You Can Imagine
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full sm:w-[80%] mx-auto">
       
        <div data-aos="flip-up" className="p-4 bg-white shadow-[12px_12px_0_0_#FFD60A]">
          <h6 className="text-coolgray text-24 font-semibold">Learn HTML</h6>
          <p className="text-textGray mt-2">
            This course covers the basic concepts of HTML including creating and
            structuring web pages, adding text, links, images, and more.
          </p>

          <div className="mt-8 pt-4 border-t flex justify-between items-center border-dashed border-[#C5C7D4]">
            <div className="flex items-center gap-2">
              <img src="/images/html_users.png" />
              <span className="text-[#0A5A72]">Beginner</span>
            </div>

            <div className="flex items-center gap-2">
              <img src="/images/html-lessons.png" />
              <span className="text-[#0A5A72]">Lessons</span>
            </div>
          </div>
        </div>

        <div data-aos="flip-up" className="p-4 bg-coolgray">
          <h6 className="text-white text-24 font-semibold">Learn CSS</h6>
          <p className="text-textGray mt-2">
            This course explores advanced topics in HTML5 and CSS3, including
            animations, transitions, and layout techniques
          </p>

          <div className="mt-8 pt-4 border-t flex justify-between items-center border-dashed border-[#C5C7D4]">
            <div className="flex items-center gap-2">
              <img src="/images/users.png" />
              <span className="text-text-lightGray">Beginner</span>
            </div>

            <div className="flex items-center gap-2">
              <img src="/images/lessons.png" />
              <span className="text-text-lightGray">Lessons</span>
            </div>
          </div>
        </div>

        <div data-aos="flip-up" className="p-4 bg-coolgray">
          <h6 className="text-white text-24 font-semibold">
            Responsive Web design
          </h6>
          <p className="text-textGray mt-2">
            This course teaches responsive web design techniques, allowing web
            pages to adapt to different devices and screen sizes
          </p>

          <div className="mt-8 pt-4 border-t flex justify-between items-center border-dashed border-[#C5C7D4]">
            <div className="flex items-center gap-2">
              <img src="/images/users.png" />
              <span className="text-text-lightGray">Beginner</span>
            </div>

            <div className="flex items-center gap-2">
              <img src="/images/lessons.png" />
              <span className="text-text-lightGray">Lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
