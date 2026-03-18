
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';
// import ChatBox from '../components/ChatBox'; // NEW - Import ChatBox
// import './Applications.css';

// function Applications() {
//   const [applications, setApplications] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // Filters (existing)
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('recent');

//   // NEW - Chat state
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [showChat, setShowChat] = useState(false);

//   // NEW - Mentorships state
//   const [mentorships, setMentorships] = useState([]);
//   const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'mentors'

//   useEffect(() => {
//     fetchApplications();
//     fetchMyMentorships(); // NEW - Fetch mentorships
//   }, [statusFilter, searchQuery, sortBy]);

//   const fetchApplications = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const params = {};
//       if (statusFilter !== 'all') params.status = statusFilter;
//       if (searchQuery) params.search = searchQuery;
//       if (sortBy) params.sort = sortBy;

//       const response = await api.get('/applications', { params });
//       setApplications(response.data.data.applications);
//       setStats(response.data.data.stats);
//     } catch (err) {
//       console.error('Fetch applications error:', err);
//       setError('Failed to load applications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // NEW - Fetch mentorships
//   const fetchMyMentorships = async () => {
//     try {
//       const response = await api.get('/mentors/my-requests');
//       // Filter only accepted mentorships
//       const accepted = response.data.data.filter(m => m.status === 'accepted');
//       setMentorships(accepted);
//     } catch (err) {
//       console.error('Fetch mentorships error:', err);
//     }
//   };

//   // NEW - Chat handlers
//   const handleOpenChat = (mentorship) => {
//     setSelectedChat({
//       mentorshipId: mentorship.id,
//       otherUser: {
//         name: mentorship.mentor_name,
//         email: mentorship.mentor_email,
//         role: 'mentor'
//       }
//     });
//     setShowChat(true);
//   };

//   const handleCloseChat = () => {
//     setShowChat(false);
//     setSelectedChat(null);
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       pending: { class: 'badge-warning', icon: 'bi-clock', text: 'Pending' },
//       applied: { class: 'badge-info', icon: 'bi-check-circle', text: 'Applied' },
//       won: { class: 'badge-success', icon: 'bi-trophy', text: 'Won' },
//       rejected: { class: 'badge-danger', icon: 'bi-x-circle', text: 'Rejected' }
//     };
//     return badges[status] || badges.pending;
//   };

//   const handleStatusUpdate = async (applicationId, newStatus) => {
//     try {
//       await api.put(`/applications/${applicationId}`, { status: newStatus });
//       fetchApplications();
//       alert('Status updated successfully!');
//     } catch (err) {
//       alert('Failed to update status');
//     }
//   };

//   const handleDelete = async (applicationId) => {
//     if (!window.confirm('Are you sure you want to delete this application?')) {
//       return;
//     }

//     try {
//       await api.delete(`/applications/${applicationId}`);
//       fetchApplications();
//       alert('Application deleted successfully!');
//     } catch (err) {
//       alert('Failed to delete application');
//     }
//   };

