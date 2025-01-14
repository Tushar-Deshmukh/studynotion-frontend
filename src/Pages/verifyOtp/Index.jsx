import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PinInput from "react-pin-input";
import { MdKeyboardBackspace } from "react-icons/md";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner";

const VerifyOtpContainer = styled("div")({
  "& input": {
    margin:'0',
    textAlign: "center",
  },

  "& .pincode-input-container":{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
  }
});

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyOtp() {
    if (otp.length === 0 || otp.length < 6) {
      toast.error("Please enter a 6-digit number");
      return;
    }

    try {
      setLoading(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.verifyOtp,
        data: {
          email: email,
          otp: Number(otp),
        },
      });

      if (res?.data?.success) {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate("/login");
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
            Verify email
          </Typography>

          <div className="mt-4">
            <Typography variant="body1" color="text.secondary">
              A verification code has been sent to you. Enter the code below.
            </Typography>
          </div>

          <div className="mt-4">
            <PinInput
              length={6}
              initialValue=""
              onChange={(value) => setOtp(value)}
              type="numeric"
              inputStyle={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "3.5rem",
                height: "3.5rem",
                marginRight: "10px",
                textAlign: "center",
                fontSize: "1.5rem",
                margin:'0'
              }}
              focus
            />
          </div>

          <div className="mt-4">
            <Button
              variant="contained"
              className="w-full"
              onClick={verifyOtp}
              disabled={loading}
            >
              Verify and Register {loading && <Spinner />}
            </Button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <MdKeyboardBackspace size={25} />
              <Link to="/login">Back to Login</Link>
            </div>

            <div>
              <Button startIcon={<PiClockCounterClockwiseFill />}>
                Resend It
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </VerifyOtpContainer>
  );
}
