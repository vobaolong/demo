import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import Cart from "../pages/Cart/Cart";
import Transaction from "../pages/Cart/Transaction";
import ContactUs from "../pages/ContactUs";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import RoomDetails from "../pages/Room/RoomDetails";
import Rooms from "../pages/Room/Rooms";
import SearchRooms from "../pages/Room/SearchRooms";
import ForgotPassword from "../pages/User/ForgotPassword";
import LoginSignUp from "../pages/User/LoginSignUp";
import Profile from "../pages/User/Profile";
import ResetPassword from "../pages/User/ResetPassword";
import UpdatePassword from "../pages/User/UpdatePassword";
import UpdateProfile from "../pages/User/UpdateProfile";
import ConfrimOrder from "../pages/Cart/ConfirmOrder";
import Payment from "../pages/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "../pages/Cart/OrderSuccess";
import MyOrders from "../pages/Cart/MyOrders";
import OrderDetails from "../pages/Cart/OrderDetails";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import RoomList from "../pages/admin/RoomList";
import CreateRoom from "../pages/admin/CreateRoom";
import UpdateRoom from "../pages/admin/UpdateRoom";
import OrdersList from "../pages/admin/OrdersList";
import ProcessOrder from "../pages/admin/ProcessOrder";
import UserList from "../pages/admin/UserList";
import UpdateUser from "../pages/admin/UpdateUser";
import RoomReviews from "../pages/admin/RoomReviews";

const ElementWithRoutes = ({ stripeApiKey }) => {
  // const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <div className="-mt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:keyword" element={<Rooms />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/search" element={<SearchRooms />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          {/* If router is not specified then show below page */}
          <Route path="*" element={<PageNotFound />} />

          {/* When user get logged in*/}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/account" element={<Profile />} />
            <Route path="/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/login/transaction" element={<Transaction />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route
              path="/process/payment/*"
              element={
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Routes>
                      <Route path="/" element={<Payment />} />
                    </Routes>
                  </Elements>
                )
              }
            />
            <Route path="/orders/me" element={<MyOrders />} />
            <Route path="/order/confirm" element={<ConfrimOrder />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>
          {/* When admin is logged in */}
          <Route path="/" element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/rooms" element={<RoomList />} />
            <Route path="/admin/room" element={<CreateRoom />} />
            <Route path="/admin/room/:id" element={<UpdateRoom />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<RoomReviews />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default ElementWithRoutes;
