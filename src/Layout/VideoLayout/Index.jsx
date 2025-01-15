import React from "react";
import Header from "../HomeLayout/Header";
import Footer from "../HomeLayout/Footer";

export default function Index({ children }) {
  return (
    <div>
      <Header />

      <div className="pt-[78px]">{children}</div>

      <Footer />
    </div>
  );
}
