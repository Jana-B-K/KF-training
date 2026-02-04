import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";

export default function Dashboard() {
  const { state } = useContext(AuthContext);

  return (
    <div className={`dashboard-container ${state.theme}`}>
      <Header />
      <main className="dashboard-main">
        <h2>Dashboard</h2>
        <p>Welcome back, {state.user?.username}!</p>
      </main>
    </div>
  );
}
