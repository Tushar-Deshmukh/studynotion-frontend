import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  studentMenuItems,
  instructorMenuItems,
  commonMenuItems,
} from "../../constants";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { FaHome } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { IoIosContact } from "react-icons/io";

export default function Sidebar({
  openSidebar,
  closeSidebar,
  user,
  isDashboard,
  isHome,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin, userLoggedIn } = useAuth();
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    userLogin(false, null);
    localStorage.clear();
    navigate("/");
  };

  const currentRoute = location.pathname;

  async function getCourseCategories() {
    try {
      const res = await axios.get(ApiConfig.categories);
      if (res?.data?.success) {
        setCategories(res?.data?.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getCourseCategories();
  }, []);

  const handleCategoryClick = (id) => {
    if (!id) return;
    closeSidebar();
    navigate(`/course-details?id=${id}`);
  };

  return (
    <div>
      {(isDashboard || isHome) && (
        <aside
          id="default-sidebar"
          className={`fixed top-[49px] lg:top-[54px] left-0 z-40 w-64 h-screen transition-transform
            ${openSidebar ? "translate-x-0" : "-translate-x-full"}
            ${isHome ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
          aria-label="Sidebar"
        >
          <div className="h-full py-4 overflow-y-auto bg-[#161D29] border-r border-[#2C333F]">
            <div className="lg:hidden flex flex-col items-start text-16">
              <Link
                to="/"
                className={`${
                  currentRoute == "/" ? "text-yellow" : "text-lightWhite"
                } p-2 w-full`}
              >
                <span className="flex items-center gap-2">
                  <FaHome size={20} /> Home{" "}
                </span>
              </Link>

              <select
                className="w-full p-2 bg-transparent focus-within:outline-none"
                onChange={(e) => handleCategoryClick(e.target.value)}
              >
                <option className="text-black">Catalog</option>
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <option
                        key={category?._id}
                        value={category?._id}
                        className="text-black"
                      >
                        {category?.name}
                      </option>
                    );
                  })}
              </select>

              <Link
                to="/about"
                className={`${
                  currentRoute == "/about" ? "text-yellow" : "text-lightWhite"
                } p-2 w-full`}
              >
                <span className="flex items-center gap-2">
                  <IoMdInformationCircle size={20} /> About Us{" "}
                </span>
              </Link>

              <Link
                to="/contact"
                className={`${
                  currentRoute == "/contact" ? "text-yellow" : "text-lightWhite"
                } p-2 w-full`}
              >
                <span className="flex items-center gap-2">
                  <IoIosContact size={25} />
                  Contact Us
                </span>
              </Link>
            </div>

            {userLoggedIn && (
              <>
                <ul className="space-y-2 font-medium">
                  {(user?.role === "Student"
                    ? studentMenuItems
                    : instructorMenuItems
                  ).map((item, index) => (
                    <MenuItem key={index} {...item} />
                  ))}
                </ul>

                <hr className="border border-borderGray my-2" />

                <ul className="space-y-2 font-medium">
                  {commonMenuItems.map((item, index) => (
                    <MenuItem key={index} {...item} />
                  ))}

                  <li className="hover:bg-[#3D2A01]">
                    <button
                      type="button"
                      className="p-2 w-full flex items-center"
                      onClick={() => handleLogout()}
                    >
                      <AiOutlineLogout size={20} />
                      <span className="ms-3">Logout</span>
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

const MenuItem = ({ icon: Icon, label, path }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <li>
      <Link
        to={path}
        className={`flex items-center p-2 text-gray-900  dark:text-white hover:bg-[#3D2A01] group
        ${
          isActive ? "border-l-2 border-[#FFD60A] text-yellow bg-[#3D2A01]" : ""
        }`}
      >
        <Icon size={20} />
        <span className="ms-3">{label}</span>
      </Link>
    </li>
  );
};
