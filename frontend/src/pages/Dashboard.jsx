// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Dashboard.css'; // Import the specific CSS for the dashboard

// // Dummy data for demonstration
// const studentProfile = {
//   name: "Uday ",
//   email: "demo@example.com",
//   major: "Computer Engineering",
//   gpa: 3.8,
//   appliedCount: 3,
//   mentorsCount: 1,
// };

// const appliedScholarships = [
//   { id: 1, name: "MahaDBT", status: "Pending", appliedOn: "2024-10-15" },
//   { id: 2, name: "Mahajyoti", status: "In Review", appliedOn: "2024-10-10" },
//   { id: 3, name: "Dyanjyoti", status: "Accepted", appliedOn: "2024-09-28" },
// ];

// const mentorConnections = [
//   { id: 1, name: "Mr. Mentor", expertise: "Scholarship Co-ordinatior" },
// ];

// function Dashboard() {
//   return (
//     <div className="container py-5">
//       <h1 className="fw-bold mb-4">Welcome, {studentProfile.name}!</h1>
      
//       <div className="row g-4">
//         {/* Left Column: Profile & Mentors */}
//         <div className="col-lg-4">
//           {/* Profile Summary Card */}
//           <div className="card dashboard-card shadow-sm mb-4">
//             <div className="card-body">
//               <h5 className="card-title fw-bold text-primary mb-3">My Profile</h5>
//               <ul className="list-unstyled">
//                 <li><strong>Email:</strong> {studentProfile.email}</li>
//                 <li><strong>Major:</strong> {studentProfile.major}</li>
//                 <li><strong>GPA:</strong> {studentProfile.gpa}</li>
//               </ul>
//               <Link to="/profile" className="btn btn-outline-primary btn-sm mt-2">
//                 Edit Profile
//               </Link>
//             </div>
//           </div>

//           {/* Mentor Connections Card */}
//           <div className="card dashboard-card shadow-sm">
//             <div className="card-body">
//               <h5 className="card-title fw-bold text-primary mb-3">My Mentors ({mentorConnections.length})</h5>
//               {mentorConnections.length > 0 ? (
//                 <ul className="list-group list-group-flush">
//                   {mentorConnections.map(mentor => (
//                     <li key={mentor.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
//                       <div>
//                         <h6 className="mb-0">{mentor.name}</h6>
//                         <small className="text-muted">{mentor.expertise}</small>
//                       </div>
//                       <Link to={`/mentor/${mentor.id}`} className="btn btn-sm btn-outline-secondary">
//                         Chat
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-muted">You haven't connected with any mentors yet.</p>
//               )}
//               <Link to="/mentors" className="btn btn-primary btn-sm mt-3">
//                 Find Mentors
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Applied Scholarships */}
//         <div className="col-lg-8">
//           <div className="card dashboard-card shadow-sm">
//             <div className="card-body">
//               <h5 className="card-title fw-bold text-primary mb-3">My Applied Scholarships ({appliedScholarships.length})</h5>
//               {appliedScholarships.length > 0 ? (
//                 <div className="table-responsive">
//                   <table className="table table-hover align-middle">
//                     <thead>
//                       <tr>
//                         <th scope="col">Scholarship Name</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Applied On</th>
//                         <th scope="col">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {appliedScholarships.map(app => (
//                         <tr key={app.id}>
//                           <td>{app.name}</td>
//                           <td>
//                             <span className={`badge ${
//                               app.status === 'Accepted' ? 'bg-success' :
//                               app.status === 'Pending' ? 'bg-warning text-dark' :
//                               'bg-info'
//                             }`}>
//                               {app.status}
//                             </span>
//                           </td>
//                           <td>{app.appliedOn}</td>
//                           <td>
//                             <Link to={`/scholarships/${app.id}`} className="btn btn-sm btn-outline-secondary">
//                               View
//                             </Link>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="text-center p-4">
//                   <p className="lead text-muted">You haven't applied for any scholarships yet.</p>
//                   <Link to="/scholarships" className="btn btn-primary">
//                     Find Scholarships
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

//////////////////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////
/////////////below latest comment/////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////
// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import './Dashboard.css';

// function Dashboard() {
//   const { user } = useAuth();

//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-hero">
//         <div className="container">
//           <h1 className="dashboard-title">
//             Welcome back, <span className="highlight">{user?.name}!</span>
//           </h1>
//           <p className="dashboard-subtitle">
//             {user?.role === 'student' 
//               ? 'Track your scholarship applications and discover new opportunities' 
//               : 'Manage your mentorship sessions and guide students'}
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         <div className="row">
//           <div className="col-md-4 mb-4">
//             <div className="dashboard-card">
//               <div className="card-icon">
//                 <i className="bi bi-award-fill"></i>
//               </div>
//               <h3>Scholarships Applied</h3>
//               <p className="card-value">0</p>
//               <p className="card-description">Track your applications</p>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="dashboard-card">
//               <div className="card-icon">
//                 <i className="bi bi-people-fill"></i>
//               </div>
//               <h3>Mentor Connections</h3>
//               <p className="card-value">0</p>
//               <p className="card-description">Connect with mentors</p>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="dashboard-card">
//               <div className="card-icon">
//                 <i className="bi bi-check-circle-fill"></i>
//               </div>
//               <h3>Profile Completion</h3>
//               <p className="card-value">20%</p>
//               <p className="card-description">Complete your profile</p>
//             </div>
//           </div>
//         </div>

