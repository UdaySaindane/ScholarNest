import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getAvatarUrl = () => {
    if (!user) return '';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FF6B35&color=fff&size=40`;
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'mentor') return '/mentor/dashboard';
    return '/dashboard';
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="brand-wrapper">
            <span className="brand-icon">🎓</span>
            <span className="brand-text">ScholarNest</span>
          </div>
        </Link>
        
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
            
            {/* Eligibility Checker - Students Only */}
            {user?.role === 'student' && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to="/eligibility-checker"
                >
                  <i className="bi bi-stars me-1"></i>
                  Eligibility Checker
                </NavLink>
              </li>
            )}
            
            {user?.role !== 'admin' && (
              <>
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
              </>
            )}
            
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                  to={getDashboardLink()}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Dashboard
                </NavLink>
              </li>
            )}
            
            <li className="nav-item d-none d-lg-block">
              <span className="nav-divider"></span>
            </li>
            
            {!isAuthenticated ? (
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
              <>
                {/* NEW - Notification Bell */}
                <li className="nav-item me-3">
                  <NotificationBell />
                </li>

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
                      src={getAvatarUrl()} 
                      alt="User" 
                      className="user-avatar"
                    />
                    <span className="ms-2">{user?.name}</span>
                    {user?.role !== 'student' && (
                      <span className="role-badge">{user?.role}</span>
                    )}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end user-dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to={getDashboardLink()}>
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                      </Link>
                    </li>
                    
                    {user?.role === 'student' && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            <i className="bi bi-person me-2"></i>
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/applications">
                            <i className="bi bi-file-text me-2"></i>
                            My Applications
                          </Link>
                        </li>
                      </>
                    )}
                    
                    {user?.role === 'mentor' && (
                      <li>
                        <Link className="dropdown-item" to="/mentor/dashboard">
                          <i className="bi bi-people me-2"></i>
                          My Students
                        </Link>
                      </li>
                    )}
                    
                    {user?.role === 'admin' && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/admin/dashboard">
                            <i className="bi bi-shield-check me-2"></i>
                            Admin Panel
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/scholarships">
                            <i className="bi bi-award me-2"></i>
                            View Scholarships
                          </Link>
                        </li>
                      </>
                    )}
                    
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
////////down 2/2/26 ///////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Navbar.css';

// function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   // Generate user avatar URL
//   const getAvatarUrl = () => {
//     if (!user) return '';
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FF6B35&color=fff&size=40`;
//   };

//   // Get dashboard link based on role
//   const getDashboardLink = () => {
//     if (!user) return '/dashboard';
//     if (user.role === 'admin') return '/admin/dashboard';
//     if (user.role === 'mentor') return '/mentor/dashboard';
//     return '/dashboard';
//   };

//   return (
//     <nav className={`navbar navbar-expand-lg navbar-light sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
//       <div className="container">
//         {/* Brand/Logo */}
//         <Link className="navbar-brand" to="/">
//           <div className="brand-wrapper">
//             <span className="brand-icon">🎓</span>
//             <span className="brand-text">ScholarNest</span>
//           </div>
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
//           <ul className="navbar-nav ms-auto align-items-lg-center">
//             <li className="nav-item">
//               <NavLink 
//                 className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                 to="/"
//               >
//                 <i className="bi bi-house-door me-1"></i>
//                 Home
//               </NavLink>
//             </li>
            
//             {/* Show different links based on role */}
//             {user?.role !== 'admin' && (
//               <>
//                 <li className="nav-item">
//                   <NavLink 
//                     className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                     to="/scholarships"
//                   >
//                     <i className="bi bi-award me-1"></i>
//                     Scholarships
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink 
//                     className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                     to="/mentors"
//                   >
//                     <i className="bi bi-people me-1"></i>
//                     Mentors
//                   </NavLink>
//                 </li>
//               </>
//             )}
            
//             {/* Dashboard Link - Show only when logged in */}
//             {isAuthenticated && (
//               <li className="nav-item">
//                 <NavLink 
//                   className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                   to={getDashboardLink()}
//                 >
//                   <i className="bi bi-speedometer2 me-1"></i>
//                   Dashboard
//                 </NavLink>
//               </li>
//             )}
            
//             {/* Divider */}
//             <li className="nav-item d-none d-lg-block">
//               <span className="nav-divider"></span>
//             </li>
            
//             {/* Auth Buttons */}
//             {!isAuthenticated ? (
//               <>
//                 <li className="nav-item me-2 mb-2 mb-lg-0">
//                   <Link className="btn btn-nav-login" to="/login">
//                     <i className="bi bi-box-arrow-in-right me-1"></i>
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item mb-2 mb-lg-0">
//                   <Link className="btn btn-nav-register" to="/register">
//                     <i className="bi bi-person-plus me-1"></i>
//                     Register
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item dropdown">
//                 <a 
//                   className="nav-link dropdown-toggle user-dropdown" 
//                   href="#" 
//                   id="navbarDropdown" 
//                   role="button" 
//                   data-bs-toggle="dropdown" 
//                   aria-expanded="false"
//                 >
//                   <img 
//                     src={getAvatarUrl()} 
//                     alt="User" 
//                     className="user-avatar"
//                   />
//                   <span className="ms-2">{user?.name}</span>
//                   {user?.role !== 'student' && (
//                     <span className="role-badge">{user?.role}</span>
//                   )}
//                 </a>
//                 <ul className="dropdown-menu dropdown-menu-end user-dropdown-menu" aria-labelledby="navbarDropdown">
//                   <li>
//                     <Link className="dropdown-item" to={getDashboardLink()}>
//                       <i className="bi bi-speedometer2 me-2"></i>
//                       Dashboard
//                     </Link>
//                   </li>
                  
//                   {/* Student-specific menu items */}
//                   {user?.role === 'student' && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to="/profile">
//                           <i className="bi bi-person me-2"></i>
//                           My Profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item" to="/applications">
//                           <i className="bi bi-file-text me-2"></i>
//                           My Applications
//                         </Link>
//                       </li>
//                     </>
//                   )}
                  
//                   {/* Mentor-specific menu items */}
//                   {user?.role === 'mentor' && (
//                     <li>
//                       <Link className="dropdown-item" to="/mentor/dashboard">
//                         <i className="bi bi-people me-2"></i>
//                         My Students
//                       </Link>
//                     </li>
//                   )}
                  
//                   {/* Admin-specific menu items */}
//                   {user?.role === 'admin' && (
//                     <>
//                       <li>
//                         <Link className="dropdown-item" to="/admin/dashboard">
//                           <i className="bi bi-shield-check me-2"></i>
//                           Admin Panel
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item" to="/scholarships">
//                           <i className="bi bi-award me-2"></i>
//                           View Scholarships
//                         </Link>
//                       </li>
//                     </>
//                   )}
                  
//                   <li><hr className="dropdown-divider" /></li>
//                   <li>
//                     <button className="dropdown-item text-danger" onClick={handleLogout}>
//                       <i className="bi bi-box-arrow-right me-2"></i>
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import NotificationBell from './NotificationBell';
// import './Navbar.css';

// function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getAvatarUrl = () => {
//     if (!user) return '';
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FF6B35&color=fff&size=40`;
//   };

//   const getDashboardLink = () => {
//     if (!user) return '/dashboard';
//     if (user.role === 'admin') return '/admin/dashboard';
//     if (user.role === 'mentor') return '/mentor/dashboard';
//     return '/dashboard';
//   };

//   return (
//     <nav className={`navbar navbar-expand-lg navbar-light sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           <div className="brand-wrapper">
//             <span className="brand-icon">🎓</span>
//             <span className="brand-text">ScholarNest</span>
//           </div>
//         </Link>
        
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
        
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-lg-center">
//             <li className="nav-item">
//               <NavLink 
//                 className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                 to="/"
//               >
//                 <i className="bi bi-house-door me-1"></i>
//                 Home
//               </NavLink>
//             </li>
            
//             {user?.role !== 'admin' && (
//               <>
//                 <li className="nav-item">
//                   <NavLink 
//                     className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                     to="/scholarships"
//                   >
//                     <i className="bi bi-award me-1"></i>
//                     Scholarships
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink 
//                     className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                     to="/mentors"
//                   >
//                     <i className="bi bi-people me-1"></i>
//                     Mentors
//                   </NavLink>
//                 </li>
//               </>
//             )}
            
//             {isAuthenticated && (
//               <li className="nav-item">
//                 <NavLink 
//                   className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
//                   to={getDashboardLink()}
//                 >
//                   <i className="bi bi-speedometer2 me-1"></i>
//                   Dashboard
//                 </NavLink>
//               </li>
//             )}
            
//             <li className="nav-item d-none d-lg-block">
//               <span className="nav-divider"></span>
//             </li>
            
//             {!isAuthenticated ? (
//               <>
//                 <li className="nav-item me-2 mb-2 mb-lg-0">
//                   <Link className="btn btn-nav-login" to="/login">
//                     <i className="bi bi-box-arrow-in-right me-1"></i>
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item mb-2 mb-lg-0">
//                   <Link className="btn btn-nav-register" to="/register">
//                     <i className="bi bi-person-plus me-1"></i>
//                     Register
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 {/* NEW - Notification Bell */}
//                 <li className="nav-item me-3">
//                   <NotificationBell />
//                 </li>

//                 <li className="nav-item dropdown">
//                   <a 
//                     className="nav-link dropdown-toggle user-dropdown" 
//                     href="#" 
//                     id="navbarDropdown" 
//                     role="button" 
//                     data-bs-toggle="dropdown" 
//                     aria-expanded="false"
//                   >
//                     <img 
//                       src={getAvatarUrl()} 
//                       alt="User" 
//                       className="user-avatar"
//                     />
//                     <span className="ms-2">{user?.name}</span>
//                     {user?.role !== 'student' && (
//                       <span className="role-badge">{user?.role}</span>
//                     )}
//                   </a>
//                   <ul className="dropdown-menu dropdown-menu-end user-dropdown-menu" aria-labelledby="navbarDropdown">
//                     <li>
//                       <Link className="dropdown-item" to={getDashboardLink()}>
//                         <i className="bi bi-speedometer2 me-2"></i>
//                         Dashboard
//                       </Link>
//                     </li>
                    
//                     {user?.role === 'student' && (
//                       <>
//                         <li>
//                           <Link className="dropdown-item" to="/profile">
//                             <i className="bi bi-person me-2"></i>
//                             My Profile
//                           </Link>
//                         </li>
//                         <li>
//                           <Link className="dropdown-item" to="/applications">
//                             <i className="bi bi-file-text me-2"></i>
//                             My Applications
//                           </Link>
//                         </li>
//                       </>
//                     )}
                    
//                     {user?.role === 'mentor' && (
//                       <li>
//                         <Link className="dropdown-item" to="/mentor/dashboard">
//                           <i className="bi bi-people me-2"></i>
//                           My Students
//                         </Link>
//                       </li>
//                     )}
                    
//                     {user?.role === 'admin' && (
//                       <>
//                         <li>
//                           <Link className="dropdown-item" to="/admin/dashboard">
//                             <i className="bi bi-shield-check me-2"></i>
//                             Admin Panel
//                           </Link>
//                         </li>
//                         <li>
//                           <Link className="dropdown-item" to="/scholarships">
//                             <i className="bi bi-award me-2"></i>
//                             View Scholarships
//                           </Link>
//                         </li>
//                       </>
//                     )}
                    
//                     <li><hr className="dropdown-divider" /></li>
//                     <li>
//                       <button className="dropdown-item text-danger" onClick={handleLogout}>
//                         <i className="bi bi-box-arrow-right me-2"></i>
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;