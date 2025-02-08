import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Index({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="flex flex-col justify-between">
      <Header />

      <main className="pt-[54px]">{children}</main>

      <div>
        <Footer />
      </div>
    </div>
  );
}
