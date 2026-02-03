import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { login } from "../service/authService.jsx";

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setError("");

    try {
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const res = await login(data);

      localStorage.setItem("auth", JSON.stringify(res));
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
      navigate("/users");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      dispatch({ type: "LOGIN_ERROR", payload: msg });
    }
  }

  return (
    <div className="auth-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="auth-sub">Sign in to your account</p>

        <input name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}