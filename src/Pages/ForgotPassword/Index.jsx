import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import OtpInput from "react-otp-input";
import { MdKeyboardBackspace } from "react-icons/md";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const VerifyOtpContainer = styled("div")({
  "& label": {
    fontFamily: "Inter",
  },
});

export default function Index() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function forgotPassword() {
    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.forgotPassword,
        data: {
          email: email,
        },
      });

      if (res?.data?.success) {
        setLoading(false);
        toast.success(res?.data?.message);
        // navigate("/login");
      }
    } catch (error) {
      if (error?.response) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  }

  return (
    <VerifyOtpContainer>
      <Container
        maxWidth="md"
        className="!flex justify-center items-center w-full"
      >
        <div className="w-full max-w-[400px] mt-12">
          <Typography variant="h4" fontWeight={600}>
            Reset your password
          </Typography>

          <div className="mt-4">
            <Typography variant="body1" color="text.secondary">
              Have no fear. We’ll email you instructions to reset your password.
              If you dont have access to your email we can try account recovery
            </Typography>
          </div>

          <div className="mt-4">
            <label>
              Email Address <span className="text-red-500">*</span>
            </label>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Button
              variant="contained"
              className="w-full"
              onClick={() => forgotPassword()}
            >
              Reset Password {loading && <Spinner />}
            </Button>
          </div>

          <div className="flex items-center justify-start mt-4">
            <div className="flex items-center gap-2">
              <MdKeyboardBackspace size={25} />
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </Container>
    </VerifyOtpContainer>
  );
}
