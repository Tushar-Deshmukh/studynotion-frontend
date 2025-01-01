import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";

export default function Index() {
  const { profile } = useAuth();
  const [type, setType] = useState("view");

  const handleTypeChange = (typeName) => {
    setType(typeName);
  };

  return (
    <div className="p-4">
      {type === "view" ? (
        <ViewProfile profile={profile || {}} handleTypeChange={handleTypeChange} />
      ) : (
        <EditProfile profile={profile || {}} handleTypeChange={handleTypeChange} />
      )}
    </div>
  );
}
