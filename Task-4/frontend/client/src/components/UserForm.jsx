import { useState, useEffect } from "react";

const EMPTY = { username: "", email: "", password: "", role: "USER" };

function UserForm({ initialData = {}, onSubmit, isEdit }) {
  const [form, setForm] = useState({ ...EMPTY });

  // Sync form state when initialData changes (important for switching between edits)
  useEffect(() => {
    if (isEdit && initialData) {
      setForm({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "", // Keep password empty on edit
        role: initialData.role || "USER",
      });
    } else {
      setForm({ ...EMPTY });
    }
  }, [initialData, isEdit]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form };
    
    // Remove password from payload if editing to prevent overwriting with empty string
    if (isEdit) {
      delete payload.password;
    }

    try {
      await onSubmit(payload);
      if (!isEdit) {
        setForm({ ...EMPTY });
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit User" : "Create User"}</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      {!isEdit && (
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
      )}

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button type="submit">{isEdit ? "Update User" : "Create User"}</button>
    </form>
  );
}

export default UserForm;