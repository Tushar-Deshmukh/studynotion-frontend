import React, { useState } from "react";
import Header from "../HomeLayout/Header";
import Sidebar from "./Sidebar";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";

const DashboardLayoutContainer = styled("div")({});

export default function Index({ children }) {
  const { profile } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <DashboardLayoutContainer className="h-full min-h-screen">
      <Header handleSidebarOpen={() => handleSidebarOpen()} />

      <Sidebar
        openSidebar={openSidebar}
        closeSidebar={handleSidebarOpen}
        user={profile}
      />

      <div className="pl-0 lg:pl-[256px] pt-[78px] content-container">
        <div className="">{children}</div>
      </div>
    </DashboardLayoutContainer>
  );
}
