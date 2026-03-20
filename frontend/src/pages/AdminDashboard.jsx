// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './AdminDashboard.css';

// function AdminDashboard() {
//   const { user } = useAuth();
//   const [stats, setStats] = useState(null);
//   const [pendingMentors, setPendingMentors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchStats();
//     fetchPendingMentors();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response = await api.get('/admin/stats');
//       setStats(response.data.data);
//     } catch (err) {
//       console.error('Fetch stats error:', err);
//     }
//   };

//   const fetchPendingMentors = async () => {
//     try {
//       const response = await api.get('/admin/mentors/pending');
//       setPendingMentors(response.data.data);
//     } catch (err) {
//       console.error('Fetch pending mentors error:', err);
//       setError('Failed to load pending mentors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyMentor = async (mentorId, action) => {
//     const confirmMessage = action === 'verify' 
//       ? 'Are you sure you want to verify this mentor?' 
//       : 'Are you sure you want to reject this mentor? This will remove their account.';

//     if (!window.confirm(confirmMessage)) {
//       return;
//     }

//     try {
//       await api.put(`/admin/mentors/${mentorId}/verify`, { action });
//       alert(action === 'verify' ? 'Mentor verified successfully!' : 'Mentor rejected and removed.');
//       fetchPendingMentors(); // Refresh list
//       fetchStats(); // Update stats
//     } catch (err) {
//       alert('Failed to process mentor verification');
//     }
//   };

//   return (
//     <div className="admin-dashboard-page">
//       <div className="admin-hero">
//         <div className="container">
//           <h1 className="admin-title">
//             <i className="bi bi-shield-check me-3"></i>
//             Admin Dashboard
//           </h1>
//           <p className="admin-subtitle">
//             Welcome, {user?.name}! Manage platform operations and verify mentors.
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Statistics Overview */}
//         {stats && (
//           <div className="row mb-5">
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-students">
//                 <i className="bi bi-people-fill"></i>
//                 <div>
//                   <h3>{stats.total_students}</h3>
//                   <p>Total Students</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-mentors">
//                 <i className="bi bi-person-badge"></i>
//                 <div>
//                   <h3>{stats.verified_mentors}</h3>
//                   <p>Verified Mentors</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-scholarships">
//                 <i className="bi bi-award"></i>
//                 <div>
//                   <h3>{stats.total_scholarships}</h3>
//                   <p>Scholarships</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-applications">
//                 <i className="bi bi-file-earmark-text"></i>
//                 <div>
//                   <h3>{stats.total_applications}</h3>
//                   <p>Applications</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Pending Mentor Verifications */}
//         <div className="admin-section">
//           <h2 className="section-title">
//             <i className="bi bi-hourglass-split me-2"></i>
//             Pending Mentor Verifications
//             {pendingMentors.length > 0 && (
//               <span className="badge-count">{pendingMentors.length}</span>
//             )}
//           </h2>

//           {loading && (
//             <div className="loading-container">
//               <div className="spinner-border text-primary"></div>
//               <p className="mt-3">Loading pending mentors...</p>
//             </div>
//           )}

//           {error && (
//             <div className="alert alert-danger">
//               <i className="bi bi-exclamation-triangle-fill me-2"></i>
//               {error}
//             </div>
//           )}

//           {!loading && !error && pendingMentors.length === 0 && (
//             <div className="empty-state">
//               <i className="bi bi-check-circle"></i>
//               <h3>All Clear!</h3>
//               <p>No pending mentor verifications at the moment.</p>
//             </div>
//           )}

