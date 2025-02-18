import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import AppRouter from "./AppRouter";
import { Toaster } from "react-hot-toast";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init({
  startEvent: "DOMContentLoaded",
  initClassName: "aos-init",
  animatedClassName: "aos-animate",
  useClassNames: false,
  offset: 200,
  delay: 0,
  duration: 1000,
  easing: "ease",
  once: false,
  anchorPlacement: "top-bottom",
});

const App = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <Toaster />
      <AppRouter />
    </div>
  );
};

export default App;
