import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  console.log(token);

  if (!token) return <Navigate to="/login" replace />;

  if (!user || (!user.is_staff && !user.is_superuser)) {
    return <Navigate to="/403" replace />;
  }
  return children;
};

export default AdminRoute;
