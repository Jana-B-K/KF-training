import Layout from "./Layout";
import users from "../middleware/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css"

export default function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  function handleNameSearch(name){
    e.preventDefault();
    setName(name)
  }

  const filteredUser = users.filter((user) => {
    const matchedName = searchTerm === "" || user.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    const matchedRole = role === "all"  || user.role.toLowerCase() === role;
    return matchedName && matchedRole;
  });

  

  const columns = users.length > 0 ? Object.keys(users[0]) : [];
  return (
    <Layout>
      <h2>User Management</h2>
      <p>Manage your team members here.</p>
      <div className="search-bar-container">
        {/* Removed form and used onChange for live updates */}
        <input 
          type="text" 
          placeholder="Type a name (e.g., 'J')..."
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
      </div>

      <div className="filter-role">
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              column !== "password" && (<th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>)
              
            ))}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUser.map((user) => (
            <tr key={user.id}>
              {columns.map((column, index) => (
                column !== "password" && (<td key={index}>{user[column]}</td>)
              ))}

              <td><button onClick={() => setSelectedUser(user)}>view</button></td>
            </tr>
            
          ))}
        </tbody>
      </table>



      {selectedUser && (
        <div className="model-container"> {/* The black overlay */}
          <div className="model-content"> {/* The white box */}
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Email:</strong> {selectedUser.email }</p>
            <p><strong>Role:</strong> {selectedUser.role }</p>
            <p><strong>Phone:</strong> 987654321</p>
            <p><strong>Nationality:</strong> Indian</p>
              
            <div className="modal-actions">
              <button className="close-btn" onClick={() => setSelectedUser(null)}>Close</button>
              <button 
                className="full-profile-btn" 
                onClick={() => navigate(`/viewProfile/${selectedUser.id}`)}
              >
                Full Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}