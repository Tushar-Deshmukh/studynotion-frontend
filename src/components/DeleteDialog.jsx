import React, { useState } from "react";
import {
  Dialog,
  Typography,
  IconButton,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Spinner from "./Spinner";

export default function DeleteDialog({
  open,
  onClose,
  loading = false,
  course,
  deleteCourse,
}) {
  function handleDelete() {
    if (course) {
      deleteCourse();
    }
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-4 bg-[#2C333F] border-t border-b border-[#424854]">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="text.primary">
            {course && "Delete Course"}
          </Typography>
          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <IoMdClose />
          </IconButton>
        </div>
      </div>

      <div className="p-4 bg-[#2C333F]">
        <div>
          <Typography variant="h6" color="text.primary">
            {course && "Are you sure, you want to delete this course?"}
          </Typography>
        </div>

        <div className="flex justify-end items-center gap-4 mt-4">
          <Button
            sx={{
              backgroundColor: "#161D29",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete {loading && <Spinner />}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
