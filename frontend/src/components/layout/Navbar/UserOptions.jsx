import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  FavoriteBorder,
} from "@material-ui/icons";
import store from "./../../../store";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { Backdrop } from "@material-ui/core";
import { useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const dashboard = () => {
    navigate("/admin/dashboard");
  };

  const account = () => {
    navigate("/account");
  };

  const cart = () => {
    navigate("/cart");
  };

  const orders = () => {
    navigate("/orders/me");
  };

  const logoutUser = () => {
    store.dispatch(logout());
    alert.success("Đăng xuất thành công");
    navigate("/");
  };

  const options = [
    {
      icon: <Person />,
      name: "Thông tin cá nhân",
      func: account,
    },

    {
      icon: (
        <FavoriteBorder
          style={{ color: cartItems.length > 0 ? "#14cddb" : "red" }}
          value={cartItems.length}
        />
      ),
      name: `Danh sách phòng yêu thích (${cartItems.length})`,
      func: cart,
    },

    {
      icon: <ListAlt />,
      name: "Đơn đặt phòng",
      func: orders,
    },

    {
      icon: <ExitToApp />,
      name: "Đăng xuất",
      func: logoutUser,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Bảng điều khiển",
      func: dashboard,
    });
    options.splice(1, 3);
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      {`${user?.role}` === "admin" ? (
        <SpeedDial
          className="h-0 -mt-4"
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction="down"
          icon={
            <img
              className="w-full object-cover rounded-full"
              src={user.avatar.url ? user.avatar.url : "/profile.png"}
              alt="Profile"
            />
          }
        >
          {options.map((option, id) => {
            return (
              <SpeedDialAction
                key={id}
                icon={option.icon}
                tooltipTitle={option.name}
                onClick={option.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            );
          })}
        </SpeedDial>
      ) : (
        <SpeedDial
          className="h-0"
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction="down"
          icon={
            <img
              className="w-full object-cover rounded-full"
              src={user.avatar.url ? user.avatar.url : "/profile.png"}
              alt="Profile"
            />
          }
        >
          {options.map((option, id) => {
            return (
              <SpeedDialAction
                key={id}
                icon={option.icon}
                tooltipTitle={option.name}
                onClick={option.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            );
          })}
        </SpeedDial>
      )}
    </>
  );
};

export default UserOptions;