//           {!loading && !error && pendingMentors.length > 0 && (
//             <div className="mentors-table">
//               {pendingMentors.map(mentor => (
//                 <div key={mentor.id} className="mentor-verification-card">
//                   <div className="mentor-info-section">
//                     <div className="mentor-avatar-admin">
//                       <img 
//                         src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=80`}
//                         alt={mentor.name}
//                       />
//                     </div>
//                     <div className="mentor-details">
//                       <h4>{mentor.name}</h4>
//                       <p className="mentor-email-admin">
//                         <i className="bi bi-envelope me-2"></i>
//                         {mentor.email}
//                       </p>
//                       <p className="mentor-expertise-admin">
//                         <i className="bi bi-lightbulb me-2"></i>
//                         <strong>Expertise:</strong> {mentor.expertise}
//                       </p>
//                       <p className="mentor-experience-admin">
//                         <i className="bi bi-award me-2"></i>
//                         <strong>Experience:</strong> {mentor.experience_years} years
//                       </p>
//                       {mentor.charge_per_session && (
//                         <p className="mentor-charge-admin">
//                           <i className="bi bi-currency-rupee me-2"></i>
//                           <strong>Charges:</strong> ₹{mentor.charge_per_session} per session
//                         </p>
//                       )}
//                       {mentor.bio && (
//                         <p className="mentor-bio-admin">
//                           <i className="bi bi-file-text me-2"></i>
//                           <strong>Bio:</strong> {mentor.bio}
//                         </p>
//                       )}
//                       <p className="registration-date">
//                         <i className="bi bi-calendar-event me-2"></i>
//                         Registered: {new Date(mentor.created_at).toLocaleDateString('en-IN')}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="verification-actions">
//                     <button 
//                       className="btn-verify"
//                       onClick={() => handleVerifyMentor(mentor.id, 'verify')}
//                     >
//                       <i className="bi bi-check-circle-fill me-2"></i>
//                       Verify Mentor
//                     </button>
//                     <button 
//                       className="btn-reject-admin"
//                       onClick={() => handleVerifyMentor(mentor.id, 'reject')}
//                     >
//                       <i className="bi bi-x-circle-fill me-2"></i>
//                       Reject & Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Quick Actions */}
//         <div className="admin-section mt-5">
//           <h2 className="section-title">
//             <i className="bi bi-lightning-fill me-2"></i>
//             Quick Actions
//           </h2>
//           <div className="quick-actions-grid">
//             <div className="action-card-admin">
//               <i className="bi bi-award"></i>
//               <h4>Manage Scholarships</h4>
//               <p>Add, edit, or remove scholarships</p>
//               <button className="btn-action-admin">Coming Soon</button>
//             </div>
//             <div className="action-card-admin">
//               <i className="bi bi-people"></i>
//               <h4>View All Users</h4>
//               <p>Browse students and mentors</p>
//               <button className="btn-action-admin">Coming Soon</button>
//             </div>
//             <div className="action-card-admin">
//               <i className="bi bi-graph-up"></i>
//               <h4>Analytics</h4>
//               <p>View platform statistics</p>
//               <button className="btn-action-admin">Coming Soon</button>
//             </div>
//             <div className="action-card-admin">
//               <i className="bi bi-gear"></i>
//               <h4>Settings</h4>
//               <p>Configure platform settings</p>
//               <button className="btn-action-admin">Coming Soon</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [pendingMentors, setPendingMentors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allMentors, setAllMentors] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
    fetchPendingMentors();
    if (activeTab === 'students') fetchAllStudents();
    if (activeTab === 'mentors') fetchAllMentors();
    if (activeTab === 'applications') fetchApplications();
  }, [activeTab, applicationFilter]);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.data);
    } catch (err) {
      console.error('Fetch stats error:', err);
    }
  };

  const fetchPendingMentors = async () => {
    try {
      const response = await api.get('/admin/mentors/pending');
      setPendingMentors(response.data.data);
    } catch (err) {
      console.error('Fetch pending mentors error:', err);
      setError('Failed to load pending mentors');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const response = await api.get('/admin/students');
      setAllStudents(response.data.data);
    } catch (err) {
      console.error('Fetch students error:', err);
    }
  };

  const fetchAllMentors = async () => {
    try {
      const response = await api.get('/admin/mentors');
      setAllMentors(response.data.data);
    } catch (err) {
      console.error('Fetch mentors error:', err);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await api.get(`/admin/applications?status=${applicationFilter}`);
      setApplications(response.data.data);
    } catch (err) {
      console.error('Fetch applications error:', err);
    }
  };

  const handleVerifyMentor = async (mentorId, action) => {
    const confirmMessage = action === 'verify'
      ? 'Are you sure you want to verify this mentor?'
      : 'Are you sure you want to reject this mentor? This will remove their account.';

    if (!window.confirm(confirmMessage)) return;

    try {
      await api.put(`/admin/mentors/${mentorId}/verify`, { action });
      alert(action === 'verify' ? 'Mentor verified successfully!' : 'Mentor rejected and removed.');
      fetchPendingMentors();
      fetchStats();
    } catch (err) {
      alert('Failed to process mentor verification');
    }
  };

  const handleUpdateApplicationStatus = async (appId, newStatus) => {
    if (!window.confirm(`Update application status to "${newStatus}"?`)) return;

    try {
      await api.put(`/admin/applications/${appId}/status`, { status: newStatus });
      alert('Application status updated successfully!');
      fetchApplications();
      fetchStats();
    } catch (err) {
      alert('Failed to update application status');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'applied': return 'badge-applied';
      case 'won': return 'badge-won';
      case 'rejected': return 'badge-rejected';
      default: return 'badge-default';
    }
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-hero">
        <div className="container">
          <h1 className="admin-title">
            <i className="bi bi-shield-check me-3"></i>
            Admin Dashboard
          </h1>
          <p className="admin-subtitle">
            Welcome, {user?.name}! Manage platform operations and monitor all activities.
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Enhanced Statistics Overview */}
        {stats && (
          <div className="row mb-5">
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-students">
                <i className="bi bi-people-fill"></i>
                <div>
                  <h3>{stats.total_students}</h3>
                  <p>Total Students</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-mentors">
                <i className="bi bi-person-badge"></i>
                <div>
                  <h3>{stats.verified_mentors}</h3>
                  <p>Verified Mentors</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-scholarships">
                <i className="bi bi-award"></i>
                <div>
                  <h3>{stats.total_scholarships}</h3>
                  <p>Scholarships</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-applications">
                <i className="bi bi-file-earmark-text"></i>
                <div>
                  <h3>{stats.total_applications}</h3>
                  <p>Applications</p>
                </div>
              </div>
            </div>

            {/* Application Status Breakdown */}
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-pending">
                <i className="bi bi-hourglass-split"></i>
                <div>
                  <h3>{stats.pending_applications || 0}</h3>
                  <p>Pending Apps</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-applied">
                <i className="bi bi-check2-circle"></i>
                <div>
                  <h3>{stats.applied_applications || 0}</h3>
                  <p>Applied</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-won">
                <i className="bi bi-trophy"></i>
                <div>
                  <h3>{stats.won_applications || 0}</h3>
                  <p>Won</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="admin-stat-card stat-rejected">
                <i className="bi bi-x-circle"></i>
                <div>
                  <h3>{stats.rejected_applications || 0}</h3>
                  <p>Rejected</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <i className="bi bi-people me-2"></i>
            All Students ({stats?.total_students || 0})
          </button>
          <button
            className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentors')}
          >
            <i className="bi bi-person-badge me-2"></i>
            All Mentors ({allMentors.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <i className="bi bi-file-earmark-text me-2"></i>
            Applications ({stats?.total_applications || 0})
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="admin-section">
            <h2 className="section-title">
              <i className="bi bi-hourglass-split me-2"></i>
              Pending Mentor Verifications
              {pendingMentors.length > 0 && (
                <span className="badge-count">{pendingMentors.length}</span>
              )}
            </h2>

            {loading && (
              <div className="loading-container">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading pending mentors...</p>
              </div>
            )}

            {!loading && pendingMentors.length === 0 && (
              <div className="empty-state">
                <i className="bi bi-check-circle"></i>
                <h3>All Clear!</h3>
                <p>No pending mentor verifications at the moment.</p>
              </div>
            )}

            {!loading && pendingMentors.length > 0 && (
              <div className="mentors-table">
                {pendingMentors.map(mentor => (
                  <div key={mentor.id} className="mentor-verification-card">
                    <div className="mentor-info-section">
                      <div className="mentor-avatar-admin">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=80`}
                          alt={mentor.name}
                        />
                      </div>
                      <div className="mentor-details">
                        <h4>{mentor.name}</h4>
                        <p className="mentor-email-admin">
                          <i className="bi bi-envelope me-2"></i>
                          {mentor.email}
                        </p>
                        <p className="mentor-expertise-admin">
                          <i className="bi bi-lightbulb me-2"></i>
                          <strong>Expertise:</strong> {mentor.expertise}
                        </p>
                        <p className="mentor-experience-admin">
                          <i className="bi bi-award me-2"></i>
                          <strong>Experience:</strong> {mentor.experience_years} years
                        </p>
                        {mentor.charge_per_session > 0 && (
                          <p className="mentor-charge-admin">
                            <i className="bi bi-currency-rupee me-2"></i>
                            <strong>Charges:</strong> ₹{mentor.charge_per_session} per session
                          </p>
                        )}
                        {mentor.bio && (
                          <p className="mentor-bio-admin">
                            <i className="bi bi-file-text me-2"></i>
                            {mentor.bio}
                          </p>
                        )}
                        <p className="registration-date">
                          <i className="bi bi-calendar-event me-2"></i>
                          Registered: {new Date(mentor.created_at).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <div className="verification-actions">
                      <button
                        className="btn-verify"
                        onClick={() => handleVerifyMentor(mentor.id, 'verify')}
                      >
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Verify Mentor
                      </button>
                      <button
                        className="btn-reject-admin"
                        onClick={() => handleVerifyMentor(mentor.id, 'reject')}
                      >
                        <i className="bi bi-x-circle-fill me-2"></i>
                        Reject & Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
          <div className="admin-section">
            <h2 className="section-title">
              <i className="bi bi-people me-2"></i>
              All Students
            </h2>
            {allStudents.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-person-x"></i>
                <h3>No Students Found</h3>
              </div>
            ) : (
              <div className="data-table-container">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Education</th>
                      <th>Location</th>
                      <th>Profile</th>
                      <th>Applications</th>
                      <th>Won</th>
                      <th>Mentors</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudents.map(student => (
                      <tr key={student.id}>
                        <td><strong>{student.name}</strong></td>
                        <td>{student.email}</td>
                        <td>{student.education_level || 'N/A'}</td>
                        <td>{student.city && student.state ? `${student.city}, ${student.state}` : 'N/A'}</td>
                        <td>
                          <span className={`profile-badge ${student.profile_completed ? 'completed' : 'incomplete'}`}>
                            {student.profile_completed ? '✓ Complete' : '✗ Incomplete'}
                          </span>
                        </td>
                        <td><span className="count-badge">{student.total_applications}</span></td>
                        <td><span className="count-badge won-badge">{student.won_scholarships}</span></td>
                        <td><span className="count-badge">{student.connected_mentors}</span></td>
                        <td>{new Date(student.created_at).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MENTORS TAB */}
        {activeTab === 'mentors' && (
          <div className="admin-section">
            <h2 className="section-title">
              <i className="bi bi-person-badge me-2"></i>
              All Mentors
            </h2>
            {allMentors.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-person-x"></i>
                <h3>No Mentors Found</h3>
              </div>
            ) : (
              <div className="data-table-container">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Expertise</th>
                      <th>Experience</th>
                      <th>Charge</th>
                      <th>Status</th>
                      <th>Requests</th>
                      <th>Students</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMentors.map(mentor => (
                      <tr key={mentor.id}>
                        <td><strong>{mentor.name}</strong></td>
                        <td>{mentor.email}</td>
                        <td>{mentor.expertise}</td>
                        <td>{mentor.experience_years} years</td>
                        <td>₹{mentor.charge_per_session}/session</td>
                        <td>
                          <span className={`status-badge ${mentor.verified ? 'verified' : 'pending'}`}>
                            {mentor.verified ? '✓ Verified' : '⏳ Pending'}
                          </span>
                        </td>
                        <td><span className="count-badge">{mentor.total_requests}</span></td>
                        <td><span className="count-badge won-badge">{mentor.accepted_students}</span></td>
                        <td>{new Date(mentor.created_at).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="admin-section">
            <div className="section-header-with-filter">
              <h2 className="section-title">
                <i className="bi bi-file-earmark-text me-2"></i>
                Applications Overview
              </h2>
              <select
                className="filter-select-admin"
                value={applicationFilter}
                onChange={(e) => setApplicationFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="applied">Applied</option>
                <option value="won">Won</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {applications.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-file-earmark-x"></i>
                <h3>No Applications Found</h3>
              </div>
            ) : (
              <div className="data-table-container">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Scholarship</th>
                      <th>Amount</th>
                      <th>Provider</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td><strong>{app.student_name}</strong></td>
                        <td>{app.student_email}</td>
                        <td>{app.scholarship_title}</td>
                        <td>₹{app.scholarship_amount?.toLocaleString('en-IN')}</td>
                        <td>{app.provider}</td>
                        <td>
                          <span className={`application-status-badge ${getStatusBadgeClass(app.status)}`}>
                            {app.status.toUpperCase()}
                          </span>
                        </td>
                        <td>{new Date(app.applied_at).toLocaleDateString('en-IN')}</td>
                        <td>
                          <div className="action-buttons">
                            {app.status !== 'won' && (
                              <button
                                className="btn-action-sm btn-won"
                                onClick={() => handleUpdateApplicationStatus(app.id, 'won')}
                                title="Mark as Won"
                              >
                                <i className="bi bi-trophy-fill"></i>
                              </button>
                            )}
                            {app.status !== 'rejected' && (
                              <button
                                className="btn-action-sm btn-reject"
                                onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                                title="Mark as Rejected"
                              >
                                <i className="bi bi-x-circle-fill"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;