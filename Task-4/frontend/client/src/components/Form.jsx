import { useEffect, useState } from "react";
import axios from "axios";


const API = "http://localhost:2000/api/user";

const Form = ({ onSuccess, editingUser, clearEdit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  // Prefill when editing
  useEffect(() => {
    if (editingUser) {
      setFormData({
        username: editingUser.username,
        email: editingUser.email,
        password: "",
        role: editingUser.role
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // UPDATE
        await axios.put(`${API}/${editingUser._id}`, formData);
        clearEdit();
      } else {
        // CREATE
        await axios.post(API, formData);
      }

      onSuccess();
      setFormData({ username: "", email: "", password: "", role: "" });

    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Create User"}</h2>

      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <input
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Admin or User"
      />

      <button type="submit">
        {editingUser ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default Form;
