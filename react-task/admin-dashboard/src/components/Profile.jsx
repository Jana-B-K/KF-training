import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Profile() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for toggling edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...state.user });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_USER", payload: formData });
    setIsEditing(false);
    alert("Profile Updated!");
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false); // If editing, just stop editing
      setFormData({ ...state.user }); // Reset form
    } else {
      navigate("/"); // If not editing, go back to Dashboard
    }
  };

  return (
    <div className="dashboard-layout">
      <Header />
      <main className="dashboard-main fade-in">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Account Settings</h2>
            <div className="profile-actions">
              {!isEditing && (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
              <button className="edit-btn cancel" onClick={handleCancel}>
                {isEditing ? "Discard" : "Back to Home"}
              </button>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleUpdate}>
            <div className="input-group">
              <label>Full Name</label>
              <input 
                disabled={!isEditing}
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                disabled={!isEditing}
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            {isEditing && (
              <button type="submit" className="save-btn fade-in">
                Save Changes
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}