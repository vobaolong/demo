import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminRooms,
  deleteRoom,
} from "../../actions/roomAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../../components/layout/MetaData";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import SideBar from "../../components/admin/Sidebar";
import { DELETE_ROOM_RESET } from "../../constants/roomConstants";
import FormatPrice from "../../components/format";

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, rooms } = useSelector((state) => state.rooms);
  const { error: deleteError, isDeleted } = useSelector((state) => state.room);

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
      alert.success("Xoá phòng thành công");
      navigate("/admin/rooms");
      dispatch({ type: DELETE_ROOM_RESET });
    }

    dispatch(getAdminRooms());
  }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

  const deleteRoomHandler = (id) => {
    dispatch(deleteRoom(id));
  };

  const columns = [
    { field: "id", headerName: "Mã phòng", minWidth: 200, flex: 0.3 },

    {
      field: "name",
      headerName: "Tên phòng",
      minWidth: 220,
      flex: 0.4,
    },
    {
      field: "stock",
      headerName: "Số lượng phòng",
      type: "number",
      minWidth: 100,
      flex: 0.2,
    },

    {
      field: "price",
      headerName: "Giá phòng/đêm",
      type: "number",
      minWidth: 120,
      flex: 0.2,
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Hành động",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className="text-green-400 mx-5 text-lg hover:text-green-500 transition-all duration-300"
              to={`/admin/room/${params.getValue(params.id, "id")}`}
            >
              <FaRegEdit />
            </Link>

            <button
              className="text-red-400 mx-5 text-lg hover:text-red-500 transition-all duration-300"
              onClick={() =>
                deleteRoomHandler(params.getValue(params.id, "id"))
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

  rooms &&
    rooms.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: `${FormatPrice(item.price)}`,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`Phòng - Admin`} />

      {/* dashboard */}
      <div className="dashboardStyle">
        <div className="sidebarStyle">
          <SideBar />
        </div>

        <div className="dashboardRightBoxStyle">
          <div className="mb-5">
            <p className="upper text-center text-2xl font-bold text-gray-400">
              Tất cả phòng
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

export default RoomList;
