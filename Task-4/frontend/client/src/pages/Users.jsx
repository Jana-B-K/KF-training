import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import * as api from "../service/userService";
import { register } from "../service/authService";
import UserForm from "../components/UserForm";
import Card from "../components/Cards";

function Users() {
  const { state, dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const isAdmin = state.user?.role === "ADMIN";

  useEffect(() => {
    if (!state.token) return;

    api.getUsers(state.token)
      .then(res => {
        // Ensure we handle both potential response structures
        const list = res.data.users || res.data;
        setUsers(Array.isArray(list) ? list : []);
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load users");
      });
  }, [state.token]);

  async function addUser(data) {
    try {
      setError("");
      const res = await register(data);
      // Backend usually returns user object directly or inside data
      const newUser = res.user || res.data?.user || res; 
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError("Failed to add user");
    }
  }

  async function updateUser(data) {
    try {
      setError("");
      console.log("Sending payload:", data); 
      const res = await api.updateUser(editingUser._id, data, state.token);
      console.log("Server response:", res.data)
      
      // Based on your controller: res.status(200).json({ user, msg: 'User updated' });
      const updatedUser = res.data.user;

      setUsers(prev =>
        prev.map(u => (u._id === editingUser._id ? updatedUser : u))
      );
      setEditingUser(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
    }
  }

  async function removeUser(id) {
    try {
      await api.deleteUser(id, state.token);
      setUsers(prev => prev.filter(u => u._id !== id));
      if (editingUser && editingUser._id === id) setEditingUser(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  }

  function handleLogout() {
    localStorage.removeItem("auth");
    dispatch({ type: "LOG_OUT" });
  }

  return (
    <div className="users-container">
      <div className="top-bar">
        <h2>User Management</h2>
        <h2>{state.user?.username} logged</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {!isAdmin && <p className="readonly-msg">You have read-only access.</p>}

      {isAdmin && (
      editingUser ? (
        <div className="edit-form-container">
          <div className="edit-header">
            <span className="edit-badge">Editing Mode</span>
            <button className="cancel-edit-btn" onClick={() => setEditingUser(null)} title="Cancel">
              ✕
            </button>
          </div>
          <UserForm
            key={editingUser._id}
            initialData={editingUser}
            onSubmit={updateUser}
            isEdit={true}
          />
        </div>
      ) : (
        <div className="create-form-container">
          <UserForm onSubmit={addUser} isEdit={false} />
        </div>
      )
    )}

      {error && <p className="error">{error}</p>}

      <div className="cards-wrapper">
        {users.map(user => (
          <Card
            key={user._id}
            user={user}
            onDelete={removeUser}
            onEdit={() => setEditingUser(user)}
            canEdit={isAdmin}
            canDelete={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}

export default Users;