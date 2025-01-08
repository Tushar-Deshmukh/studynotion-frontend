import {
  Badge,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import searchicon from "../../assets/search.svg";
import carticon from "../../assets/cart.svg";
import { useNavigate } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { AuthContext, useAuth } from "../../context/AuthContext";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { IoIosArrowDown } from "react-icons/io";

export default function Header({ handleSidebarOpen }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { cartData } = useCart();
  const { profile } = useAuth();
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

  return (
    <div className="bg-coolgray border-b border-[#2C333F] w-full fixed top-0 z-40">
      <nav className="py-4 px-8 flex items-center justify-between">
        <div>
          <img src="images/Logo.png" alt="logo" />
        </div>
        <div className="flex items-center">
          <Button
            className="!text-lightWhite"
            sx={{
              fontSize: "16px",
            }}
          >
            Home
          </Button>

          <div className="relative">
            <Button
              className="!text-lightWhite"
              color="primary"
              endIcon={<IoIosArrowDown />}
              sx={{
                fontSize: "16px",
              }}
              onMouseEnter={() => setPopoverOpen(true)}
              onMouseLeave={() => setPopoverOpen(false)}
            >
              Catalog
            </Button>

            {/* Popover */}
            {isPopoverOpen && (
              <div
                id="popover-default"
                role="tooltip"
                className="absolute z-10 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                style={{
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={() => setPopoverOpen(false)}
              >
                <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Available Course Categories
                  </h3>
                </div>
                <div className="py-2">
                  <List>
                    {categories.length > 0 &&
                      categories.map((category, i) => {
                        return (
                          <ListItem
                            key={category?._id}
                            button
                            onClick={() => {
                              setPopoverOpen(false);
                              navigate(`/course-details?id=${category?._id}`);
                            }}
                          >
                            <ListItemText primary={category?.name} />
                          </ListItem>
                        );
                      })}
                  </List>
                </div>
              </div>
            )}
          </div>

          <Button
            className="!text-lightWhite"
            sx={{
              fontSize: "16px",
            }}
          >
            About Us
          </Button>

          <Button
            className="!text-lightWhite"
            sx={{
              fontSize: "16px",
            }}
          >
            Contact Us
          </Button>
        </div>

        <div className="flex items-center justify-start gap-[10px]">
          <IconButton>
            <img src={searchicon} />
          </IconButton>

          <IconButton onClick={handleCartIconClick}>
            <Badge
              badgeContent={cartData?.length > 0 ? cartData?.length : 0}
              color="primary"
            >
              <img src={carticon} />
            </Badge>
          </IconButton>

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
                }}
              >
                Sign In
              </Button>
            )}
          </div>

          <Button
            variant="outlined"
            onClick={() => navigate("/signup")}
            sx={{
              background: "transparent",
              border: "1px solid #DBDDEA",
              color: "#DBDDEA",
            }}
          >
            Sign Up
          </Button>

          <div className="block lg:hidden">
            <IconButton sx={{ color: "white" }} onClick={handleSidebarOpen}>
              <MdMenuOpen size={30} />
            </IconButton>
          </div>
        </div>
      </nav>
    </div>
  );
}
