
import { useState } from 'react';
import { Link } from 'react-router';
import logo from '../assets/mze_nav_logo.jpg';
import '../css/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="custom-navbar">

      {/* LOGO */}
      <div className="navbar-start">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="MZE" className="navbar-logo" />
        </Link>
      </div>

      {/* HAMBURGER BUTTON */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* NAVIGATION LINKS */}
      <div className={`navbar-end navbar-links ${menuOpen ? 'active' : ''}`}>

        {/* CLOSE BUTTON - MOBILE ONLY */}
        <button
          className="mobile-close-btn"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          &times;
        </button>

        <Link to="/" className="nav-link" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/about" className="nav-link" onClick={closeMenu}>
          About
        </Link>

        <Link to="/about" className="nav-link" onClick={closeMenu}>
          Services
        </Link>

        <Link to="/contact" className="nav-link" onClick={closeMenu}>
          Branches
        </Link>

        <Link to="/contact" className="nav-link" onClick={closeMenu}>
          Contact
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;
