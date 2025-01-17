import React, { useState } from "react";
import Header from "../HomeLayout/Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Index({ children }) {
  const { profile } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="h-full min-h-screen">
      <Header handleSidebarOpen={() => handleSidebarOpen()} />

      <Sidebar
        openSidebar={openSidebar}
        closeSidebar={handleSidebarOpen}
        user={profile}
      />

      <div className="pl-0 lg:pl-[256px] pt-[78px]">
        <div className="">{children}</div>
      </div>
    </div>
  );
}
