import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const setSession = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

const checkLogin = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(checkLogin());

  const data = {
    userLoggedIn: isLogin,
    userLogin: (value, token) => {
      setIsLogin(value);
      setSession(token);
    },
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
