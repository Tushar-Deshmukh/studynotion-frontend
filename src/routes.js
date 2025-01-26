import { lazy } from "react";
import HomeLayout from "./Layout/HomeLayout/Index";
import LoginLayout from "./Layout/LoginLayout/Index";
import DashboardLayout from "./Layout/DashboardLayout/Index";
import VideoLayout from "./Layout/VideoLayout/Index";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/Home/Index")),
  },

  {
    exact: true,
    path: "/success",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/PaymentSuccess/Index")),
  },

  {
    exact: true,
    path: "/cancel",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/PaymentCancel/Index")),
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
    path: "/contact",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/Contact/Index")),
  },

  {
    exact: true,
    path: "/about",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/About/Index")),
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
    path: "/courses",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/MyEnrolledCourses/Index")),
  },

  {
    exact: true,
    path: "/create-course",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/CreateCourse/Index")),
  },

  {
    exact: true,
    path: "/enrolled-courses",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/EnrolledCourses/Index")),
  },

  {
    exact: true,
    path: "/my-cart",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/Cart/Index")),
  },

  {
    exact: true,
    path: "/checkout-course",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/CourseCheckout/Index")),
  },

  {
    exact: true,
    path: "/course-details",
    layout: HomeLayout,
    component: lazy(() => import("./Pages/CourseDetails/Index")),
  },

  {
    exact: true,
    path: "/course-player",
    layout: VideoLayout,
    component: lazy(() => import("./Pages/CoursePlayer/Index")),
  },

  {
    exact: true,
    path: "/my-profile",
    layout: DashboardLayout,
    component: lazy(() => import("./Pages/Profile/Index")),
  },
];
