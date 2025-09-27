import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { loading, user } = useAuth(); // ✅ use auth context loading

  // ✅ show loader while auth state is loading
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // ✅ redirect if not logged in
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // ✅ user logged in, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
