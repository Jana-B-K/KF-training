import { useContext, useState, useRef, useEffect } from "react";  // ✅ ADDED useEffect
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { state, dispatch } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setDropdownOpen(false);
  };

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  // Close dropdown when clicking outside
  useEffect(() => {  
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo" onClick={() => window.location.reload()}>
          Logo
        </h1>
      </div>
      
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          {state.theme === "light" ? "🌙" : "☀️"}
        </button>
        
        <div className="profile-container" ref={dropdownRef}>
          <button 
            className="profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            👤 {state.user?.username?.split('@')[0]}
          </button>
          
          {dropdownOpen && (
            <div className="dropdown">
              <button className="dropdown-item" onClick={() => alert('Profile Page')}>
                Profile
              </button>
              <button className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
