import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";
import "./Dashboard.css";
import users from "../middleware/user";
import reportData from "../middleware/reportData";

export default function Dashboard() {
  const { state, dispatch } = useContext(AuthContext);

  // --- PIE CHART LOGIC (User Roles) ---
  const adminCount = users.filter(u => u.role === "Admin").length;
  const userCount = users.filter(u => u.role === "User").length;
  const totalUsersForPie = users.length || 1;
  const adminPercentage = (adminCount / totalUsersForPie) * 100;

  // --- MONTHLY BAR CHART LOGIC ---
  // 1. Get unique list of months from reportData
  const months = [...new Set(reportData.map(item => item.month))];

  // 2. Map those months to an array of objects with status counts
  const monthlyStats = months.map(m => {
    const monthData = reportData.filter(r => r.month === m);
    console.log(monthData)
    const completed = monthData.filter(r => r.status === "Completed").length;
    const pending = monthData.filter(r => r.status === "Pending").length;
    
    // Calculate height relative to a max value (e.g., 10) for visual scaling
    const scaleLimit = 10; 
    return {
      name: m,
      completed,
      pending,
      compHeight: (completed / scaleLimit) * 100,
      pendHeight: (pending / scaleLimit) * 100
    };
  });

  // --- SUMMARY LOGIC ---
  const totalUser = users.length;
  const totalReport = reportData.length;
  const totalActiveUser = users.filter((u) => u.status === "Active").length;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Static Recent Activities
  const activities = [
    { id: 1, action: "User Login", user: "Jana", time: "2 mins ago" },
    { id: 2, action: "Report Generated", user: "Nayeem", time: "1 hour ago" },
    { id: 3, action: "Profile Updated", user: "Girish", time: "3 hours ago" },
  ];

  return (
    <Layout>
      <div className="dashboard-header">
        <div className="welcome-banner">
          <h2>Welcome, {state.user?.name}! 👋</h2>
          <p className="subtitle">Role: <strong>{state.user?.role}</strong></p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>
      
      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{totalUser}</p>
        </div>
        <div className="stat-card">
          <h3>Total Reports</h3>
          <p className="stat-number">{totalReport}</p>
        </div>
        <div className="stat-card">
          <h3>Active Status</h3>
          <p className="stat-number active-text">{totalActiveUser}</p>
        </div>
      </div>

      <div className="charts-section">
        {/* Pie Chart Box */}
        <div className="chart-box">
          <h3>User Roles</h3>
          <div className="pie-container">
            <div 
              className="css-pie" 
              style={{ background: `conic-gradient(#3182ce ${adminPercentage}%, #cbd5e0 0)` }}
            ></div>
            <div className="chart-legend">
              <p><span className="dot admin"></span> Admin ({adminCount})</p>
              <p><span className="dot user"></span> User ({userCount})</p>
            </div>
          </div>
        </div>

        {/* Monthly Bar Chart Box */}
        <div className="chart-box full-width">
          <h3>Monthly Report Status</h3>
          <div className="monthly-bar-container">
            {monthlyStats.map((stat, index) => (
              <div className="month-group" key={index}>
                <div className="bars-wrapper">
                  <div 
                    className="bar complete" 
                    style={{ height: `${Math.min(stat.compHeight, 100)}%` }}
                  >
                    <span className="tooltip">{stat.completed}</span>
                  </div>
                  <div 
                    className="bar pending" 
                    style={{ height: `${Math.min(stat.pendHeight, 100)}%` }}
                  >
                    <span className="tooltip">{stat.pending}</span>
                  </div>
                </div>
                <p className="month-label">{stat.name}</p>
              </div>
            ))}
          </div>
          <div className="chart-legend-bottom">
            <p><span className="dot complete-dot"></span> Completed</p>
            <p><span className="dot pending-dot"></span> Pending</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="activity-section">
        <h3>Recent Activities</h3>
        <table className="activity-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr key={act.id}>
                <td>{act.action}</td>
                <td>{act.user}</td>
                <td>{act.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}