import React, { useState } from "react";
import Header from "../HomeLayout/Header";
import Sidebar from "./Sidebar";
import { styled } from "@mui/material/styles";

const DashboardLayoutContainer = styled("div")({});

export default function Index({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <DashboardLayoutContainer className="h-full min-h-screen">
      <Header handleSidebarOpen={() => handleSidebarOpen()} />

      <Sidebar openSidebar={openSidebar} closeSidebar={handleSidebarOpen} />

      <div className="pl-0 lg:pl-[256px] pt-[78px] content-container">
        <div className="">{children}</div>
      </div>
    </DashboardLayoutContainer>
  );
}
