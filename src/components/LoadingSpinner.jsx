import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-75"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