//         <div className="alert alert-info mt-4">
//           <i className="bi bi-info-circle-fill me-2"></i>
//           <strong>Complete your profile to apply for scholarships!</strong>
//           <p className="mb-0 mt-2">
//             Add your academic details, category, income, and other information to get personalized scholarship recommendations.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



//////////////////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////
/////////////dashboard 14/11/25 below/////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './Dashboard.css';

// function Dashboard() {
//   const { user } = useAuth();
//   const [profileStatus, setProfileStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfileStatus();
//   }, []);

//   const fetchProfileStatus = async () => {
//     try {
//       const response = await api.get('/profile/status');
//       setProfileStatus(response.data.data);
//     } catch (err) {
//       console.error('Fetch status error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getProfileCompletionPercentage = () => {
//     if (!profileStatus) return 0;
//     return profileStatus.profile_completed ? 100 : 20;
//   };

//   return (
//     <div className="dashboard-page">
//       <div className="dashboard-hero">
//         <div className="container">
//           <h1 className="dashboard-title">
//             Welcome back, <span className="highlight">{user?.name}!</span>
//           </h1>
//           <p className="dashboard-subtitle">
//             {user?.role === 'student' 
//               ? 'Track your scholarship applications and discover new opportunities' 
//               : 'Manage your mentorship sessions and guide students'}
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Profile Completion Alert */}
//         {!loading && !profileStatus?.profile_completed && (
//           <div className="alert alert-warning mb-4">
//             <div className="d-flex align-items-start">
//               <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '1.5rem' }}></i>
//               <div className="flex-grow-1">
//                 <h5 className="alert-heading mb-2">
//                   <strong>Complete Your Profile to Apply!</strong>
//                 </h5>
//                 <p className="mb-2">
//                   You need to complete your profile before you can apply for scholarships. 
//                   This information helps us match you with the best opportunities.
//                 </p>
//                 <Link to="/profile" className="btn btn-warning">
//                   <i className="bi bi-person-plus-fill me-2"></i>
//                   Complete Profile Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Success Message if Profile Complete */}
//         {!loading && profileStatus?.profile_completed && (
//           <div className="alert alert-success mb-4">
//             <i className="bi bi-check-circle-fill me-2"></i>
//             <strong>Profile Complete!</strong> You can now apply for scholarships.
//           </div>
//         )}

