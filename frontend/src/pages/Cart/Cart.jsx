import React, { Fragment } from "react";
import CartItemCard from "../../components/Cart/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromCart, resetCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import { IoHeartDislikeSharp } from "react-icons/io5";
import MetaData from "../../components/layout/MetaData";
import { useAlert } from "react-alert";
import FormatPrice from "../../components/format";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const deleteItemsFromCart = (id) => {
    dispatch(removeItemsFromCart(id));
    alert.success("Xoá phòng khỏi danh sách thành công");
  };

  const clearCartHandle = async () => {
    await dispatch(resetCart());
    alert.success("Xoá tất cả phòng thành công");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=transaction");
  };

  const dateFormat = (value) => {
    let date = new Date(value);
    return date.toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Fragment>
      <MetaData title={`Danh sách | G1Hotel`} />
      {cartItems.length === 0 ? (
        <div className="isEmptyCart h-screen flex flex-col gap-3 justify-center items-center ">
          <IoHeartDislikeSharp />
          <p className="text-slate-500 text-xl">
            Không có phòng trong danh sách
          </p>
          <Link
            className="bg-primaryBlue text-white px-10 py-2 rounded-md hover:scale-105 transition-all duration-500"
            to="/rooms"
          >
            Đặt phòng ngay!
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage h-auto py-24">
            <div className="cartHeader overflow-x-auto md:overflow-x-hidden bg-primaryBlue w-[90%] mx-auto box-border text-white grid grid-cols-3 md:grid-cols-6 rounded-t-xl">
              <p className="m-5 md:col-span-2">Tên phòng</p>
              <p className="m-5">Số đêm</p>
              <p className="m-5">Ngày nhận phòng</p>
              <p className="m-5">Ngày trả phòng</p>
              <p className="m-5 text-right">Tổng tiền</p>
            </div>

            <div className="cartContainer w-[90%] bg-slate-100 mx-auto flex flex-col gap-5 divide-y">
              {cartItems?.map((item, index) => {
                return (
                  <div key={index} className="grid grid-cols-3 md:grid-cols-6 ">
                    <div className="md:col-span-2 place-items-start px-5">
                      <CartItemCard
                        item={item}
                        deleteCartItems={deleteItemsFromCart}
                      />
                    </div>
                    <div className="flex px-10 items-center justify-center md:justify-start">
                      {item.days}
                    </div>
                    <div className="flex text-center items-center justify-center md:justify-start">
                      {dateFormat(item.startDate)}
                    </div>
                    <div className="flex  text-center items-center justify-center md:justify-start">
                      {dateFormat(item.endDate)}
                    </div>
                    <div className="flex justify-end items-center px-5">
                      <p className="font-medium">{`${FormatPrice(
                        item.totalPrice
                      )}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-[90%] flex mx-auto md:flex-row sm:flex-col gap-5 divide-y">
              <div className="px-5 md:w-1/2 lg:w-1/5">
                <input
                  type="submit"
                  onClick={clearCartHandle}
                  className="bg-red-600 w-full hover:shadow-lg py-2 rounded-md text-white mt-5 transition-all duration-500 hover:scale-105 cursor-pointer"
                  value="Xoá toàn bộ phòng"
                />
              </div>
              <div className="grid place-items-end w-[90%] mx-auto flex ">
                <div className="flex justify-between px-5 py-5 border-t-4 border-primaryDarkBlue w-full md:w-1/2 lg:w-1/3 ">
                  <p className="font-bold text-[1.2em] ">Thành tiền</p>
                  <p className="font-bold text-[1em]">{`
                  ${FormatPrice(
                    cartItems.reduce((acc, item) => acc + item.totalPrice, 0)
                  )}

                `}</p>
                </div>
                <div className="px-5 w-full md:w-1/2 lg:w-1/5">
                  <button
                    onClick={checkoutHandler}
                    className="bg-primaryBlue w-full hover:shadow-lg py-2 rounded-md text-white mt-10 transition-all duration-500 hover:scale-105"
                  >
                    Đặt phòng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
