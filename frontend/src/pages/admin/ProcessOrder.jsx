import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Link, useParams } from "react-router-dom";
import SideBar from "../../components/admin/Sidebar";
import { useAlert } from "react-alert";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../../components/layout/Loader/Loader";
import Button from "../../components/user/Button";
import { AccountTree } from "@material-ui/icons";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import FormatPrice from "../../components/format";

const ProcessOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  console.log(order);
  const {
    error: updateError,
    isUpdated,
    loading: loadingOrder,
  } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  const updateProcessOrder = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật trạng thái đơn đặt phòng thành công");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [alert, dispatch, error, isUpdated, updateError, params.id]);

  return (
    <Fragment>
      <MetaData title={`Đơn đặt phòng - Admin`} />

      {/* dashboard */}
      <div className="dashboardStyle">
        <div className="sidebarStyle">
          <SideBar />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="dashboardRightBoxStyle">
            <div className="mb-5">
              <p className="upper text-center text-2xl font-bold text-gray-400">
                Đơn đặt phòng
              </p>
            </div>
            <div className="px-10">
              <div className="grid grid-col-1 tall:grid-cols-6 divide-y-2 tall:divide-y-0 tall:divide-x-2 divide-secondaryDark">
                <div className="flex flex-col col-span-6 tall:col-span-4">
                  <div>
                    <p className="text-xl font-bold">Thông tin người đặt</p>
                    <div className="headingData">
                      <div className="flex gap-3 ">
                        <p>Họ và tên: </p>
                        <span className="text-slate-600">
                          {order.transactionInfo &&
                            order.transactionInfo.fullname}
                        </span>
                      </div>
                      <div className="flex gap-3 ">
                        <p>SĐT: </p>
                        <span className="text-slate-600">
                          {order.transactionInfo &&
                            order.transactionInfo.phoneNo}
                        </span>
                      </div>
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
                            ? "Thanh toán"
                            : "Chưa thanh toán"}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <p>Số tiền: </p>
                        <span className="text-slate-600">
                          {order.totalPrice && FormatPrice(order.totalPrice)}
                        </span>
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
                              order.orderStatus &&
                              order.orderStatus === "Confirm"
                                ? "text-green-500"
                                : "text-red-500"
                            }  `}
                          >
                            {order.orderStatus &&
                            order.orderStatus === "Confirm"
                              ? "Đã xác nhận"
                              : "Đang xử lí"}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="my-5">
                    <p className="text-xl font-bold">
                      Chi tiết đơn đặt phòng:{" "}
                    </p>
                    <div>
                      {order.orderItems?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex gap-5 mt-3 items-center border border-teal-500 rounded-md p-2 mr-2 justify-between"
                          >
                            <img
                              className="w-[20vmax] md:w-[10vmax] rounded-sm"
                              src={item.image}
                              alt="Room"
                            />
                            <span className="text-md ">
                              Tên phòng:{" "}
                              <Link
                                className="capitalize w-[10vmax] font-bold"
                                to={`/room/${item.room}`}
                              >
                                {item.name}
                              </Link>
                            </span>

                            <span className="text-md font-light text-center">
                              Tổng tiền:{" "}
                              <p className="text-sm font-bold">
                                {FormatPrice(order.totalPrice)}{" "}
                                <b className="text-sm font-light right-2">
                                  ({item.days} đêm)
                                </b>
                              </p>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {order.orderStatus !== "Confirm" && (
                  <div className="tall:pl-8 py-5  mt-3 md:mt-0 col-span-6 tall:col-span-2">
                    <form
                      className="w-[100%] h-[60vh] flex flex-col gap-6 justify-center items-center mx-auto shadow-lg bg-white p-5 rounded-md"
                      onSubmit={updateProcessOrder}
                    >
                      <div className="text-center mb-10">
                        <p className="text-xl font-medium text-gray-600 pb-3 border-b-2">
                          Trạng thái đơn đặt phòng
                        </p>
                      </div>
                      <div className="w-full mb-2">
                        <div className="flex gap-2 justify-evenly flex-col h-full ">
                          <div className="bg-primaryBlue rounded-lg overflow-hidden w-full flex justify-start items-center">
                            <AccountTree className="text-xl text-white mx-2" />
                            <select
                              value={status}
                              className="px-3 py-2 outline-none border-2 w-full"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option disabled value="">
                                Chọn trạng thái
                              </option>
                              <option value="Confirm">Xác nhận</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="w-fit mx-auto">
                        <Button
                          label="Cập nhật trạng thái"
                          disabled={
                            loadingOrder
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        />{" "}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
