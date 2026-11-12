
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import logo from '../assets/mze_nav_logo.jpg';
import '../css/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav className="custom-navbar">

      {/* LOGO */}
      <div className="navbar-start">
        <Link to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt="MZE Pawnshop"
            className="navbar-logo"
          />
        </Link>
      </div>

      {/* HAMBURGER TO X BUTTON */}
      <button
        type="button"
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* NAVIGATION LINKS */}
      <div
        id="main-navigation"
        className={`navbar-links ${menuOpen ? 'active' : ''}`}
      >

        <Link to="/" className="nav-link" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/about" className="nav-link" onClick={closeMenu}>
          About
        </Link>

        <Link to="/career" className="nav-link" onClick={closeMenu}>
  Career
</Link>
        
        

         {/* <a href="#pawn" className="btn-primary">
        Pawn Now
        <span className="arrow">→</span>
      </a> */}

        <Link to="/branches" className="nav-link" onClick={closeMenu}>
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
