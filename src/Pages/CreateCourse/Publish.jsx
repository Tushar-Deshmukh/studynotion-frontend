import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "../../axios";
import { toast } from "react-hot-toast";
import ApiConfig from "../../config/ApiConfig";
import { useNavigate } from "react-router-dom";

export default function Publish({courseId}) {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(false);

  async function updateCourse(coursetype) {
    try {
      const res = await axios({
        method: "PUT",
        url: `${ApiConfig.updateCourse}/${courseId}`,
        data: {
          coursetype: coursetype,
        },
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/my-courses");
        localStorage.removeItem("courseId");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  return (
    <div>
      <div className="p-4 bg-[#161D29] border border-[#2C333F] rounded-lg">
        <Typography variant="h5">Publish Settings</Typography>

        <FormControlLabel
          className="mt-4"
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          }
          label={
            <Typography variant="body1" color="text.secondary">
              Make this course public
            </Typography>
          }
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Button
          variant="contained"
          startIcon={<IoIosArrowBack />}
          sx={{
            background: "#161D29",
            color: "white",
            "&:hover": {
              background: "#161D29",
            },
          }}
        >
          Back
        </Button>

        <div className="flex justify-start items-center gap-3">
          <Button
            variant="contained"
            sx={{
              background: "#161D29",
              color: "white",
              "&:hover": {
                background: "#161D29",
              },
            }}
            onClick={() => updateCourse("Draft")}
          >
            Save as a Draft
          </Button>

          <Button
            variant="contained"
            onClick={() => updateCourse(isPublic ? "Public" : "Draft")}
          >
            Save and Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
