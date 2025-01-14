import { AiOutlineLogout } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuNotebook } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";

export const studentMenuItems = [
  { icon: FiUser, label: "My Profile", path: "/my-profile" },
  { icon: LuNotebook, label: "Enrolled Courses", path: "/enrolled-courses" },
  { icon: CiBookmark, label: "Wishlist", path: "/my-cart" },
  {
    icon: FiShoppingCart,
    label: "Purchase History",
    path: "/purchase-history",
  },
  { icon: PiGraduationCap, label: "Courses", path: "/courses" },
];

export const instructorMenuItems = [
  { icon: MdOutlineDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FiUser, label: "My Profile", path: "/my-profile" },
  { icon: RiComputerLine, label: "My Courses", path: "/my-courses" },
];

export const commonMenuItems = [
  { icon: IoSettingsOutline, label: "Settings", path: "/settings" },
  // { icon: AiOutlineLogout, label: "Logout", path: "/" },
];