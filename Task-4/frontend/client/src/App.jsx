import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Users from "./pages/Users.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 
        ✅ Removed roles={["ADMIN","USER"]} — it was causing the redirect
           when user.role was undefined/missing from the login response.
           ProtectedRoute alone already blocks unauthenticated users.
           Add roles back ONLY if you want to restrict specific pages to ADMIN only.
      */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      {/* ✅ Added /unauthorized — was missing, so it fell to the 404 wildcard */}
      <Route
        path="/unauthorized"
        element={
          <div style={{ textAlign: "center", marginTop: 120 }}>
            <h2>Access Denied</h2>
            <p style={{ color: "#64748b", marginTop: 8 }}>
              You don't have permission to view this page.
            </p>
            <a href="/login" style={{ color: "#2563eb", marginTop: 16, display: "inline-block" }}>
              Go back to Login
            </a>
          </div>
        }
      />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<h2>404 — Page not found</h2>} />
    </Routes>
  );
}

export default App;