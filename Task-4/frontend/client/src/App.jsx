import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import Card from "./components/Cards";

const API = "http://localhost:2000/api/user";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // READ
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data.users);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <Form
        onSuccess={fetchUsers}
        editingUser={editingUser}
        clearEdit={() => setEditingUser(null)}
      />

      <div className="cards-wrapper">
        {users.map((user) => (
          <Card
            key={user._id}
            user={user}
            onDelete={deleteUser}
            onEdit={setEditingUser}
          />
        ))}
      </div>
    </>
  );
}

export default App;
