import React from "react";
import { CircularProgress } from "@mui/material";

export default function ButtonLoader() {
  return (
    <div>
      <CircularProgress size={22} color="secondary" className="ml-2 mt-2"/>
    </div>
  );
}