//   return (
//     <div className="applications-page">
//       <div className="applications-hero">
//         <div className="container">
//           <h1 className="page-title">
//             <i className="bi bi-file-earmark-text me-3"></i>
//             My Dashboard
//           </h1>
//           <p className="page-subtitle">
//             Track your scholarship applications and connect with mentors
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* NEW - Tabs */}
//         <div className="dashboard-tabs">
//           <button 
//             className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
//             onClick={() => setActiveTab('applications')}
//           >
//             <i className="bi bi-file-text me-2"></i>
//             Applications ({applications.length})
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`}
//             onClick={() => setActiveTab('mentors')}
//           >
//             <i className="bi bi-people me-2"></i>
//             My Mentors ({mentorships.length})
//           </button>
//         </div>

//         {/* APPLICATIONS TAB */}
//         {activeTab === 'applications' && (
//           <>
//             {/* Statistics Cards */}
//             {stats && (
//               <div className="row mb-4">
//                 <div className="col-md-3 mb-3">
//                   <div className="stat-card stat-total">
//                     <i className="bi bi-file-earmark-text"></i>
//                     <div>
//                       <h3>{stats.total}</h3>
//                       <p>Total Applications</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3 mb-3">
//                   <div className="stat-card stat-applied">
//                     <i className="bi bi-check-circle"></i>
//                     <div>
//                       <h3>{stats.applied}</h3>
//                       <p>Applied</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3 mb-3">
//                   <div className="stat-card stat-won">
//                     <i className="bi bi-trophy"></i>
//                     <div>
//                       <h3>{stats.won}</h3>
//                       <p>Won</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3 mb-3">
//                   <div className="stat-card stat-pending">
//                     <i className="bi bi-clock"></i>
//                     <div>
//                       <h3>{stats.pending}</h3>
//                       <p>Pending</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Filters & Search */}
//             <div className="filters-bar">
//               <div className="search-box">
//                 <i className="bi bi-search"></i>
//                 <input
//                   type="text"
//                   placeholder="Search applications..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               <select
//                 className="filter-select"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="applied">Applied</option>
//                 <option value="won">Won</option>
//                 <option value="rejected">Rejected</option>
//               </select>

//               <select
//                 className="filter-select"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="recent">Most Recent</option>
//                 <option value="deadline">By Deadline</option>
//                 <option value="amount">By Amount</option>
//               </select>
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <div className="loading-container">
//                 <div className="spinner-border text-primary"></div>
//                 <p className="mt-3">Loading applications...</p>
//               </div>
//             )}

//             {/* Error State */}
//             {error && (
//               <div className="alert alert-danger">
//                 <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                 {error}
//               </div>
//             )}

//             {/* Empty State */}
//             {!loading && !error && applications.length === 0 && (
//               <div className="empty-state">
//                 <i className="bi bi-inbox"></i>
//                 <h3>No Applications Yet</h3>
//                 <p>Start applying for scholarships to see them here</p>
//                 <Link to="/scholarships" className="btn btn-primary">
//                   <i className="bi bi-search me-2"></i>
//                   Browse Scholarships
//                 </Link>
//               </div>
//             )}

//             {/* Applications List */}
//             {!loading && !error && applications.length > 0 && (
//               <div className="applications-list">
//                 {applications.map((app) => {
//                   const badge = getStatusBadge(app.status);
//                   const daysRemaining = app.days_remaining;
                  
//                   return (
//                     <div key={app.id} className="application-card">
//                       <div className="application-header">
//                         <div>
//                           <h3 className="application-title">{app.title}</h3>
//                           <p className="application-provider">
//                             <i className="bi bi-building me-2"></i>
//                             {app.provider}
//                           </p>
//                         </div>
//                         <span className={`status-badge ${badge.class}`}>
//                           <i className={`bi ${badge.icon} me-1`}></i>
//                           {badge.text}
//                         </span>
//                       </div>

//                       <div className="application-details">
//                         <div className="detail-item">
//                           <i className="bi bi-currency-rupee"></i>
//                           <span>{app.amount}</span>
//                         </div>
//                         <div className="detail-item">
//                           <i className="bi bi-calendar-event"></i>
//                           <span>
//                             {new Date(app.deadline).toLocaleDateString('en-IN')}
//                             {daysRemaining !== null && daysRemaining >= 0 && (
//                               <span className="days-badge"> ({daysRemaining}d left)</span>
//                             )}
//                           </span>
//                         </div>
//                         <div className="detail-item">
//                           <i className="bi bi-clock"></i>
//                           <span>Applied: {new Date(app.applied_at).toLocaleDateString('en-IN')}</span>
//                         </div>
//                       </div>

//                       <div className="application-actions">
//                         <Link
//                           to={`/scholarship/${app.scholarship_id}`}
//                           className="btn-action btn-view"
//                         >
//                           <i className="bi bi-eye me-1"></i>
//                           View Details
//                         </Link>

//                         {app.apply_link && (
//                           <a
//                             href={app.apply_link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="btn-action btn-visit"
//                           >
//                             <i className="bi bi-box-arrow-up-right me-1"></i>
//                             Visit Portal
//                           </a>
//                         )}

//                         <div className="dropdown">
//                           <button
//                             className="btn-action btn-more"
//                             data-bs-toggle="dropdown"
//                             aria-expanded="false"
//                           >
//                             <i className="bi bi-three-dots-vertical"></i>
//                           </button>
//                           <ul className="dropdown-menu">
//                             <li>
//                               <button
//                                 className="dropdown-item"
//                                 onClick={() => handleStatusUpdate(app.id, 'won')}
//                               >
//                                 <i className="bi bi-trophy me-2"></i>
//                                 Mark as Won
//                               </button>
//                             </li>
//                             <li>
//                               <button
//                                 className="dropdown-item"
//                                 onClick={() => handleStatusUpdate(app.id, 'rejected')}
//                               >
//                                 <i className="bi bi-x-circle me-2"></i>
//                                 Mark as Rejected
//                               </button>
//                             </li>
//                             <li><hr className="dropdown-divider" /></li>
//                             <li>
//                               <button
//                                 className="dropdown-item text-danger"
//                                 onClick={() => handleDelete(app.id)}
//                               >
//                                 <i className="bi bi-trash me-2"></i>
//                                 Delete
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </>
//         )}

//         {/* NEW - MENTORS TAB */}
//         {activeTab === 'mentors' && (
//           <>
//             {mentorships.length === 0 ? (
//               <div className="empty-state">
//                 <i className="bi bi-people"></i>
//                 <h3>No Active Mentors</h3>
//                 <p>You don't have any active mentor connections yet.</p>
//                 <Link to="/mentors" className="btn btn-primary">
//                   <i className="bi bi-search me-2"></i>
//                   Find Mentors
//                 </Link>
//               </div>
//             ) : (
//               <div className="mentors-grid">
//                 {mentorships.map(mentorship => (
//                   <div key={mentorship.id} className="mentor-connection-card">
//                     <div className="mentor-avatar-section">
//                       <img 
//                         src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentorship.mentor_name)}&background=28a745&color=fff&size=100`}
//                         alt={mentorship.mentor_name}
//                       />
//                       <div className="verified-badge">
//                         <i className="bi bi-check-circle-fill"></i>
//                       </div>
//                     </div>
//                     <h4>{mentorship.mentor_name}</h4>
//                     <p className="mentor-email">{mentorship.mentor_email}</p>
//                     {mentorship.scholarship_title && (
//                       <p className="connection-context">
//                         <i className="bi bi-award me-2"></i>
//                         {mentorship.scholarship_title}
//                       </p>
//                     )}
//                     <p className="connection-date">
//                       <i className="bi bi-clock me-2"></i>
//                       Connected: {new Date(mentorship.requested_at).toLocaleDateString('en-IN')}
//                     </p>
//                     <button 
//                       className="btn-chat-mentor"
//                       onClick={() => handleOpenChat(mentorship)}
//                     >
//                       <i className="bi bi-chat-dots-fill me-2"></i>
//                       Message Mentor
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* NEW - Chat Modal */}
//       {showChat && selectedChat && (
//         <div className="chat-overlay" onClick={handleCloseChat}>
//           <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
//             <ChatBox 
//               mentorshipId={selectedChat.mentorshipId}
//               otherUser={selectedChat.otherUser}
//               onClose={handleCloseChat}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Applications;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ChatBox from '../components/ChatBox';
import './Applications.css';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Chat state
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Mentorships state
  const [mentorships, setMentorships] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    fetchApplications();
    fetchMyMentorships();
  }, [statusFilter, searchQuery, sortBy]);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchQuery) params.search = searchQuery;
      if (sortBy) params.sort = sortBy;

      const response = await api.get('/applications', { params });
      setApplications(response.data.data.applications);
      setStats(response.data.data.stats);
    } catch (err) {
      console.error('Fetch applications error:', err);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  // FIX: Use /chat/my-mentors (student endpoint) instead of /mentors/my-requests (mentor endpoint)
  const fetchMyMentorships = async () => {
    try {
      const response = await api.get('/chat/my-mentors');
      setMentorships(response.data.data);
    } catch (err) {
      console.error('Fetch mentorships error:', err);
    }
  };

  // Chat handlers
  const handleOpenChat = (mentorship) => {
    setSelectedChat({
      mentorshipId: mentorship.id,
      otherUser: {
        name: mentorship.mentor_name,
        email: mentorship.mentor_email,
        role: 'mentor'
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
      pending: { class: 'badge-warning', icon: 'bi-clock', text: 'Pending' },
      applied: { class: 'badge-info', icon: 'bi-check-circle', text: 'Applied' },
      won: { class: 'badge-success', icon: 'bi-trophy', text: 'Won' },
      rejected: { class: 'badge-danger', icon: 'bi-x-circle', text: 'Rejected' }
    };
    return badges[status] || badges.pending;
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await api.put(`/applications/${applicationId}`, { status: newStatus });
      fetchApplications();
      alert('Status updated successfully!');
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      await api.delete(`/applications/${applicationId}`);
      fetchApplications();
      alert('Application deleted successfully!');
    } catch (err) {
      alert('Failed to delete application');
    }
  };

  return (
    <div className="applications-page">
      <div className="applications-hero">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-file-earmark-text me-3"></i>
            My Dashboard
          </h1>
          <p className="page-subtitle">
            Track your scholarship applications and connect with mentors
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <i className="bi bi-file-text me-2"></i>
            Applications ({applications.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentors')}
          >
            <i className="bi bi-people me-2"></i>
            My Mentors ({mentorships.length})
          </button>
        </div>

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <>
            {/* Statistics Cards */}
            {stats && (
              <div className="row mb-4">
                <div className="col-md-3 mb-3">
                  <div className="stat-card stat-total">
                    <i className="bi bi-file-earmark-text"></i>
                    <div>
                      <h3>{stats.total}</h3>
                      <p>Total Applications</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="stat-card stat-applied">
                    <i className="bi bi-check-circle"></i>
                    <div>
                      <h3>{stats.applied}</h3>
                      <p>Applied</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="stat-card stat-won">
                    <i className="bi bi-trophy"></i>
                    <div>
                      <h3>{stats.won}</h3>
                      <p>Won</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="stat-card stat-pending">
                    <i className="bi bi-clock"></i>
                    <div>
                      <h3>{stats.pending}</h3>
                      <p>Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters & Search */}
            <div className="filters-bar">
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="applied">Applied</option>
                <option value="won">Won</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="deadline">By Deadline</option>
                <option value="amount">By Amount</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="loading-container">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading applications...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && applications.length === 0 && (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <h3>No Applications Yet</h3>
                <p>Start applying for scholarships to see them here</p>
                <Link to="/scholarships" className="btn btn-primary">
                  <i className="bi bi-search me-2"></i>
                  Browse Scholarships
                </Link>
              </div>
            )}

            {/* Applications List */}
            {!loading && !error && applications.length > 0 && (
              <div className="applications-list">
                {applications.map((app) => {
                  const badge = getStatusBadge(app.status);
                  const daysRemaining = app.days_remaining;
                  
                  return (
                    <div key={app.id} className="application-card">
                      <div className="application-header">
                        <div>
                          <h3 className="application-title">{app.title}</h3>
                          <p className="application-provider">
                            <i className="bi bi-building me-2"></i>
                            {app.provider}
                          </p>
                        </div>
                        <span className={`status-badge ${badge.class}`}>
                          <i className={`bi ${badge.icon} me-1`}></i>
                          {badge.text}
                        </span>
                      </div>

                      <div className="application-details">
                        <div className="detail-item">
                          <i className="bi bi-currency-rupee"></i>
                          <span>{app.amount}</span>
                        </div>
                        <div className="detail-item">
                          <i className="bi bi-calendar-event"></i>
                          <span>
                            {new Date(app.deadline).toLocaleDateString('en-IN')}
                            {daysRemaining !== null && daysRemaining >= 0 && (
                              <span className="days-badge"> ({daysRemaining}d left)</span>
                            )}
                          </span>
                        </div>
                        <div className="detail-item">
                          <i className="bi bi-clock"></i>
                          <span>Applied: {new Date(app.applied_at).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="application-actions">
                        <Link
                          to={`/scholarship/${app.scholarship_id}`}
                          className="btn-action btn-view"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View Details
                        </Link>

                        {app.apply_link && (
                          <a
                            href={app.apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-action btn-visit"
                          >
                            <i className="bi bi-box-arrow-up-right me-1"></i>
                            Visit Portal
                          </a>
                        )}

                        <div className="dropdown">
                          <button
                            className="btn-action btn-more"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleStatusUpdate(app.id, 'won')}
                              >
                                <i className="bi bi-trophy me-2"></i>
                                Mark as Won
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleStatusUpdate(app.id, 'rejected')}
                              >
                                <i className="bi bi-x-circle me-2"></i>
                                Mark as Rejected
                              </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(app.id)}
                              >
                                <i className="bi bi-trash me-2"></i>
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* MENTORS TAB */}
        {activeTab === 'mentors' && (
          <>
            {mentorships.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-people"></i>
                <h3>No Active Mentors</h3>
                <p>You don't have any active mentor connections yet.</p>
                <Link to="/mentors" className="btn btn-primary">
                  <i className="bi bi-search me-2"></i>
                  Find Mentors
                </Link>
              </div>
            ) : (
              <div className="mentors-grid">
                {mentorships.map(mentorship => (
                  <div key={mentorship.id} className="mentor-connection-card">
                    <div className="mentor-avatar-section">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentorship.mentor_name)}&background=28a745&color=fff&size=100`}
                        alt={mentorship.mentor_name}
                      />
                      <div className="verified-badge">
                        <i className="bi bi-check-circle-fill"></i>
                      </div>
                    </div>
                    <h4>{mentorship.mentor_name}</h4>
                    <p className="mentor-email">{mentorship.mentor_email}</p>
                    {mentorship.scholarship_title && (
                      <p className="connection-context">
                        <i className="bi bi-award me-2"></i>
                        {mentorship.scholarship_title}
                      </p>
                    )}
                    <p className="connection-date">
                      <i className="bi bi-clock me-2"></i>
                      Connected: {new Date(mentorship.requested_at).toLocaleDateString('en-IN')}
                    </p>
                    <button 
                      className="btn-chat-mentor"
                      onClick={() => handleOpenChat(mentorship)}
                    >
                      <i className="bi bi-chat-dots-fill me-2"></i>
                      Message Mentor
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
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

export default Applications;