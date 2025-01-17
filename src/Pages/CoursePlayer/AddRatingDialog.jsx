import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

export default function AddRatingDialog({ open, onClose, addRating }) {
  const { profile } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <Box>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Fade}
        sx={{
          "& .MuiDialog-paperWidthSm": {
            width: "100%",
            maxWidth: "500px",
          },
        }}
      >
        <DialogTitle className="flex justify-between items-center bg-[#2C333F] border-b border-[#DBDDEA]">
          Add Rating
          <IconButton sx={{ color: "gray" }} onClick={onClose}>
            <IoMdClose />
          </IconButton>
        </DialogTitle>

        <DialogContent className="flex flex-col justify-center items-center">
          <Box mt={2} className="flex items-center justify-start gap-4">
            <img
              src={profile?.profileImage}
              className="w-16 h-16 object-cover rounded-full"
            />
            <Box>
              <Typography variant="body1">{`${profile?.firstName} ${profile?.lastName}`}</Typography>
              <p className="text-14 font-thin">Posting Publicly</p>
            </Box>
          </Box>

          <Box mt={1} className="flex justify-center">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              sx={{
                "& .MuiRating-icon": {
                  color: "#faaf00",
                },
              }}
            />
          </Box>

          <Box mt={2} className="w-full flex flex-col gap-1">
            <label>
              Add Your Experience <span className="text-red-500">*</span>
            </label>
            <TextField
              variant="outlined"
              placeholder="Share Details of your own experience for this course"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              multiline
              rows={5}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#424854",
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              background: "#2C333F",
              color: "white",
              "&:hover": {
                background: "#2C333F",
              },
            }}
          >
            Cancle
          </Button>
          <Button variant="contained" onClick={() => addRating(rating, review)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
