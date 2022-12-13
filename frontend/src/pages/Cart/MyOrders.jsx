import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../../components/layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../../components/layout/MetaData";
import { Visibility } from "@material-ui/icons";
import FormatPrice from "../../components/format";

const MyOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, orders } = useSelector((state) => state.myOrders);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  const columns = [
    { field: "id", headerName: "Mã đơn đặt phòng", minWidth: 280, flex: 1 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 120,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã xác nhận"
          ? "text-green-500"
          : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số phòng",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Hành động",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            className="text-slate-500 hover:text-green-500 transition-all duration-500 px-5"
            to={`/order/${params.getValue(params.id, "id")}`}
          >
            <Visibility />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status:
          item.orderStatus && item.orderStatus === "Confirm"
            ? "Đã xác nhận"
            : "Đang xử lý",
        amount: FormatPrice(item.totalPrice),
      });
    });

  return (
    <Fragment>
      <MetaData title={`Đơn đặt phòng ${user.name}`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="py-24 w-[90%] mx-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[]}
            pageSize={5}
            disableSelectionOnClick
            className="rounded-t-md"
            autoHeight
          />
          <p
            className="bg-primaryBlue py-3
          mt-10 text-center text-xl text-white rounded-b-md"
          >
            Danh sách đơn đặt phòng của {user.name}
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
