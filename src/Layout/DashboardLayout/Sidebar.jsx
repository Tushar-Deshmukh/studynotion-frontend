import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import {
  studentMenuItems,
  instructorMenuItems,
  commonMenuItems,
} from "../../constants";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ openSidebar, closeSidebar, user }) {
  const navigate = useNavigate();
  const { userLogin } = useAuth();

  const handleLogout = () => {
    userLogin(false,null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <aside
        id="default-sidebar"
        className={`fixed top-[80px] left-0 z-40 w-64 h-screen transition-transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto bg-[#161D29] border-r border-[#2C333F]">
          <button onClick={closeSidebar} className="block lg:hidden mb-4">
            <IoMdClose />
          </button>

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
        </div>
      </aside>
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
