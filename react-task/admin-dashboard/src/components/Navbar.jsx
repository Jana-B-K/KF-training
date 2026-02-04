import { Link } from 'react-router-dom';

export default function Navbar({ onNavLinkClick }) {
  return (
    <nav className="nav-container">
      {/* width: 100% ensures it fits the sidebar container */}
      <Link to="/" className="nav-link" onClick={onNavLinkClick}>
        Dashboard
      </Link>
      <Link to="/users" className="nav-link" onClick={onNavLinkClick}>
        Users
      </Link>
      <Link to="/report" className="nav-link" onClick={onNavLinkClick}>
        Reports
      </Link>
    </nav>
  );
}