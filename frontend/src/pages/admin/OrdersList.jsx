import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../../components/layout/MetaData";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import SideBar from "../../components/admin/Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import FormatPrice from "../../components/format";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xoá đơn đặt phòng thành công");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders()); // getting all the orders
  }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { field: "id", headerName: "Mã đơn đặt phòng", minWidth: 200, flex: 0.5 },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã xác nhận"
          ? "text-green-500"
          : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số đêm",
      type: "number",
      minWidth: 100,
      flex: 0.2,
    },

    {
      field: "amount",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Hành động",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className="text-green-400 mx-5 text-lg hover:text-green-500 transition-all duration-300"
              to={`/admin/order/${params.getValue(params.id, "id")}`}
            >
              <FaRegEdit />
            </Link>

            <button
              className="text-red-400 mx-5 text-lg hover:text-red-500 transition-all duration-300"
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <FaTrash />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((order) => {
      rows.push({
        id: order._id,
        itemsQty: order.orderItems.length,
        status:
          order.orderStatus && order.orderStatus === "Confirm"
            ? "Đã xác nhận"
            : "Đang xử lí",
        amount: FormatPrice(order.totalPrice),
      });
    });

  return (
    <Fragment>
      <MetaData title={`Đơn đặt phòng - Admin`} />

      {/* dashboard */}
      <div className="dashboardStyle">
        <div className="sidebarStyle">
          <SideBar />
        </div>

        <div className="dashboardRightBoxStyle">
          <div className="mb-5">
            <p className="upper text-center text-2xl font-bold text-gray-400">
              Tất cả đơn đặt phòng
            </p>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="w-[95%] mx-auto"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
export default OrdersList;
