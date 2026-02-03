const Card = ({ user, onDelete, onEdit, canEdit, canDelete }) => {
  return (
    <div className="card-container">
      <div className="card-title">{user.username}</div>
      <div className="card-email">{user.email}</div>
      <span className={`role-badge ${user.role === "ADMIN" ? "admin" : "user"}`}>
        {user.role}
      </span>

     

      {( canDelete || canEdit ) && (
        <div className="card-actions">
          {canEdit && (
            <button className="edit" onClick={() => onEdit(user)}>Edit</button>
          )}
          {canDelete && (
            <button className="danger" onClick={() => onDelete(user._id)}>Delete</button>
          )}
          </div>
      ) }
    </div>
  );
};

export default Card;