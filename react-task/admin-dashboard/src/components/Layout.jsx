import { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function must be passed to Header
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="dashboard-layout">
      {/* Step 1: Pass the function to the Header */}
      <Header onMenuToggle={toggleMenu} />
      
      <div className="dashboard-container">
        {/* Step 2: The sidebar MUST contain the Navbar component */}
        <aside className={`side-navbar ${isMenuOpen ? 'open' : ''}`}>
          <Navbar onNavLinkClick={() => setIsMenuOpen(false)} />
        </aside>

        {/* Step 3: Main content area */}
        <main className="dashboard-main" onClick={() => setIsMenuOpen(false)}>
          {children}
        </main>
      </div>

      {/* Background overlay for mobile */}
      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />}
    </div>
  );
}