//         {/* Dashboard Cards */}
//         <div className="row">
//           <div className="col-md-4 mb-4">
//             <div className="dashboard-card">
//               <div className="card-icon">
//                 <i className="bi bi-award-fill"></i>
//               </div>
//               <h3>Scholarships Applied</h3>
//               <p className="card-value">0</p>
//               <p className="card-description">Track your applications</p>
//               <Link to="/applications" className="card-link">
//                 View Applications <i className="bi bi-arrow-right"></i>
//               </Link>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="dashboard-card">
//               <div className="card-icon">
//                 <i className="bi bi-people-fill"></i>
//               </div>
//               <h3>Mentor Connections</h3>
//               <p className="card-value">0</p>
//               <p className="card-description">Connect with mentors</p>
//               <Link to="/mentors" className="card-link">
//                 Find Mentors <i className="bi bi-arrow-right"></i>
//               </Link>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="dashboard-card">
//               <div className="card-icon">
//                 <i className="bi bi-check-circle-fill"></i>
//               </div>
//               <h3>Profile Completion</h3>
//               <p className="card-value">{getProfileCompletionPercentage()}%</p>
//               <p className="card-description">
//                 {profileStatus?.profile_completed ? 'Profile Complete' : 'Complete your profile'}
//               </p>
//               <div className="progress mt-3 mb-3" style={{ height: '10px' }}>
//                 <div 
//                   className="progress-bar bg-success" 
//                   role="progressbar" 
//                   style={{ width: `${getProfileCompletionPercentage()}%` }}
//                   aria-valuenow={getProfileCompletionPercentage()}
//                   aria-valuemin="0" 
//                   aria-valuemax="100"
//                 ></div>
//               </div>
//               <Link to="/profile" className="card-link">
//                 {profileStatus?.profile_completed ? 'Update Profile' : 'Complete Profile'} 
//                 <i className="bi bi-arrow-right"></i>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="quick-actions mt-4">
//           <h3 className="mb-4">
//             <i className="bi bi-lightning-fill me-2"></i>
//             Quick Actions
//           </h3>
//           <div className="row">
//             <div className="col-md-3 mb-3">
//               <Link to="/scholarships" className="action-card">
//                 <i className="bi bi-search"></i>
//                 <span>Browse Scholarships</span>
//               </Link>
//             </div>
//             <div className="col-md-3 mb-3">
//               <Link to="/profile" className="action-card">
//                 <i className="bi bi-person-gear"></i>
//                 <span>Update Profile</span>
//               </Link>
//             </div>
//             <div className="col-md-3 mb-3">
//               <Link to="/applications" className="action-card">
//                 <i className="bi bi-file-earmark-check"></i>
//                 <span>My Applications</span>
//               </Link>
//             </div>
//             <div className="col-md-3 mb-3">
//               <Link to="/mentors" className="action-card">
//                 <i className="bi bi-chat-dots"></i>
//                 <span>Find Mentors</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [profileStatus, setProfileStatus] = useState(null);
  const [applicationStats, setApplicationStats] = useState(null); // 👈 NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileStatus();
    fetchApplicationStats(); // 👈 NEW
  }, []);

  const fetchProfileStatus = async () => {
    try {
      const response = await api.get('/profile/status');
      setProfileStatus(response.data.data);
    } catch (err) {
      console.error('Fetch status error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 👇 NEW FUNCTION
  const fetchApplicationStats = async () => {
    try {
      const response = await api.get('/applications');
      setApplicationStats(response.data.data.stats);
    } catch (err) {
      console.error('Fetch application stats error:', err);
    }
  };

  const getProfileCompletionPercentage = () => {
    if (!profileStatus) return 0;
    return profileStatus.profile_completed ? 100 : 20;
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div className="container">
          <h1 className="dashboard-title">
            Welcome back, <span className="highlight">{user?.name}!</span>
          </h1>
          <p className="dashboard-subtitle">
            {user?.role === 'student' 
              ? 'Track your scholarship applications and discover new opportunities' 
              : 'Manage your mentorship sessions and guide students'}
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Profile Completion Alert */}
        {!loading && !profileStatus?.profile_completed && (
          <div className="alert alert-warning mb-4">
            <div className="d-flex align-items-start">
              <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '1.5rem' }}></i>
              <div className="flex-grow-1">
                <h5 className="alert-heading mb-2">
                  <strong>Complete Your Profile to Apply!</strong>
                </h5>
                <p className="mb-2">
                  You need to complete your profile before you can apply for scholarships. 
                  This information helps us match you with the best opportunities.
                </p>
                <Link to="/profile" className="btn btn-warning">
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Complete Profile Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Success Message if Profile Complete */}
        {!loading && profileStatus?.profile_completed && (
          <div className="alert alert-success mb-4">
            <i className="bi bi-check-circle-fill me-2"></i>
            <strong>Profile Complete!</strong> You can now apply for scholarships.
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="dashboard-card">
              <div className="card-icon">
                <i className="bi bi-award-fill"></i>
              </div>
              <h3>Scholarships Applied</h3>
              <p className="card-value">{applicationStats?.total || 0}</p> {/* 👈 UPDATED */}
              <p className="card-description">Track your applications</p>
              <Link to="/applications" className="card-link">
                View Applications <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="dashboard-card">
              <div className="card-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <h3>Mentor Connections</h3>
              <p className="card-value">0</p>
              <p className="card-description">Connect with mentors</p>
              <Link to="/mentors" className="card-link">
                Find Mentors <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="dashboard-card">
              <div className="card-icon">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h3>Profile Completion</h3>
              <p className="card-value">{getProfileCompletionPercentage()}%</p>
              <p className="card-description">
                {profileStatus?.profile_completed ? 'Profile Complete' : 'Complete your profile'}
              </p>
              <div className="progress mt-3 mb-3" style={{ height: '10px' }}>
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ width: `${getProfileCompletionPercentage()}%` }}
                  aria-valuenow={getProfileCompletionPercentage()}
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
              <Link to="/profile" className="card-link">
                {profileStatus?.profile_completed ? 'Update Profile' : 'Complete Profile'} 
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions mt-4">
          <h3 className="mb-4">
            <i className="bi bi-lightning-fill me-2"></i>
            Quick Actions
          </h3>
          <div className="row">
            <div className="col-md-3 mb-3">
              <Link to="/scholarships" className="action-card">
                <i className="bi bi-search"></i>
                <span>Browse Scholarships</span>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/profile" className="action-card">
                <i className="bi bi-person-gear"></i>
                <span>Update Profile</span>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/applications" className="action-card">
                <i className="bi bi-file-earmark-check"></i>
                <span>My Applications</span>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/mentors" className="action-card">
                <i className="bi bi-chat-dots"></i>
                <span>Find Mentors</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;