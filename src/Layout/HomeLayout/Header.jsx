import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import searchicon from "../../assets/search.svg";
import carticon from "../../assets/cart.svg";
import { useNavigate } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ handleSidebarOpen }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-coolgray border-b border-[#2C333F] w-full fixed top-0 z-40">
      <nav className="py-4 px-8 flex items-center justify-between">
        <div>
          <img src="images/Logo.png" alt="logo" />
        </div>
        <div>
          <Button className="!text-text-lightGray">Home</Button>

          <Button className="!text-text-lightGray">Catalog</Button>

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
    </div>
  );
}
