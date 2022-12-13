import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/transaction/CheckoutSteps";
import { dolaSymbol } from "../../constants/constants";
import SlideableBtn from "../../components/layout/Buttons/SlideableBtn";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { transactionInfo, cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const transactionCharges = subtotal * (1 / 10);

  const totalPrice = subtotal + transactionCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      transactionCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <div className="h-auto py-24 px-8 md:px-0">
        <MetaData title={`Thông tin khách hàng`} />

        <CheckoutSteps activeStep={1} />
        <div className="w-full md:w-[85%] mx-auto">
          <h2 className="text-2xl mb-5 pb-5 border-b-2 border-secondaryDark font-semibold w-fit mx-auto">
            Xác nhận đơn đặt phòng
          </h2>
          <div>
            <div className="grid grid-col-1 tall:grid-cols-6 divide-y-2 tall:divide-y-0 tall:divide-x-2 divide-secondaryDark">
              {/* Transaction Info */}
              <div className="flex flex-col col-span-6 tall:col-span-4 mx-5">
                <div>
                  <p className="text-xl font-bold">Thông tin đặt phòng</p>
                  <div className="p-5 md:px-10 mt-3 flex flex-col gap-2 rounded-lg bg-slate-300">
                    <div className="flex gap-3 ">
                      <p>Tên: </p>
                      <span className="text-slate-600">
                        {transactionInfo.fullname}
                      </span>
                    </div>
                    <div className="flex gap-3 ">
                      <p>SĐT: </p>
                      <span className="text-slate-600">
                        {transactionInfo.phoneNo}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <p className="text-xl font-bold">Phòng: </p>
                  <div>
                    {cartItems?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="border hover:border-slate-400 flex px-5 py-1 md:px-10 gap-x-7 mt-3 items-center rounded-lg"
                        >
                          <img
                            className="w-[10vmax] md:w-[5vmax] rounded-lg"
                            src={item.image}
                            alt="Room"
                          />
                          <Link
                            className="capitalize w-[30vmax] hover:text-cyan-600"
                            to={`/room/${item.room}`}
                          >
                            {item.name}
                          </Link>
                          <b>
                            {dolaSymbol}
                            {item.totalPrice} (
                            <span className="text-sm">{item.days} đêm</span>)
                          </b>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="tall:pl-8 py-5 mt-3 md:mt-0 col-span-6 tall:col-span-2">
                <div>
                  <p className="text-xl font-bold text-center py-3 border-b-2">
                    Tóm tắt đơn đặt phòng
                  </p>
                  <div className="flex flex-col gap-5 my-3">
                    <div className="flex justify-between">
                      <p>Tổng: </p>
                      <span className="text-slate-500">{`${dolaSymbol}${subtotal}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <p>VAT: </p>
                      <span className="text-slate-500">{`${dolaSymbol}${transactionCharges}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between py-5 border-t-2">
                    <p>
                      <b>Tổng giá: </b>
                    </p>
                    <span className="font-bold">
                      {dolaSymbol}
                      {totalPrice}
                    </span>
                  </div>

                  <SlideableBtn onClick={proceedToPayment} label="Xác nhận" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
