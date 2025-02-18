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

const community = ["Forums", "Chapters", "Events"];

const plans = ["Paid memberships", "For students", "Business solutions"];

const support = ["Help Center"];

const company = ["About", "Careers", "Affiliates"];

export default function Footer() {
  return (
    <footer className="p-6 bg-coolgray border-t border-footerBorder">
      <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 p-4 md:grid-cols-3 gap-4 md:border-r md:border-[#2C333F]">
          <div>
            <img src="/images/footerlogo.png" />

            <div className="mt-2">
              <FooterData title="Company" data={company} />
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
            <FooterData title="Resources" data={resources} />
            <div className="mt-2">
              <FooterData title="Support" data={support} />
            </div>
          </div>

          <div>
            <FooterData title="Plans" data={plans} />
            <div className="mt-2">
              <FooterData title="Community" data={community} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 p-4 md:grid-cols-3 gap-4">
          <FooterData title="Subjects" data={subjects} />
          <FooterData title="Languages" data={languages} />
          <FooterData title="Career Building" data={careerbuiding} />
        </div>
      </div>

      <hr className="border border-borderGray my-3" />

      <div className="flex justify-between items-center flex-wrap text-tableGray">

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
          Made with ❤️ by Tushar Deshmukh © {new Date().getFullYear()}
        </div>

      </div>
    </footer>
  );
}

const FooterData = ({ title, data }) => {
  return (
    <div>
      <p className="text-text-lightGray text-16 mb-3">{title}</p>

      <ul className="flex flex-col text-14 text-textGray gap-1">
        {data.map((item, i) => {
          return (
            <li
              key={i}
              className="text-14 text-textGray hover:text-white hover:cursor-pointer"
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
