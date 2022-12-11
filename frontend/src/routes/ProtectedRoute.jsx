import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  return (
    <>
      {!loading && (
        <>
          {isAuthenticated ? <Outlet {...rest} /> : <Navigate to="/login" />}{" "}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
