import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";

export default function Dashboard() {
  const { state } = useContext(AuthContext);

  return (
    <Layout>
      <div className="welcome-banner">
        <h2>Welcome, {state.user?.name}! 👋</h2>
        <p className="subtitle">Role: <strong>{state.user?.role}</strong></p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>System Status</h3>
          <p style={{ color: 'var(--success)' }}>● Active</p>
        </div>
        <div className="stat-card">
          <h3>Email</h3>
          <p>{state.user?.email}</p>
        </div>
      </div>
    </Layout>
  );
}