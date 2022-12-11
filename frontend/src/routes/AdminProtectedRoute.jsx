import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ element: Element, ...rest }) => {
  const { loading, user } = useSelector((state) => state.user);
  return (
    <>
      {!loading && (
        <>{user.role === "admin" ? <Outlet /> : <Navigate to="/login" />} </>
      )}
    </>
  );
};

export default AdminProtectedRoute;
