import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function Publish() {
  return (
    <div>
      <div className="p-4 bg-[#161D29] border border-[#2C333F] rounded-lg">
        <Typography variant="h5">Publish Settings</Typography>

        <FormControlLabel
          className="mt-4"
          control={<Checkbox />}
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
          >
            Save as a Draft
          </Button>

          <Button variant="contained">Save and Publish</Button>
        </div>
      </div>
    </div>
  );
}
