import {
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
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";
import ApiConfig from "../../config/ApiConfig";
import { toast } from "react-hot-toast";

export default function Header({ handleSidebarOpen }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // State to manage the Popover anchor element
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle opening the Popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the Popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Boolean to determine if the Popover is open
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  return (
    <div className="bg-coolgray border-b border-[#2C333F] w-full fixed top-0 z-40">
      <nav className="py-4 px-8 flex items-center justify-between">
        <div>
          <img src="images/Logo.png" alt="logo" />
        </div>
        <div>
          <Button className="!text-text-lightGray">Home</Button>

          <Button
            className="!text-text-lightGray"
            aria-describedby={id}
            color="primary"
            onClick={handleClick}
          >
            Catalog
          </Button>

          <Button className="!text-text-lightGray">About Us</Button>

          <Button className="!text-text-lightGray">Contact Us</Button>
        </div>

        <div className="flex items-center justify-start gap-[10px]">
          <IconButton>
            <img src={searchicon} />
          </IconButton>

          <IconButton>
            <img src={carticon} />
          </IconButton>

          <div>
            {auth?.userLoggedIn ? (
              <img
                className="w-[30px] h-[30px] rounded-full"
                src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
              />
            ) : (
              <Button variant="outlined" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            )}
          </div>

          <div className="block lg:hidden">
            <IconButton sx={{ color: "white" }} onClick={handleSidebarOpen}>
              <MdMenuOpen size={30} />
            </IconButton>
          </div>
        </div>
      </nav>

      {/* Popover Component */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List>
          {categories.length > 0 &&
            categories.map((category, i) => {
              return (
                <ListItem
                  key={category?._id}
                  button
                  onClick={() => {
                    handleClose();
                    navigate(`/course-details?id=${category?._id}`);
                  }}
                >
                  <ListItemText primary={category?.name} />
                </ListItem>
              );
            })}
        </List>
      </Popover>
    </div>
  );
}
