import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-white">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-black border-t-transparent"></div>
    </div>
  );
};

export default Loader;
