import React from "react";
import { Link } from "react-router-dom";

const CustomIcon = ({ Icon, customStyle, onClick, path }) => {
  return (
    <Link
      to={path ? path : "/#"}
      onClick={onClick}
      className={`text-xl md:text-2xl relative cursor-pointer opacity-70 hover:opacity-100 p-1 transition-opacity duration-500 ${customStyle}`}
    >
      <Icon />
    </Link>
  );
};

export default CustomIcon;
