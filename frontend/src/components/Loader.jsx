import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
