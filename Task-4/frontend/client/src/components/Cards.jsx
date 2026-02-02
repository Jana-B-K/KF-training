

const Card = ({ user, onDelete, onEdit }) => {
  return (
    <div className="card-container">
      <div className="card-title">Username: {user.username}</div>
      <div>Email: {user.email}</div>
      <div className="role">Role: {user.role}</div>

      <div className="card-actions">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button className="danger" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
