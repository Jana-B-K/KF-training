import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { state } = useContext(AuthContext);

  // Not logged in at all → go to login
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Still waiting for user object (e.g. page refresh before hydration)
  if (!state.user) {
    return null;
  }

  // Role check — only if roles were actually passed in
  // roles.includes(undefined) is false, so if user.role is missing it fails here
  if (roles && state.user.role && !roles.includes(state.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}