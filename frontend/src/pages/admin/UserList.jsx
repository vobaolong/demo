import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllUsers, deleteUser } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../../components/layout/MetaData";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import SideBar from "../../components/admin/Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

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
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers()); // getting all the user rooms
  }, [dispatch, error, alert, deleteError, isDeleted, navigate, message]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "Mã người dùng", minWidth: 200, flex: 0.4 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 180,
      flex: 0.4,
    },

    {
      field: "role",
      headerName: "Vai trò",
      minWidth: 120,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "text-green-500"
          : "text-red-500";
      },
    },

    {
      field: "actions",
      headerName: "Hành động",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className="text-green-400 mx-5 text-lg hover:text-green-500 transition-all duration-300"
              to={`/admin/user/${params.getValue(params.id, "id")}`}
            >
              <FaRegEdit />
            </Link>

            <button
              className="text-red-400 mx-5 text-lg hover:text-red-500 transition-all duration-300"
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`Tất cả người dùng - Admin`} />

      {/* dashboard */}
      <div className="dashboardStyle">
        <div className="sidebarStyle">
          <SideBar />
        </div>

        <div className="dashboardRightBoxStyle">
          <div className="mb-5">
            <p className="upper text-center text-2xl font-bold text-gray-400">
              Tất cả người dùng
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

export default UserList;
