import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
// Assuming these helper files exist as per your original code
import validateForm from "../services/validation";
import authenticateUser from "../middleware/authenticate";

const Form = () => {
  const { dispatch, state } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.error) setError(state.error);
  }, [state.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      validateForm(formData);
      const res = authenticateUser(formData);
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", payload: err.message });
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <input type="email" placeholder="Email" required
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" required
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Form;
