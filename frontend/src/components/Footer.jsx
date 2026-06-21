
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section">
            <div className="footer-brand">
              <h2 className="brand-name">ScholarNest</h2>
              <p className="brand-tagline">Connecting students with scholarships and mentors for success.</p>
              {/* <div className="social-icons">
                <a href="#facebook" className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="#twitter" className="social-icon" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                <a href="#instagram" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              </div> */}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/scholarships">Find Scholarships</Link></li>
              <li><Link to="/mentors">Find Mentors</Link></li>
              {/* <li><Link to="/register">Sign Up</Link></li> */}
              
            </ul>
          </div>

          {/* <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div> */}

          {/* <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#disclaimer">Disclaimer</a></li>
            </ul>
          </div> */}

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <div className="contact-information">
              <p><i className="bi bi-envelope"></i>scholaradmin123@gmail.com</p>
              <p><i className="bi bi-telephone"></i> 1-800-SCHOLAR</p>
              <p><i className="bi bi-geo-alt"></i> India</p>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; 2026 ScholarNest. All rights reserved.</p>
          {/* <p>Made with <i className="bi bi-heart-fill"></i> for students | <a href="#terms">Terms</a> | <a href="#privacy">Privacy</a></p> */}
                    <p>Made with <i className="bi bi-heart-fill"></i> for students </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;