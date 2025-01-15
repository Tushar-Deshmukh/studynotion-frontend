import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Index({ children }) {
  return (
    <div className="flex flex-col justify-between">
      <Header />

      <div className="pt-[77px]">{children}</div>
      
      <div>
        <Footer />
      </div>
    </div>
  );
}
