import { lazy } from "react";
import HomeLayout from "./Layout/HomeLayout/Index";
import LoginLayout from "./Layout/LoginLayout/Index";
import DashboardLayout from "./Layout/DashboardLayout/Index";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/Home/Index")),
  },

  {
    exact: true,
    path: "/login",
    layout: LoginLayout,
    component: lazy(() => import("./Pages/Login/Index")),
  },

  {
    exact: true,
    path: "/signup",
    layout: LoginLayout,
    component: lazy(() => import("./Pages/Signup/Index")),
  },

  {
    exact: true,
    path: "/verify-otp",
    layout: LoginLayout,
    component: lazy(() => import("./Pages/verifyOtp/Index")),
  },

  {
    exact: true,
    path: "/forgot-password",
    layout: LoginLayout,
    component: lazy(() => import("./Pages/ForgotPassword/Index")),
  },

  {
    exact: true,
    path: "/dashboard",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/Dashboard/Index")),
  },

  {
    exact: true,
    path: "/my-courses",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/MyCourses/Index")),
  },

  {
    exact: true,
    path: "/create-course",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/CreateCourse/Index")),
  },
];