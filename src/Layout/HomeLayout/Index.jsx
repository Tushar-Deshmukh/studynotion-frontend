import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../DashboardLayout/Sidebar";

export default function Index({ children }) {
  const { profile } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="flex flex-col justify-between">
      <Header handleSidebarOpen={() => handleSidebarOpen()} />

      <Sidebar
        isHome={true}
        openSidebar={openSidebar}
        closeSidebar={handleSidebarOpen}
        user={profile}
      />

      <main className="pt-[49px] lg:pt-[54px]">{children}</main>

      <Footer />
    </div>
  );
}
