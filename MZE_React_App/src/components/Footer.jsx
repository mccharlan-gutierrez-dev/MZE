
import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaArrowRight,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";

import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="mze-footer">

      <div className="footer-main">

        {/* BRAND SECTION */}
        <div className="footer-brand">

          <div className="footer-logo">
            <div className="logo-box">MZE</div>

            <div className="brand-info">
             
              <p>Fast <span>•</span> Safe <span>•</span> Trusted</p>
            </div>
          </div>

          <p className="footer-description">
            Your trusted pawnshop and trading partner
            <br />
            for a better, more convenient tomorrow.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>

            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>

            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>

        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/career">Career</Link></li>
            <li><Link to="/branches">Branches</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-links footer-services">
          <h3>Our Services</h3>

          <ul>
            <li><Link to="/pawn-services">Pawn Services</Link></li>
            <li><Link to="/buy-sell">Buy & Sell Gadgets</Link></li>
            <li><Link to="/electronics">Electronics</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>

            
          </ul>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">

        <div className="footer-security">
          <div className="security-icon">
            <FaShieldAlt />
            <FaCheck className="shield-check" />
          </div>

          <div>
            <h4>Secure & Reliable</h4>
            
          </div>
        </div>

        <div className="footer-copyright">
          <p>
            © {new Date().getFullYear()} MZE 
            All Rights Reserved.
          </p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
