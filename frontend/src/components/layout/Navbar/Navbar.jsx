import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import CustomIcon from "../../Icons/CustomIcon";
import { Link, NavLink } from "react-router-dom";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";
import logo from "../../../assets/logo.png";
const isActiveStyle = "font-semibold opacity-100 transition-all duration-500";
const isNotActiveStyle = "font-semibold opacity-50 transition-all duration-500";

const Navbar = ({ menuOptions }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const handlecloseToggle = () => {
    setToggleSidebar(true);
  };

  return (
    <>
      <div className="w-[100%] absolute top-0 right-0 sticky z-50 bg-primaryBlue py-4 md:py-5 px-8 lg:px-24 rounded-bl-3xl rounded-br-3xl text-primaryBlue border-b-2 border-b-borderGlowBlue shadow-lg shadow-cyan-500/50">
        <div className="flex justify-between items-center">
          <Link className="w-[10%] -m-5 p-0" to="/">
            <img className="w-[70%]" src={logo} alt="logo" />
          </Link>
          <div className="hidden md:block">
            {`${user?.role}` === "admin" ? null : (
              <div className="flex gap-10">
                {menuOptions?.map((menu, index) => {
                  return (
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? isActiveStyle : isNotActiveStyle
                      }
                      to={menu.path}
                      key={index}
                    >
                      {menu.menuName}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex items-start gap-4 md:gap-6">
            {`${user?.role}` === "admin" ? null : (
              <>
                <CustomIcon path="/search" Icon={AiOutlineSearch} />
                <CustomIcon path="/cart" Icon={AiOutlineShoppingCart} />
                {cartItems.length === 0 ? null : (
                  <>
                    <p className="w-5 text-xs text-white -ml-7 rounded-full border-2 border-sky-500 pl-1.5">
                      {cartItems.length}
                    </p>
                  </>
                )}
              </>
            )}
            {isAuthenticated ? (
              <UserOptions user={user} />
            ) : (
              <CustomIcon path="/login" Icon={AiOutlineUser} />
            )}
            <CustomIcon
              path="/#"
              Icon={AiOutlineMenu}
              onClick={handlecloseToggle}
              customStyle="block md:hidden"
            />
          </div>
        </div>
      </div>
      {toggleSidebar ? (
        <Slider
          menuOptions={menuOptions}
          setCloseToggle={setToggleSidebar}
          closeToggle={toggleSidebar}
        />
      ) : (
        <Slider
          menuOptions={menuOptions}
          setCloseToggle={setToggleSidebar}
          closeToggle={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
