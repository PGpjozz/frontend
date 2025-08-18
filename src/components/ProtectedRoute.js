import React from "react";
import { Navigate } from "react-router-dom";

// Example: you can check localStorage for a token or admin flag
const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("adminToken"); // store token on login

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
