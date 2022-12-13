import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../components/layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import Sidebar from "../../components/admin/Sidebar";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getAdminRooms } from "../../actions/roomAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import FormatPrice from "../../components/format";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms } = useSelector((state) => state.rooms);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  rooms &&
    rooms.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminRooms());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  Chart.register(CategoryScale);

  const state = {
    labels: ["Doanh thu ban đầu", "Doanh thu hiện tại"],
    datasets: [
      {
        label: "Tổng doanh thu",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Hết phòng", "Còn phòng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, rooms.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="dashboardStyle mt-5">
      <MetaData title={`Bảng điều khiển - Admin`} />
      <div className="sidebarStyle sticky left-0">
        <Sidebar />
      </div>

      <div className="dashboardRightBoxStyle">
        <div>
          <p className="upper text-center text-2xl font-bold text-gray-400">
            Bảng điều khiển
          </p>
        </div>

        {/* dashboardSummary */}
        <div className="pt-10">
          <div className="text-center text-xl py-5 text-white font-medium bg-secondaryDark">
            <p>
              Tổng doanh thu <br />
              {FormatPrice(totalAmount)}
            </p>
          </div>

          {/* dashboardSummaryBox2 */}
          <div className=" flex flex-row justify-center py-5 gap-7">
            <Link className="summryBoxStyle bg-primaryBlue" to="/admin/rooms">
              <p>Phòng</p>
              <p>{rooms?.length}</p>
            </Link>
            <Link
              className="summryBoxStyle bg-secondaryDark "
              to="/admin/orders"
            >
              <p>Số đơn</p>
              <p>{orders?.length}</p>
            </Link>
            <Link className="summryBoxStyle bg-gray-800" to="/admin/users">
              <p>Người dùng</p>
              <p>{users?.length}</p>
            </Link>
          </div>
        </div>

        {/* lineChart */}
        <div className="w-[80%] mx-auto">
          <Line
            data={state}
            options={{
              title: {
                display: true,
                text: "Doanh thu mỗi tháng",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>

        {/* doughnutChart */}
        <div className="w-[50%] md:w-[40%] mx-auto">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
