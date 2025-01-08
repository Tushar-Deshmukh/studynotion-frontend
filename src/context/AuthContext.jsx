import React, { createContext, useContext, useEffect, useState } from "react";
import ApiConfig from "../config/ApiConfig";
import axios from "../axios";

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
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  async function getMyProfile() {
    try {
      setLoading(true);
      const res = await axios.get(ApiConfig.myProfile);
      if (res?.data?.success) {
        setLoading(false);
        setProfile(res?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    if (isLogin) {
      getMyProfile();
    }
  }, [isLogin]);

  const data = {
    userLoggedIn: isLogin,
    userLogin: (value, token) => {
      setIsLogin(value);
      setSession(token);
    },
    profile,
    loading,
    getMyProfile
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth should be wrapper in a provider");
  }

  return context;
}
