
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './MentorDashboard.css';

// function MentorDashboard() {
//   const { user } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [profileStatus, setProfileStatus] = useState(null); // NEW
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchProfileStatus(); // NEW
//     fetchRequests();
//   }, []);

//   // NEW FUNCTION
//   const fetchProfileStatus = async () => {
//     try {
//       const response = await api.get('/mentors/profile/status');
//       setProfileStatus(response.data.data);
//     } catch (err) {
//       console.error('Fetch profile status error:', err);
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const response = await api.get('/mentors/my-requests');
//       setRequests(response.data.data);
//     } catch (err) {
//       console.error('Fetch requests error:', err);
//       setError('Failed to load requests');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateRequest = async (requestId, status) => {
//     try {
//       await api.put(`/mentors/requests/${requestId}`, { status });
//       alert(`Request ${status} successfully!`);
//       fetchRequests();
//     } catch (err) {
//       alert('Failed to update request');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       pending: { class: 'badge-warning', text: 'Pending' },
//       accepted: { class: 'badge-success', text: 'Accepted' },
//       rejected: { class: 'badge-danger', text: 'Rejected' }
//     };
//     return badges[status] || badges.pending;
//   };

//   const pendingRequests = requests.filter(r => r.status === 'pending');
//   const acceptedRequests = requests.filter(r => r.status === 'accepted');

//   return (
//     <div className="mentor-dashboard-page">
//       <div className="dashboard-hero">
//         <div className="container">
//           <h1 className="dashboard-title">
//             Mentor Dashboard
//           </h1>
//           <p className="dashboard-subtitle">
//             Welcome back, {user?.name}! Manage your mentorship requests and connections.
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Profile Completion Alert - NEW */}
//         {profileStatus && !profileStatus.profile_completed && (
//           <div className="alert alert-warning mb-4">
//             <div className="d-flex align-items-start">
//               <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '1.5rem' }}></i>
//               <div className="flex-grow-1">
//                 <h5 className="alert-heading mb-2">
//                   <strong>Complete Your Profile!</strong>
//                 </h5>
//                 <p className="mb-2">
//                   Fill in your expertise, experience, and bio to get verified by admin and start receiving student requests.
//                 </p>
//                 <Link to="/mentor/profile" className="btn btn-warning">
//                   <i className="bi bi-person-plus-fill me-2"></i>
//                   Complete Profile Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Verification Status Alert - NEW */}
//         {profileStatus && profileStatus.profile_completed && !profileStatus.verified && (
//           <div className="alert alert-info mb-4">
//             <i className="bi bi-clock-history me-2"></i>
//             <strong>Verification Pending:</strong> Your profile is complete and awaiting admin verification. You'll be notified once approved.
//           </div>
//         )}

//         {/* Success Alert - NEW */}
//         {profileStatus && profileStatus.profile_completed && profileStatus.verified && (
//           <div className="alert alert-success mb-4">
//             <i className="bi bi-check-circle-fill me-2"></i>
//             <strong>Profile Verified!</strong> You're all set to receive student requests.
//           </div>
//         )}

//         {/* Statistics */}
//         <div className="row mb-4">
//           <div className="col-md-4 mb-3">
//             <div className="stat-card">
//               <i className="bi bi-clock-history"></i>
//               <div>
//                 <h3>{pendingRequests.length}</h3>
//                 <p>Pending Requests</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-3">
//             <div className="stat-card">
//               <i className="bi bi-check-circle"></i>
//               <div>
//                 <h3>{acceptedRequests.length}</h3>
//                 <p>Active Students</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-3">
//             <div className="stat-card">
//               <i className="bi bi-award"></i>
//               <div>
//                 <h3>{requests.length}</h3>
//                 <p>Total Requests</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Rest of the component stays the same... */}
//         {/* (Keep all your existing request handling code) */}

//         {/* Pending Requests */}
//         <div className="requests-section">
//           <h2 className="section-title">
//             <i className="bi bi-hourglass-split me-2"></i>
//             Pending Requests
//           </h2>

//           {loading && (
//             <div className="loading-container">
//               <div className="spinner-border text-primary"></div>
//               <p className="mt-3">Loading requests...</p>
//             </div>
//           )}

//           {error && (
//             <div className="alert alert-danger">
//               <i className="bi bi-exclamation-triangle-fill me-2"></i>
//               {error}
//             </div>
//           )}

//           {!loading && !error && pendingRequests.length === 0 && (
//             <div className="empty-state">
//               <i className="bi bi-inbox"></i>
//               <h3>No Pending Requests</h3>
//               <p>New mentorship requests will appear here</p>
//             </div>
//           )}

