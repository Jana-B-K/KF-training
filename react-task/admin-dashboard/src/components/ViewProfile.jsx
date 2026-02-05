import { useParams, useNavigate } from "react-router-dom";
import users from "../middleware/user";
import "./ViewProfile.css";

export default function ViewProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = users.find((u) => u.id === Number(id));

    if (!user) return <div className="view-profile-container">User not found</div>;

    return (
        /* The parent container will inherit the theme from document.body */
        <div className="view-profile-page">
            <div className="profile-card">
                <div className="profile-avatar">{user.name.charAt(0)}</div>
                <h2>{user.name}</h2>
                <div className="profile-role-badge">{user.role}</div>

                <div className="profile-info-group">
                    <div className="info-row">
                        <strong>Email</strong>
                        <span>{user.email}</span>
                    </div>
                    <div className="info-row">
                        <strong>Role</strong>
                        <span>{user.role}</span>
                    </div>
                    <div className="info-row">
                        <strong>Phone</strong>
                        <span>+91 987654321</span>
                    </div>
                    <div className="info-row">
                        <strong>Country</strong>
                        <span>India</span>
                    </div>
                </div>

                <button className="back-btn" onClick={() => navigate("/users")}>
                    Back to Directory
                </button>
            </div>
        </div>
    );
}