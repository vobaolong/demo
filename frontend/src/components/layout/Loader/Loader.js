import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 right-0 z-50 bg-primaryBlue flex justify-center items-center">
      <div className="w-24 h-24 rounded-full animate-spin border-b-4 border-primaryBlue" />
    </div>
  );
};

export default Loader;