//           {!loading && !error && pendingRequests.length > 0 && (
//             <div className="requests-list">
//               {pendingRequests.map(request => (
//                 <div key={request.id} className="request-card">
//                   <div className="request-info">
//                     <div className="student-avatar">
//                       <img 
//                         src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.student_name)}&background=4A90E2&color=fff&size=60`}
//                         alt={request.student_name}
//                       />
//                     </div>
//                     <div>
//                       <h4>{request.student_name}</h4>
//                       <p className="student-email">{request.student_email}</p>
//                       {request.scholarship_title && (
//                         <p className="scholarship-info">
//                           <i className="bi bi-award me-2"></i>
//                           For: {request.scholarship_title}
//                         </p>
//                       )}
//                       <p className="request-date">
//                         <i className="bi bi-clock me-2"></i>
//                         Requested: {new Date(request.requested_at).toLocaleDateString('en-IN')}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="request-actions">
//                     <button 
//                       className="btn-accept"
//                       onClick={() => handleUpdateRequest(request.id, 'accepted')}
//                     >
//                       <i className="bi bi-check-lg me-2"></i>
//                       Accept
//                     </button>
//                     <button 
//                       className="btn-reject"
//                       onClick={() => handleUpdateRequest(request.id, 'rejected')}
//                     >
//                       <i className="bi bi-x-lg me-2"></i>
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Active Students */}
//         {acceptedRequests.length > 0 && (
//           <div className="requests-section mt-5">
//             <h2 className="section-title">
//               <i className="bi bi-people me-2"></i>
//               Active Students ({acceptedRequests.length})
//             </h2>

//             <div className="students-grid">
//               {acceptedRequests.map(request => (
//                 <div key={request.id} className="student-card">
//                   <div className="student-avatar-large">
//                     <img 
//                       src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.student_name)}&background=28a745&color=fff&size=80`}
//                       alt={request.student_name}
//                     />
//                   </div>
//                   <h4>{request.student_name}</h4>
//                   <p className="student-email">{request.student_email}</p>
//                   {request.scholarship_title && (
//                     <p className="scholarship-badge">{request.scholarship_title}</p>
//                   )}
//                   <button className="btn-chat">
//                     <i className="bi bi-chat-dots me-2"></i>
//                     Start Chat
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MentorDashboard;




//////////////////////
//////////////////////

//////////////////////

///////////////new below ///////

////////////////////////////////////////////
//////////////////////

//////////////////////

//////////////////////

//////////////////////

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ChatBox from '../components/ChatBox';
import './MentorDashboard.css';

function MentorDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [profileStatus, setProfileStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Chat state
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchProfileStatus();
    fetchRequests();
  }, []);

  const fetchProfileStatus = async () => {
    try {
      const response = await api.get('/mentors/profile/status');
      setProfileStatus(response.data.data);
    } catch (err) {
      console.error('Fetch profile status error:', err);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await api.get('/mentors/my-requests');
      setRequests(response.data.data);
    } catch (err) {
      console.error('Fetch requests error:', err);
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequest = async (requestId, status) => {
    try {
      await api.put(`/mentors/requests/${requestId}`, { status });
      alert(`Request ${status} successfully!`);
      fetchRequests();
    } catch (err) {
      alert('Failed to update request');
    }
  };

  const handleOpenChat = (request) => {
    setSelectedChat({
      mentorshipId: request.id,
      otherUser: {
        name: request.student_name,
        email: request.student_email,
        role: 'student'
      }
    });
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedChat(null);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-warning', text: 'Pending' },
      accepted: { class: 'badge-success', text: 'Accepted' },
      rejected: { class: 'badge-danger', text: 'Rejected' }
    };
    return badges[status] || badges.pending;
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted');

  return (
    <div className="mentor-dashboard-page">
      <div className="dashboard-hero">
        <div className="container">
          <h1 className="dashboard-title">
            Mentor Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Welcome back, {user?.name}! Manage your mentorship requests and connections.
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Profile Completion Alert */}
        {profileStatus && !profileStatus.profile_completed && (
          <div className="alert alert-warning mb-4">
            <div className="d-flex align-items-start">
              <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '1.5rem' }}></i>
              <div className="flex-grow-1">
                <h5 className="alert-heading mb-2">
                  <strong>Complete Your Profile!</strong>
                </h5>
                <p className="mb-2">
                  Fill in your expertise, experience, and bio to get verified by admin and start receiving student requests.
                </p>
                <Link to="/mentor/profile" className="btn btn-warning">
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Complete Profile Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Verification Status Alert */}
        {profileStatus && profileStatus.profile_completed && !profileStatus.verified && (
          <div className="alert alert-info mb-4">
            <i className="bi bi-clock-history me-2"></i>
            <strong>Verification Pending:</strong> Your profile is complete and awaiting admin verification. You'll be notified once approved.
          </div>
        )}

        {/* Success Alert */}
        {profileStatus && profileStatus.profile_completed && profileStatus.verified && (
          <div className="alert alert-success mb-4">
            <i className="bi bi-check-circle-fill me-2"></i>
            <strong>Profile Verified!</strong> You're all set to receive student requests.
          </div>
        )}

        {/* Statistics */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="stat-card">
              <i className="bi bi-clock-history"></i>
              <div>
                <h3>{pendingRequests.length}</h3>
                <p>Pending Requests</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="stat-card">
              <i className="bi bi-check-circle"></i>
              <div>
                <h3>{acceptedRequests.length}</h3>
                <p>Active Students</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="stat-card">
              <i className="bi bi-award"></i>
              <div>
                <h3>{requests.length}</h3>
                <p>Total Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="requests-section">
          <h2 className="section-title">
            <i className="bi bi-hourglass-split me-2"></i>
            Pending Requests
          </h2>

          {loading && (
            <div className="loading-container">
              <div className="spinner-border text-primary"></div>
              <p className="mt-3">Loading requests...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {!loading && !error && pendingRequests.length === 0 && (
            <div className="empty-state">
              <i className="bi bi-inbox"></i>
              <h3>No Pending Requests</h3>
              <p>New mentorship requests will appear here</p>
            </div>
          )}

          {!loading && !error && pendingRequests.length > 0 && (
            <div className="requests-list">
              {pendingRequests.map(request => (
                <div key={request.id} className="request-card">
                  <div className="request-info">
                    <div className="student-avatar">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.student_name)}&background=4A90E2&color=fff&size=60`}
                        alt={request.student_name}
                      />
                    </div>
                    <div>
                      <h4>{request.student_name}</h4>
                      <p className="student-email">{request.student_email}</p>
                      {request.scholarship_title && (
                        <p className="scholarship-info">
                          <i className="bi bi-award me-2"></i>
                          For: {request.scholarship_title}
                        </p>
                      )}
                      <p className="request-date">
                        <i className="bi bi-clock me-2"></i>
                        Requested: {new Date(request.requested_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button 
                      className="btn-accept"
                      onClick={() => handleUpdateRequest(request.id, 'accepted')}
                    >
                      <i className="bi bi-check-lg me-2"></i>
                      Accept
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => handleUpdateRequest(request.id, 'rejected')}
                    >
                      <i className="bi bi-x-lg me-2"></i>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Students */}
        {acceptedRequests.length > 0 && (
          <div className="requests-section mt-5">
            <h2 className="section-title">
              <i className="bi bi-people me-2"></i>
              Active Students ({acceptedRequests.length})
            </h2>

            <div className="students-grid">
              {acceptedRequests.map(request => (
                <div key={request.id} className="student-card">
                  <div className="student-avatar-large">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.student_name)}&background=28a745&color=fff&size=80`}
                      alt={request.student_name}
                    />
                  </div>
                  <h4>{request.student_name}</h4>
                  <p className="student-email">{request.student_email}</p>
                  {request.scholarship_title && (
                    <p className="scholarship-badge">{request.scholarship_title}</p>
                  )}
                  <button 
                    className="btn-chat"
                    onClick={() => handleOpenChat(request)}
                  >
                    <i className="bi bi-chat-dots me-2"></i>
                    Start Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {showChat && selectedChat && (
        <div className="chat-overlay" onClick={handleCloseChat}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            <ChatBox 
              mentorshipId={selectedChat.mentorshipId}
              otherUser={selectedChat.otherUser}
              onClose={handleCloseChat}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MentorDashboard;

//////////////////////
//////////////////////

//////////////////////

//////////////////////

/////////////////new up ///////////////////////////
//////////////////////

//////////////////////

//////////////////////

//////////////////////
//////////////////////
//////////////////////

//////////////////////

//////////////////////

////////////////////////////////////////////
//////////////////////

//////////////////////

//////////////////////

//////////////////////

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './MentorDashboard.css';

// function MentorDashboard() {
//   const { user } = useAuth();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const response = await api.get('/mentors/my-requests');
//       setRequests(response.data.data);
//     } catch (err) {
//       console.error('Fetch requests error:', err);
//       setError('Failed to load requests');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateRequest = async (requestId, status) => {
//     try {
//       await api.put(`/mentors/requests/${requestId}`, { status });
//       alert(`Request ${status} successfully!`);
//       fetchRequests(); // Refresh list
//     } catch (err) {
//       alert('Failed to update request');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       pending: { class: 'badge-warning', text: 'Pending' },
//       accepted: { class: 'badge-success', text: 'Accepted' },
//       rejected: { class: 'badge-danger', text: 'Rejected' }
//     };
//     return badges[status] || badges.pending;
//   };

//   const pendingRequests = requests.filter(r => r.status === 'pending');
//   const acceptedRequests = requests.filter(r => r.status === 'accepted');

//   return (
//     <div className="mentor-dashboard-page">
//       <div className="dashboard-hero">
//         <div className="container">
//           <h1 className="dashboard-title">
//             Mentor Dashboard
//           </h1>
//           <p className="dashboard-subtitle">
//             Welcome back, {user?.name}! Manage your mentorship requests and connections.
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Statistics */}
//         <div className="row mb-4">
//           <div className="col-md-4 mb-3">
//             <div className="stat-card">
//               <i className="bi bi-clock-history"></i>
//               <div>
//                 <h3>{pendingRequests.length}</h3>
//                 <p>Pending Requests</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-3">
//             <div className="stat-card">
//               <i className="bi bi-check-circle"></i>
//               <div>
//                 <h3>{acceptedRequests.length}</h3>
//                 <p>Active Students</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-3">
//             <div className="stat-card">
//               <i className="bi bi-award"></i>
//               <div>
//                 <h3>{requests.length}</h3>
//                 <p>Total Requests</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pending Requests */}
//         <div className="requests-section">
//           <h2 className="section-title">
//             <i className="bi bi-hourglass-split me-2"></i>
//             Pending Requests
//           </h2>

//           {loading && (
//             <div className="loading-container">
//               <div className="spinner-border text-primary"></div>
//               <p className="mt-3">Loading requests...</p>
//             </div>
//           )}

//           {error && (
//             <div className="alert alert-danger">
//               <i className="bi bi-exclamation-triangle-fill me-2"></i>
//               {error}
//             </div>
//           )}

//           {!loading && !error && pendingRequests.length === 0 && (
//             <div className="empty-state">
//               <i className="bi bi-inbox"></i>
//               <h3>No Pending Requests</h3>
//               <p>New mentorship requests will appear here</p>
//             </div>
//           )}

//           {!loading && !error && pendingRequests.length > 0 && (
//             <div className="requests-list">
//               {pendingRequests.map(request => (
//                 <div key={request.id} className="request-card">
//                   <div className="request-info">
//                     <div className="student-avatar">
//                       <img 
//                         src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.student_name)}&background=4A90E2&color=fff&size=60`}
//                         alt={request.student_name}
//                       />
//                     </div>
//                     <div>
//                       <h4>{request.student_name}</h4>
//                       <p className="student-email">{request.student_email}</p>
//                       {request.scholarship_title && (
//                         <p className="scholarship-info">
//                           <i className="bi bi-award me-2"></i>
//                           For: {request.scholarship_title}
//                         </p>
//                       )}
//                       <p className="request-date">
//                         <i className="bi bi-clock me-2"></i>
//                         Requested: {new Date(request.requested_at).toLocaleDateString('en-IN')}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="request-actions">
//                     <button 
//                       className="btn-accept"
//                       onClick={() => handleUpdateRequest(request.id, 'accepted')}
//                     >
//                       <i className="bi bi-check-lg me-2"></i>
//                       Accept
//                     </button>
//                     <button 
//                       className="btn-reject"
//                       onClick={() => handleUpdateRequest(request.id, 'rejected')}
//                     >
//                       <i className="bi bi-x-lg me-2"></i>
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Active Students */}
//         {acceptedRequests.length > 0 && (
//           <div className="requests-section mt-5">
//             <h2 className="section-title">
//               <i className="bi bi-people me-2"></i>
//               Active Students ({acceptedRequests.length})
//             </h2>

//             <div className="students-grid">
//               {acceptedRequests.map(request => (
//                 <div key={request.id} className="student-card">
//                   <div className="student-avatar-large">
//                     <img 
//                       src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.student_name)}&background=28a745&color=fff&size=80`}
//                       alt={request.student_name}
//                     />
//                   </div>
//                   <h4>{request.student_name}</h4>
//                   <p className="student-email">{request.student_email}</p>
//                   {request.scholarship_title && (
//                     <p className="scholarship-badge">{request.scholarship_title}</p>
//                   )}
//                   <button className="btn-chat">
//                     <i className="bi bi-chat-dots me-2"></i>
//                     Start Chat
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MentorDashboard;