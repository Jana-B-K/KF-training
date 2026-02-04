import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../service/authService.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role:e.target.role.value,
      };

      await register(data);
      
      navigate("/users");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    }
  }

  return (
    <div className="auth-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="auth-sub">Sign up to get started</p>

        <input name="username" placeholder="Username" required />
        <input name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <select name="role" >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit">Sign Up</button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}