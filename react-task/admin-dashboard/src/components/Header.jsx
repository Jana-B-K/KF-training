import { useContext, useState, useRef, useEffect } from "react"; 
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ onMenuToggle }) {
  const { state, dispatch } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {  
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safety check: if state isn't ready, show a small loader instead of a blank screen
  if (!state) return <div className="header">Loading...</div>;

  return (
    <header className="header">
      <div className="header-left">
        {/* The Hamburger Button */}
        <button className="menu-toggle" onClick={onMenuToggle}>
          ☰
        </button>
        <h1 className="logo" onClick={() => navigate("/")}>MyBrand</h1>
      </div>
    
      
      <div className="header-right">
        <button className="theme-toggle" onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
          {state.theme === "light" ? "🌙" : "☀️"}
        </button>
        
        <div className="profile-container" ref={dropdownRef}>
          <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            👤 {state.user?.name || "User"}
          </button>
          
          {dropdownOpen && (
            <div className="dropdown fade-in">
              <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                User Profile
              </Link>
              <button className="dropdown-item logout" onClick={() => dispatch({ type: "LOGOUT" })}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}