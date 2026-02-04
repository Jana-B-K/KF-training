import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import validateForm from "../services/validation";

const Form = () => {
  const { dispatch, state } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setError(state.error || "");
  }, [state.error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    try {
      validateForm(formData);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: formData,
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.message,
      });
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
