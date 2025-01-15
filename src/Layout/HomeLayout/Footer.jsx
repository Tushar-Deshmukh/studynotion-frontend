import React from "react";

const resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const subjects = [
  "AI",
  "Cloud Computing",
  "Code Foundations",
  "Computer Science",
  "Cybersecurity",
  "Data Analytics",
  "Data Science",
  "Data Visualization",
  "Developer Tools",
  "DevOps",
  "Game Development",
  "IT",
  "Machine Learning",
  "Math",
  "Mobile Development",
  "Web Design",
  "Web Development",
];

const languages = [
  "Bash",
  "C",
  "C++",
  "C#",
  "Go",
  "HTML & CSS",
  "Java",
  "JavaScript",
  "Kotlin",
  "PHP",
  "Python",
  "R",
  "Ruby",
  "SQL",
  "Swift",
];

const careerbuiding = [
  "Career paths",
  "Career services",
  "Interview prep",
  "Professional certification",
  "Full Catalog",
  "Beta Content",
];

export default function Footer() {
  return (
    <div className="p-6 bg-coolgray border-t border-footerBorder">
      <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 p-4 md:grid-cols-3 gap-4 md:border-r md:border-[#2C333F]">
          <div>
            <img src="/images/footerlogo.png" />

            <div>
              <p className="text-text-lightGray text-16 my-3">Company</p>
              <ul className="text-textGray text-14 flex flex-col gap-1">
                <li>About</li>
                <li>Careers</li>
                <li>Affiliates</li>
              </ul>
            </div>

            <div className="mt-4">
              <ul className="flex items-center gap-4">
                <li>
                  <img src="/images/Facebook.png" />
                </li>

                <li>
                  <img src="/images/Google.png" />
                </li>

                <li>
                  <img src="/images/Twitter.png" />
                </li>

                <li>
                  <img src="/images/Youtube.png" />
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-text-lightGray text-16 mb-3">Resources</p>

            <ul className="flex flex-col text-14 text-textGray gap-1">
              {resources.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>

            <p className="text-text-lightGray text-16 mt-3 mb-3">Support</p>

            <ul className="flex flex-col text-14 text-textGray gap-1">
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <p className="text-text-lightGray text-16 mb-3">Plans</p>

            <ul className="flex flex-col text-14 text-textGray gap-1">
              <li>Paid memberships</li>
              <li>For students</li>
              <li>Business solutions </li>
            </ul>

            <p className="text-text-lightGray text-16 mt-3 mb-3">Community</p>

            <ul className="flex flex-col text-14 text-textGray gap-1">
              <li>Forums</li>
              <li>Chapters</li>
              <li>Events</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 p-4 md:grid-cols-3 gap-4">
          <div>
            <p className="text-text-lightGray text-16 mb-3">Subjects</p>

            <ul className="flex flex-col text-14 text-textGray gap-1">
              {subjects.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>

          <div>
            <p className="text-text-lightGray text-16 mb-3">Languages</p>

            <ul className="flex flex-col text-14 text-textGray gap-1">
              {languages.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>

          <div>
            <p className="text-text-lightGray text-16 mb-3">Career Building</p>

            <ul className="flex flex-col text-14 text-textGray gap-1">
              {careerbuiding.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      <hr className="border border-borderGray my-3" />

      <div className="flex justify-between items-center text-tableGray">
        <div className="flex justify-start items-center gap-2">
          <div className="py-1 px-2 border-r border-borderGray">
            <p>Privacy Policy</p>
          </div>

          <div className="py-1 px-2 border-r border-borderGray">
            <p>Cookie Policy</p>
          </div>

          <div>
            <p>Terms</p>
          </div>
        </div>

        <div className="text-tableGray">
          Made with ♥ by Tushar © {new Date().getFullYear()} Studynotion
        </div>
      </div>
    </div>
  );
}