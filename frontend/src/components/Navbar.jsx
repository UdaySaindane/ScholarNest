// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
//       <div className="container">
//         {/* Brand/Logo */}
//         <Link className="navbar-brand fw-bold text-primary" to="/">
//           🎓 ScholarNest
//         </Link>
        
//         {/* Responsive Toggle Button */}
//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           data-bs-toggle="collapse" 
//           data-bs-target="#navbarNav" 
//           aria-controls="navbarNav" 
//           aria-expanded="false" 
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
        
//         {/* Navigation Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
//             <li className="nav-item">
//               <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/scholarships">Scholarships</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/mentors">Mentors</NavLink>
//             </li>
            
//             {/* --- NEW DASHBOARD LINK --- */}
//             {/* In a real app, you'd show this link conditionally after login */}
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
//             </li>
//             {/* ------------------------- */}
            
//             {/* Divider */}
//             <li className="nav-item d-none d-lg-block mx-2">
//               <span className="nav-link text-muted">|</span>
//             </li>
            
//             {/* Auth Buttons */}
//             <li className="nav-item me-2 mb-2 mb-lg-0">
//               <Link className="btn btn-outline-primary w-100" to="/login">Login</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="btn btn-primary w-100" to="/register">Register</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // Don't forget to install bootstrap and bootstrap.js bundle for the toggler to work
// // npm install bootstrap
// // And import 'bootstrap/dist/js/bootstrap.bundle.min.js'; in your main.jsx or index.js

// export default Navbar;



// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In real app, get from auth context

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        {/* Brand/Logo */}
        <Link className="navbar-brand" to="/">
          <div className="brand-wrapper">
            <span className="brand-icon">🎓</span>
            <span className="brand-text">ScholarNest</span>
          </div>
        </Link>
        
        {/* Responsive Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/"
              >
                <i className="bi bi-house-door me-1"></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/scholarships"
              >
                <i className="bi bi-award me-1"></i>
                Scholarships
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                to="/mentors"
              >
                <i className="bi bi-people me-1"></i>
                Mentors
              </NavLink>
            </li>
            
            {/* Dashboard Link - Show only when logged in */}
            
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to="/dashboard"
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Dashboard
                </NavLink>
              </li>
            
            
            {/* Divider */}
            <li className="nav-item d-none d-lg-block">
              <span className="nav-divider"></span>
            </li>
            
            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item me-2 mb-2 mb-lg-0">
                  <Link className="btn btn-nav-login" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item mb-2 mb-lg-0">
                  <Link className="btn btn-nav-register" to="/register">
                    <i className="bi bi-person-plus me-1"></i>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle user-dropdown" 
                  href="#" 
                  id="navbarDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Doe&background=FF6B35&color=fff&size=40" 
                    alt="User" 
                    className="user-avatar"
                  />
                  <span className="ms-2">John Doe</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end user-dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      <i className="bi bi-speedometer2 me-2"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/applications">
                      <i className="bi bi-file-text me-2"></i>
                      My Applications
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => setIsLoggedIn(false)}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;