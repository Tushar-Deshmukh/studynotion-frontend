import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import AppRouter from "./AppRouter";
import {Toaster} from 'react-hot-toast'


const App = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <Toaster/>
      <AppRouter/>
    </div>
  );
};

export default App;
