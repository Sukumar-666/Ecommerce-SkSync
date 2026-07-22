import React from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap a page element to require authentication.
 * requiredRole="any"   -> must be logged in (any role)
 * requiredRole="admin" -> must be logged in as an admin
 */
export default function ProtectedRoute({ requiredRole = "any", children }) {
  const { session, initializing } = useAuth();

  // AuthProvider is still trying to restore a session from the refresh
  // cookie (e.g. right after a page reload) — wait rather than bounce the
  // user to /login while that's still in flight.
  if (initializing) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole === "admin" && session.role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  return children;
}
