import React from "react";
import { Route, Router } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginSignUp from "../../pages/User/LoginSignUp";

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  return (
    <>
      <Router>
        {!loading && (
          <>
            {isAuthenticated ? (
              <Route path={path} element={element} />
            ) : (
              <Route path="/login" element={<LoginSignUp />} />
            )}
          </>
        )}
      </Router>
    </>
  );
};

export default ProtectedRoute;
