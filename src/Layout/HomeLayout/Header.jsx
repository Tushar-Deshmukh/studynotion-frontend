import {
  Badge,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import searchicon from "../../assets/search.svg";
import carticon from "../../assets/cart.svg";
import { Link, useNavigate } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { AuthContext, useAuth } from "../../context/AuthContext";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import CategoryPopover from "./CategoryPopover";
import { MdMenu } from "react-icons/md";

export default function Header({ handleSidebarOpen }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { cartData } = useCart();
  const { profile, userLoggedIn } = useAuth();
  const location = useLocation();
  const defaultProfileImage =
    "https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=";

  const [categories, setCategories] = useState([]);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  async function getCourseCategories() {
    try {
      const res = await axios.get(ApiConfig.categories);
      if (res?.data?.success) {
        setCategories(res?.data?.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getCourseCategories();
  }, []);

  const handleCartIconClick = () => {
    if (!auth?.userLoggedIn) {
      toast.error("Please login to see your cart!");
      return;
    }
    navigate("/my-cart");
  };

  const routesToHideSeachAndCartIcon = [
    "/",
    "/login",
    "/signup",
    "/verify-otp",
    "/forgot-password",
    "/about",
    "/contact",
  ];

  const hideCartAndSearchIcon = routesToHideSeachAndCartIcon.includes(
    location.pathname
  );

  const currentRoute = location.pathname;

  const handleAuthBtnClick = () => {
    if (profile?.role === "Student") {
      navigate("/my-profile");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-hotgray border-b border-[#2C333F] w-full fixed top-0 z-40">
      <nav className="py-2 px-4 md:px-8 flex items-center justify-between">

        <Link to="/" className="flex-shrink-0">
          <img src="images/Logo.png" alt="logo" />
        </Link>

        <div className="hidden lg:flex items-center gap-4 text-16">
          <Link
            to="/"
            className={`${
              currentRoute == "/" ? "text-yellow" : "text-lightWhite"
            }`}
          >
            Home
          </Link>

          <div className="relative">
            <Link
              className={`${
                currentRoute == "/catalog" ? "text-yellow" : "text-lightWhite"
              } text-16 flex items-center gap-2`}
              color="primary"
              onMouseEnter={() => setPopoverOpen(true)}
              onMouseLeave={() => setPopoverOpen(false)}
            >
              Catalog{" "}
              <span>
                {" "}
                <IoIosArrowDown />{" "}
              </span>
            </Link>

            {/* Popover */}
            {isPopoverOpen && (
              <CategoryPopover
                categories={categories}
                setPopoverOpen={setPopoverOpen}
              />
            )}
          </div>

          <Link
            to="/about"
            className={`${
              currentRoute == "/about" ? "text-yellow" : "text-lightWhite"
            }`}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className={`${
              currentRoute == "/contact" ? "text-yellow" : "text-lightWhite"
            }`}
          >
            Contact Us
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-start gap-[10px]">
          {!hideCartAndSearchIcon && (
            <>
              {userLoggedIn && (
                <IconButton onClick={handleCartIconClick}>
                  <Badge
                    badgeContent={cartData?.length > 0 ? cartData?.length : 0}
                    color="primary"
                  >
                    <img src={carticon} />
                  </Badge>
                </IconButton>
              )}
            </>
          )}

          <div>
            {auth?.userLoggedIn ? (
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={profile?.profileImage || defaultProfileImage}
              />
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{
                  background: "transparent",
                  border: "1px solid #DBDDEA",
                  color: "#DBDDEA",
                  padding: "5px 20px",
                }}
              >
                Sign In
              </Button>
            )}
          </div>

          <div>
            {auth?.userLoggedIn ? (
              <Button
                variant="outlined"
                onClick={handleAuthBtnClick}
                sx={{
                  background: "transparent",
                  border: "1px solid #DBDDEA",
                  color: "#DBDDEA",
                  padding: "5px 20px",
                }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate("/signup")}
                sx={{
                  background: "transparent",
                  border: "1px solid #DBDDEA",
                  color: "#DBDDEA",
                  padding: "5px 20px",
                }}
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>

        <div className="block lg:hidden">
          <IconButton sx={{ color: "white",padding:0 }} onClick={handleSidebarOpen}>
            <MdMenu size={27} />
          </IconButton>
        </div>
      </nav>
    </div>
  );
}
