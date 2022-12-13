import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../../components/layout/Loader/Loader";
import { useAlert } from "react-alert";
import { dolaSymbol } from "../../constants/constants";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const params = useParams();
  console.log(order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [alert, dispatch, error, params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Chi tiết đơn đặt phòng`} />

          <div className="h-auto py-24">
            <div className="w-[90%] mx-auto">
              <div>
                <p className="heading">Thông tin đặt phòng</p>
              </div>
              <div className="headingData">
                <div className="flex gap-3 ">
                  <p>Họ và tên khách hàng: </p>
                  <span className="text-slate-600">
                    {order.user && order.transactionInfo.fullname}
                  </span>
                </div>
                <div className="flex gap-3 ">
                  <p>Số điện thoại: </p>
                  <span className="text-slate-600">
                    {order.user && order.transactionInfo.phoneNo}
                  </span>
                </div>
                <div className="flex gap-3 ">
                  <p>Địa chỉ Email: </p>
                  <span className="text-slate-600">{user.email}</span>
                </div>
                <div className="flex gap-3 ">
                  <p>Mã đặt phòng: </p>
                  <span className="text-slate-600">{order._id}</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="heading">Chi tiết thanh toán</p>
                <div className="headingData">
                  <div className="flex gap-3">
                    <p>Thanh toán: </p>
                    <p
                      className={`${
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "text-green-500"
                          : "text-red-500"
                      }  `}
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <p>Số tiền: </p>
                    <b className="text-slate-600">
                      {dolaSymbol}
                      {order.totalPrice && order.totalPrice}
                    </b>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="heading">Trạng thái đơn đặt phòng</p>
                <div className="headingData">
                  <div className="flex gap-3">
                    <p className="flex gap-3">
                      Đơn đặt phòng:{" "}
                      <p
                        className={`${
                          order.orderStatus && order.orderStatus === "Confirm"
                            ? "text-green-500"
                            : "text-red-500"
                        }  `}
                      >
                        {order.orderStatus && order.orderStatus === "Confirm"
                          ? "Đã xác nhận"
                          : "Đang xử lý"}
                      </p>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="heading">Chi tiết đơn đặt phòng: </p>
                <div className="headingData">
                  {order.orderItems &&
                    order.orderItems.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-x-7 mt-3 items-center"
                        >
                          <img
                            className="w-[10vmax] md:w-[5vmax]"
                            src={item.image}
                            alt="Room"
                          />
                          <Link
                            className="capitalize"
                            to={`/room/${item.room}`}
                          >
                            <span className="text-md font-light">Phòng: </span>
                            <b>{item.name}</b>
                          </Link>
                          <b>
                            <span className="text-md font-light">
                              Tổng tiền:{" "}
                            </span>
                            {dolaSymbol}
                            {order.totalPrice}{" "}
                            <span className="text-sm font-light">
                              ( {item.days} đêm)
                            </span>
                          </b>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
