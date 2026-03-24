


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './AdminDashboard.css';

// function AdminDashboard() {
//   const { user } = useAuth();
//   const [stats, setStats] = useState(null);
//   const [pendingMentors, setPendingMentors] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [allMentors, setAllMentors] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [applicationFilter, setApplicationFilter] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchStats();
//     fetchPendingMentors();
//     if (activeTab === 'students') fetchAllStudents();
//     if (activeTab === 'mentors') fetchAllMentors();
//     if (activeTab === 'applications') fetchApplications();
//   }, [activeTab, applicationFilter]);

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

//   const fetchAllStudents = async () => {
//     try {
//       const response = await api.get('/admin/students');
//       setAllStudents(response.data.data);
//     } catch (err) {
//       console.error('Fetch students error:', err);
//     }
//   };

//   const fetchAllMentors = async () => {
//     try {
//       const response = await api.get('/admin/mentors');
//       setAllMentors(response.data.data);
//     } catch (err) {
//       console.error('Fetch mentors error:', err);
//     }
//   };

//   const fetchApplications = async () => {
//     try {
//       const response = await api.get(`/admin/applications?status=${applicationFilter}`);
//       setApplications(response.data.data);
//     } catch (err) {
//       console.error('Fetch applications error:', err);
//     }
//   };

//   const handleVerifyMentor = async (mentorId, action) => {
//     const confirmMessage = action === 'verify'
//       ? 'Are you sure you want to verify this mentor?'
//       : 'Are you sure you want to reject this mentor? This will remove their account.';

//     if (!window.confirm(confirmMessage)) return;

//     try {
//       await api.put(`/admin/mentors/${mentorId}/verify`, { action });
//       alert(action === 'verify' ? 'Mentor verified successfully!' : 'Mentor rejected and removed.');
//       fetchPendingMentors();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to process mentor verification');
//     }
//   };

//   const handleUpdateApplicationStatus = async (appId, newStatus) => {
//     if (!window.confirm(`Update application status to "${newStatus}"?`)) return;

//     try {
//       await api.put(`/admin/applications/${appId}/status`, { status: newStatus });
//       alert('Application status updated successfully!');
//       fetchApplications();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to update application status');
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'pending': return 'badge-pending';
//       case 'applied': return 'badge-applied';
//       case 'won': return 'badge-won';
//       case 'rejected': return 'badge-rejected';
//       default: return 'badge-default';
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
//             Welcome, {user?.name}! Manage platform operations and monitor all activities.
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Enhanced Statistics Overview */}
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

//             {/* Application Status Breakdown */}
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-pending">
//                 <i className="bi bi-hourglass-split"></i>
//                 <div>
//                   <h3>{stats.pending_applications || 0}</h3>
//                   <p>Pending Apps</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-applied">
//                 <i className="bi bi-check2-circle"></i>
//                 <div>
//                   <h3>{stats.applied_applications || 0}</h3>
//                   <p>Applied</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-won">
//                 <i className="bi bi-trophy"></i>
//                 <div>
//                   <h3>{stats.won_applications || 0}</h3>
//                   <p>Won</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3 mb-3">
//               <div className="admin-stat-card stat-rejected">
//                 <i className="bi bi-x-circle"></i>
//                 <div>
//                   <h3>{stats.rejected_applications || 0}</h3>
//                   <p>Rejected</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation Tabs */}
//         <div className="admin-tabs">
//           <button
//             className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
//             onClick={() => setActiveTab('overview')}
//           >
//             <i className="bi bi-grid-3x3-gap me-2"></i>
//             Overview
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
//             onClick={() => setActiveTab('students')}
//           >
//             <i className="bi bi-people me-2"></i>
//             All Students ({stats?.total_students || 0})
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`}
//             onClick={() => setActiveTab('mentors')}
//           >
//             <i className="bi bi-person-badge me-2"></i>
//             All Mentors ({allMentors.length})
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
//             onClick={() => setActiveTab('applications')}
//           >
//             <i className="bi bi-file-earmark-text me-2"></i>
//             Applications ({stats?.total_applications || 0})
//           </button>
//         </div>

//         {/* OVERVIEW TAB */}
//         {activeTab === 'overview' && (
//           <div className="admin-section">
//             <h2 className="section-title">
//               <i className="bi bi-hourglass-split me-2"></i>
//               Pending Mentor Verifications
//               {pendingMentors.length > 0 && (
//                 <span className="badge-count">{pendingMentors.length}</span>
//               )}
//             </h2>

//             {loading && (
//               <div className="loading-container">
//                 <div className="spinner-border text-primary"></div>
//                 <p className="mt-3">Loading pending mentors...</p>
//               </div>
//             )}

//             {!loading && pendingMentors.length === 0 && (
//               <div className="empty-state">
//                 <i className="bi bi-check-circle"></i>
//                 <h3>All Clear!</h3>
//                 <p>No pending mentor verifications at the moment.</p>
//               </div>
//             )}

//             {!loading && pendingMentors.length > 0 && (
//               <div className="mentors-table">
//                 {pendingMentors.map(mentor => (
//                   <div key={mentor.id} className="mentor-verification-card">
//                     <div className="mentor-info-section">
//                       <div className="mentor-avatar-admin">
//                         <img
//                           src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=80`}
//                           alt={mentor.name}
//                         />
//                       </div>
//                       <div className="mentor-details">
//                         <h4>{mentor.name}</h4>
//                         <p className="mentor-email-admin">
//                           <i className="bi bi-envelope me-2"></i>
//                           {mentor.email}
//                         </p>
//                         <p className="mentor-expertise-admin">
//                           <i className="bi bi-lightbulb me-2"></i>
//                           <strong>Expertise:</strong> {mentor.expertise}
//                         </p>
//                         <p className="mentor-experience-admin">
//                           <i className="bi bi-award me-2"></i>
//                           <strong>Experience:</strong> {mentor.experience_years} years
//                         </p>
//                         {mentor.charge_per_session > 0 && (
//                           <p className="mentor-charge-admin">
//                             <i className="bi bi-currency-rupee me-2"></i>
//                             <strong>Charges:</strong> ₹{mentor.charge_per_session} per session
//                           </p>
//                         )}
//                         {mentor.bio && (
//                           <p className="mentor-bio-admin">
//                             <i className="bi bi-file-text me-2"></i>
//                             {mentor.bio}
//                           </p>
//                         )}
//                         <p className="registration-date">
//                           <i className="bi bi-calendar-event me-2"></i>
//                           Registered: {new Date(mentor.created_at).toLocaleDateString('en-IN')}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="verification-actions">
//                       <button
//                         className="btn-verify"
//                         onClick={() => handleVerifyMentor(mentor.id, 'verify')}
//                       >
//                         <i className="bi bi-check-circle-fill me-2"></i>
//                         Verify Mentor
//                       </button>
//                       <button
//                         className="btn-reject-admin"
//                         onClick={() => handleVerifyMentor(mentor.id, 'reject')}
//                       >
//                         <i className="bi bi-x-circle-fill me-2"></i>
//                         Reject & Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* STUDENTS TAB */}
//         {activeTab === 'students' && (
//           <div className="admin-section">
//             <h2 className="section-title">
//               <i className="bi bi-people me-2"></i>
//               All Students
//             </h2>
//             {allStudents.length === 0 ? (
//               <div className="empty-state">
//                 <i className="bi bi-person-x"></i>
//                 <h3>No Students Found</h3>
//               </div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Education</th>
//                       <th>Location</th>
//                       <th>Profile</th>
//                       <th>Applications</th>
//                       <th>Won</th>
//                       <th>Mentors</th>
//                       <th>Joined</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allStudents.map(student => (
//                       <tr key={student.id}>
//                         <td><strong>{student.name}</strong></td>
//                         <td>{student.email}</td>
//                         <td>{student.education_level || 'N/A'}</td>
//                         <td>{student.city && student.state ? `${student.city}, ${student.state}` : 'N/A'}</td>
//                         <td>
//                           <span className={`profile-badge ${student.profile_completed ? 'completed' : 'incomplete'}`}>
//                             {student.profile_completed ? '✓ Complete' : '✗ Incomplete'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{student.total_applications}</span></td>
//                         <td><span className="count-badge won-badge">{student.won_scholarships}</span></td>
//                         <td><span className="count-badge">{student.connected_mentors}</span></td>
//                         <td>{new Date(student.created_at).toLocaleDateString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* MENTORS TAB */}
//         {activeTab === 'mentors' && (
//           <div className="admin-section">
//             <h2 className="section-title">
//               <i className="bi bi-person-badge me-2"></i>
//               All Mentors
//             </h2>
//             {allMentors.length === 0 ? (
//               <div className="empty-state">
//                 <i className="bi bi-person-x"></i>
//                 <h3>No Mentors Found</h3>
//               </div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Expertise</th>
//                       <th>Experience</th>
//                       <th>Charge</th>
//                       <th>Status</th>
//                       <th>Requests</th>
//                       <th>Students</th>
//                       <th>Joined</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allMentors.map(mentor => (
//                       <tr key={mentor.id}>
//                         <td><strong>{mentor.name}</strong></td>
//                         <td>{mentor.email}</td>
//                         <td>{mentor.expertise}</td>
//                         <td>{mentor.experience_years} years</td>
//                         <td>₹{mentor.charge_per_session}/session</td>
//                         <td>
//                           <span className={`status-badge ${mentor.verified ? 'verified' : 'pending'}`}>
//                             {mentor.verified ? '✓ Verified' : '⏳ Pending'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{mentor.total_requests}</span></td>
//                         <td><span className="count-badge won-badge">{mentor.accepted_students}</span></td>
//                         <td>{new Date(mentor.created_at).toLocaleDateString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* APPLICATIONS TAB */}
//         {activeTab === 'applications' && (
//           <div className="admin-section">
//             <div className="section-header-with-filter">
//               <h2 className="section-title">
//                 <i className="bi bi-file-earmark-text me-2"></i>
//                 Applications Overview
//               </h2>
//               <select
//                 className="filter-select-admin"
//                 value={applicationFilter}
//                 onChange={(e) => setApplicationFilter(e.target.value)}
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="applied">Applied</option>
//                 <option value="won">Won</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//             </div>

//             {applications.length === 0 ? (
//               <div className="empty-state">
//                 <i className="bi bi-file-earmark-x"></i>
//                 <h3>No Applications Found</h3>
//               </div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Email</th>
//                       <th>Scholarship</th>
//                       <th>Amount</th>
//                       <th>Provider</th>
//                       <th>Status</th>
//                       <th>Applied Date</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {applications.map(app => (
//                       <tr key={app.id}>
//                         <td><strong>{app.student_name}</strong></td>
//                         <td>{app.student_email}</td>
//                         <td>{app.scholarship_title}</td>
//                         <td>₹{app.scholarship_amount?.toLocaleString('en-IN')}</td>
//                         <td>{app.provider}</td>
//                         <td>
//                           <span className={`application-status-badge ${getStatusBadgeClass(app.status)}`}>
//                             {app.status.toUpperCase()}
//                           </span>
//                         </td>
//                         <td>{new Date(app.applied_at).toLocaleDateString('en-IN')}</td>
//                         <td>
//                           <div className="action-buttons">
//                             {app.status !== 'won' && (
//                               <button
//                                 className="btn-action-sm btn-won"
//                                 onClick={() => handleUpdateApplicationStatus(app.id, 'won')}
//                                 title="Mark as Won"
//                               >
//                                 <i className="bi bi-trophy-fill"></i>
//                               </button>
//                             )}
//                             {app.status !== 'rejected' && (
//                               <button
//                                 className="btn-action-sm btn-reject"
//                                 onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
//                                 title="Mark as Rejected"
//                               >
//                                 <i className="bi bi-x-circle-fill"></i>
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

// scholarship form not working
// scholarship form not working

// scholarship form not working

// scholarship form not working

// scholarship form not working

// scholarship form not working

// scholarship form not working

// scholarship form not working


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './AdminDashboard.css';

// function AdminDashboard() {
//   const { user } = useAuth();
  
//   // State
//   const [stats, setStats] = useState(null);
//   const [pendingMentors, setPendingMentors] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [allMentors, setAllMentors] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [scholarships, setScholarships] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [activityLogs, setActivityLogs] = useState([]);
  
//   const [activeTab, setActiveTab] = useState('overview');
//   const [applicationFilter, setApplicationFilter] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // Scholarship form state
//   const [showScholarshipForm, setShowScholarshipForm] = useState(false);
//   const [editingScholarship, setEditingScholarship] = useState(null);
//   const [scholarshipForm, setScholarshipForm] = useState({
//     title: '',
//     description: '',
//     amount: '',
//     deadline: '',
//     eligibility: '',
//     provider: '',
//     category: '',
//     education_level: '',
//     gender: '',
//     min_percentage: '',
//     max_income: '',
//     apply_link: ''
//   });

//   // CSV Upload state
//   const [csvFile, setCsvFile] = useState(null);

//   useEffect(() => {
//     fetchStats();
//     fetchPendingMentors();
//     if (activeTab === 'students') fetchAllStudents();
//     if (activeTab === 'mentors') fetchAllMentors();
//     if (activeTab === 'applications') fetchApplications();
//     if (activeTab === 'scholarships') fetchScholarships();
//     if (activeTab === 'users') fetchAllUsers();
//     if (activeTab === 'activity') fetchActivityLogs();
//   }, [activeTab, applicationFilter]);

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
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllStudents = async () => {
//     try {
//       const response = await api.get('/admin/students');
//       setAllStudents(response.data.data);
//     } catch (err) {
//       console.error('Fetch students error:', err);
//     }
//   };

//   const fetchAllMentors = async () => {
//     try {
//       const response = await api.get('/admin/mentors');
//       setAllMentors(response.data.data);
//     } catch (err) {
//       console.error('Fetch mentors error:', err);
//     }
//   };

//   const fetchApplications = async () => {
//     try {
//       const response = await api.get(`/admin/applications?status=${applicationFilter}`);
//       setApplications(response.data.data);
//     } catch (err) {
//       console.error('Fetch applications error:', err);
//     }
//   };

//   const fetchScholarships = async () => {
//     try {
//       const response = await api.get('/admin/scholarships');
//       setScholarships(response.data.data);
//     } catch (err) {
//       console.error('Fetch scholarships error:', err);
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const response = await api.get('/admin/users');
//       setAllUsers(response.data.data);
//     } catch (err) {
//       console.error('Fetch users error:', err);
//     }
//   };

//   const fetchActivityLogs = async () => {
//     try {
//       const response = await api.get('/admin/activity-logs?limit=100');
//       setActivityLogs(response.data.data);
//     } catch (err) {
//       console.error('Fetch activity logs error:', err);
//     }
//   };

//   const handleVerifyMentor = async (mentorId, action) => {
//     const confirmMessage = action === 'verify'
//       ? 'Are you sure you want to verify this mentor?'
//       : 'Are you sure you want to reject this mentor?';

//     if (!window.confirm(confirmMessage)) return;

//     try {
//       await api.put(`/admin/mentors/${mentorId}/verify`, { action });
//       alert(action === 'verify' ? 'Mentor verified!' : 'Mentor rejected!');
//       fetchPendingMentors();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to process mentor verification');
//     }
//   };

//   const handleUpdateApplicationStatus = async (appId, newStatus) => {
//     if (!window.confirm(`Update application status to "${newStatus}"?`)) return;

//     try {
//       await api.put(`/admin/applications/${appId}/status`, { status: newStatus });
//       alert('Application status updated!');
//       fetchApplications();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to update application status');
//     }
//   };

//   const handleScholarshipFormChange = (e) => {
//     setScholarshipForm({
//       ...scholarshipForm,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAddScholarship = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/admin/scholarships', scholarshipForm);
//       alert('Scholarship added successfully!');
//       setShowScholarshipForm(false);
//       resetScholarshipForm();
//       fetchScholarships();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to add scholarship');
//     }
//   };

//   const handleEditScholarship = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/admin/scholarships/${editingScholarship}`, scholarshipForm);
//       alert('Scholarship updated successfully!');
//       setEditingScholarship(null);
//       setShowScholarshipForm(false);
//       resetScholarshipForm();
//       fetchScholarships();
//     } catch (err) {
//       alert('Failed to update scholarship');
//     }
//   };

//   const handleDeleteScholarship = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this scholarship? This action cannot be undone.')) return;

//     try {
//       await api.delete(`/admin/scholarships/${id}`);
//       alert('Scholarship deleted successfully!');
//       fetchScholarships();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to delete scholarship');
//     }
//   };

//   const startEditScholarship = (scholarship) => {
//     setEditingScholarship(scholarship.id);
//     setScholarshipForm({
//       title: scholarship.title,
//       description: scholarship.description,
//       amount: scholarship.amount,
//       deadline: scholarship.deadline.split('T')[0], // Format date
//       eligibility: scholarship.eligibility || '',
//       provider: scholarship.provider,
//       category: scholarship.category || '',
//       education_level: scholarship.education_level || '',
//       gender: scholarship.gender || '',
//       min_percentage: scholarship.min_percentage || '',
//       max_income: scholarship.max_income || '',
//       apply_link: scholarship.apply_link || ''
//     });
//     setShowScholarshipForm(true);
//   };

//   const resetScholarshipForm = () => {
//     setScholarshipForm({
//       title: '',
//       description: '',
//       amount: '',
//       deadline: '',
//       eligibility: '',
//       provider: '',
//       category: '',
//       education_level: '',
//       gender: '',
//       min_percentage: '',
//       max_income: '',
//       apply_link: ''
//     });
//     setEditingScholarship(null);
//   };

//   const handleCSVUpload = async (e) => {
//     e.preventDefault();
//     if (!csvFile) {
//       alert('Please select a CSV file');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       try {
//         const text = event.target.result;
//         const lines = text.split('\n');
//         const headers = lines[0].split(',').map(h => h.trim());
        
//         const scholarships = [];
//         for (let i = 1; i < lines.length; i++) {
//           if (!lines[i].trim()) continue;
          
//           const values = lines[i].split(',').map(v => v.trim());
//           const scholarship = {};
//           headers.forEach((header, index) => {
//             scholarship[header] = values[index] || null;
//           });
//           scholarships.push(scholarship);
//         }

//         const response = await api.post('/admin/scholarships/bulk-upload', { scholarships });
//         alert(response.data.message);
//         setCsvFile(null);
//         fetchScholarships();
//         fetchStats();
//       } catch (err) {
//         alert('Failed to upload CSV');
//       }
//     };
//     reader.readAsText(csvFile);
//   };

//   const handleBanUser = async (userId, currentBanStatus) => {
//     const action = currentBanStatus ? 'unban' : 'ban';
//     const reason = prompt(`Reason for ${action}ing this user:`);
//     if (reason === null) return;

//     try {
//       await api.put(`/admin/users/${userId}/ban`, { action, reason });
//       alert(`User ${action}ned successfully!`);
//       fetchAllUsers();
//     } catch (err) {
//       alert(`Failed to ${action} user`);
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'pending': return 'badge-pending';
//       case 'applied': return 'badge-applied';
//       case 'won': return 'badge-won';
//       case 'rejected': return 'badge-rejected';
//       default: return 'badge-default';
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
//             Welcome, {user?.name}! Comprehensive platform management.
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Enhanced Statistics */}
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

//         {/* Navigation Tabs */}
//         <div className="admin-tabs">
//           <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
//             <i className="bi bi-grid-3x3-gap me-2"></i>Overview
//           </button>
//           <button className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
//             <i className="bi bi-people me-2"></i>Students
//           </button>
//           <button className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`} onClick={() => setActiveTab('mentors')}>
//             <i className="bi bi-person-badge me-2"></i>Mentors
//           </button>
//           <button className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
//             <i className="bi bi-file-earmark-text me-2"></i>Applications
//           </button>
//           <button className={`tab-btn ${activeTab === 'scholarships' ? 'active' : ''}`} onClick={() => setActiveTab('scholarships')}>
//             <i className="bi bi-award me-2"></i>Scholarships
//           </button>
//           <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
//             <i className="bi bi-person-gear me-2"></i>User Management
//           </button>
//           <button className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
//             <i className="bi bi-clock-history me-2"></i>Activity Logs
//           </button>
//         </div>

//         {/* OVERVIEW TAB - Pending Mentors */}
//         {activeTab === 'overview' && (
//           <div className="admin-section">
//             <h2 className="section-title">
//               <i className="bi bi-hourglass-split me-2"></i>
//               Pending Mentor Verifications
//               {pendingMentors.length > 0 && <span className="badge-count">{pendingMentors.length}</span>}
//             </h2>

//             {loading && (
//               <div className="loading-container">
//                 <div className="spinner-border text-primary"></div>
//                 <p className="mt-3">Loading...</p>
//               </div>
//             )}

//             {!loading && pendingMentors.length === 0 && (
//               <div className="empty-state">
//                 <i className="bi bi-check-circle"></i>
//                 <h3>All Clear!</h3>
//                 <p>No pending mentor verifications.</p>
//               </div>
//             )}

//             {!loading && pendingMentors.length > 0 && (
//               <div className="mentors-table">
//                 {pendingMentors.map(mentor => (
//                   <div key={mentor.id} className="mentor-verification-card">
//                     <div className="mentor-info-section">
//                       <div className="mentor-avatar-admin">
//                         <img
//                           src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=80`}
//                           alt={mentor.name}
//                         />
//                       </div>
//                       <div className="mentor-details">
//                         <h4>{mentor.name}</h4>
//                         <p><i className="bi bi-envelope me-2"></i>{mentor.email}</p>
//                         <p><i className="bi bi-lightbulb me-2"></i><strong>Expertise:</strong> {mentor.expertise}</p>
//                         <p><i className="bi bi-award me-2"></i><strong>Experience:</strong> {mentor.experience_years} years</p>
//                         {mentor.bio && <p className="mentor-bio-admin"><i className="bi bi-file-text me-2"></i>{mentor.bio}</p>}
//                       </div>
//                     </div>
//                     <div className="verification-actions">
//                       <button className="btn-verify" onClick={() => handleVerifyMentor(mentor.id, 'verify')}>
//                         <i className="bi bi-check-circle-fill me-2"></i>Verify
//                       </button>
//                       <button className="btn-reject-admin" onClick={() => handleVerifyMentor(mentor.id, 'reject')}>
//                         <i className="bi bi-x-circle-fill me-2"></i>Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* STUDENTS TAB */}
//         {activeTab === 'students' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-people me-2"></i>All Students</h2>
//             {allStudents.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Students Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Education</th>
//                       <th>Location</th>
//                       <th>Profile</th>
//                       <th>Applications</th>
//                       <th>Won</th>
//                       <th>Mentors</th>
//                       <th>Joined</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allStudents.map(student => (
//                       <tr key={student.id}>
//                         <td><strong>{student.name}</strong></td>
//                         <td>{student.email}</td>
//                         <td>{student.education_level || 'N/A'}</td>
//                         <td>{student.city && student.state ? `${student.city}, ${student.state}` : 'N/A'}</td>
//                         <td>
//                           <span className={`profile-badge ${student.profile_completed ? 'completed' : 'incomplete'}`}>
//                             {student.profile_completed ? '✓ Complete' : '✗ Incomplete'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{student.total_applications}</span></td>
//                         <td><span className="count-badge won-badge">{student.won_scholarships}</span></td>
//                         <td><span className="count-badge">{student.connected_mentors}</span></td>
//                         <td>{new Date(student.created_at).toLocaleDateString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* MENTORS TAB */}
//         {activeTab === 'mentors' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-person-badge me-2"></i>All Mentors</h2>
//             {allMentors.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Mentors Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Expertise</th>
//                       <th>Experience</th>
//                       <th>Charge</th>
//                       <th>Status</th>
//                       <th>Requests</th>
//                       <th>Students</th>
//                       <th>Joined</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allMentors.map(mentor => (
//                       <tr key={mentor.id}>
//                         <td><strong>{mentor.name}</strong></td>
//                         <td>{mentor.email}</td>
//                         <td>{mentor.expertise}</td>
//                         <td>{mentor.experience_years} years</td>
//                         <td>₹{mentor.charge_per_session}/session</td>
//                         <td>
//                           <span className={`status-badge ${mentor.verified ? 'verified' : 'pending'}`}>
//                             {mentor.verified ? '✓ Verified' : '⏳ Pending'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{mentor.total_requests}</span></td>
//                         <td><span className="count-badge won-badge">{mentor.accepted_students}</span></td>
//                         <td>{new Date(mentor.created_at).toLocaleDateString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* APPLICATIONS TAB */}
//         {activeTab === 'applications' && (
//           <div className="admin-section">
//             <div className="section-header-with-filter">
//               <h2 className="section-title"><i className="bi bi-file-earmark-text me-2"></i>Applications Overview</h2>
//               <select className="filter-select-admin" value={applicationFilter} onChange={(e) => setApplicationFilter(e.target.value)}>
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="applied">Applied</option>
//                 <option value="won">Won</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//             </div>

//             {applications.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-file-earmark-x"></i><h3>No Applications Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Email</th>
//                       <th>Scholarship</th>
//                       <th>Amount</th>
//                       <th>Provider</th>
//                       <th>Status</th>
//                       <th>Applied Date</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {applications.map(app => (
//                       <tr key={app.id}>
//                         <td><strong>{app.student_name}</strong></td>
//                         <td>{app.student_email}</td>
//                         <td>{app.scholarship_title}</td>
//                         <td>₹{app.scholarship_amount?.toLocaleString('en-IN')}</td>
//                         <td>{app.provider}</td>
//                         <td>
//                           <span className={`application-status-badge ${getStatusBadgeClass(app.status)}`}>
//                             {app.status.toUpperCase()}
//                           </span>
//                         </td>
//                         <td>{new Date(app.applied_at).toLocaleDateString('en-IN')}</td>
//                         <td>
//                           <div className="action-buttons">
//                             {app.status !== 'won' && (
//                               <button className="btn-action-sm btn-won" onClick={() => handleUpdateApplicationStatus(app.id, 'won')} title="Mark as Won">
//                                 <i className="bi bi-trophy-fill"></i>
//                               </button>
//                             )}
//                             {app.status !== 'rejected' && (
//                               <button className="btn-action-sm btn-reject" onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')} title="Mark as Rejected">
//                                 <i className="bi bi-x-circle-fill"></i>
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* SCHOLARSHIPS TAB */}
//         {activeTab === 'scholarships' && (
//           <div className="admin-section">
//             <div className="section-header-with-filter">
//               <h2 className="section-title"><i className="bi bi-award me-2"></i>Scholarship Management</h2>
//               <div className="scholarship-actions-group">
//                 <button className="btn-add-scholarship" onClick={() => { setShowScholarshipForm(true); resetScholarshipForm(); }}>
//                   <i className="bi bi-plus-circle me-2"></i>Add Scholarship
//                 </button>
//                 <label className="btn-upload-csv">
//                   <i className="bi bi-upload me-2"></i>Bulk Upload CSV
//                   <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} style={{display: 'none'}} />
//                 </label>
//                 {csvFile && (
//                   <button className="btn-process-csv" onClick={handleCSVUpload}>
//                     <i className="bi bi-check-circle me-2"></i>Process {csvFile.name}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Scholarship Form Modal */}
//             {showScholarshipForm && (
//               <div className="modal-overlay" onClick={() => setShowScholarshipForm(false)}>
//                 <div className="modal-content scholarship-form-modal" onClick={(e) => e.stopPropagation()}>
//                   <div className="modal-header">
//                     <h3>{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h3>
//                     <button className="modal-close" onClick={() => setShowScholarshipForm(false)}>×</button>
//                   </div>
//                   <form onSubmit={editingScholarship ? handleEditScholarship : handleAddScholarship}>
//                     <div className="form-grid">
//                       <div className="form-group">
//                         <label>Title *</label>
//                         <input type="text" name="title" value={scholarshipForm.title} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group">
//                         <label>Provider *</label>
//                         <input type="text" name="provider" value={scholarshipForm.provider} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group">
//                         <label>Amount (₹) *</label>
//                         <input type="number" name="amount" value={scholarshipForm.amount} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group">
//                         <label>Deadline *</label>
//                         <input type="date" name="deadline" value={scholarshipForm.deadline} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group full-width">
//                         <label>Description *</label>
//                         <textarea name="description" value={scholarshipForm.description} onChange={handleScholarshipFormChange} rows="4" required />
//                       </div>
//                       <div className="form-group">
//                         <label>Category</label>
//                         <input type="text" name="category" value={scholarshipForm.category} onChange={handleScholarshipFormChange} placeholder="Merit, Need-based, etc." />
//                       </div>
//                       <div className="form-group">
//                         <label>Education Level</label>
//                         <select name="education_level" value={scholarshipForm.education_level} onChange={handleScholarshipFormChange}>
//                           <option value="">Any</option>
//                           <option value="undergraduate">Undergraduate</option>
//                           <option value="postgraduate">Postgraduate</option>
//                           <option value="doctorate">Doctorate</option>
//                         </select>
//                       </div>
//                       <div className="form-group">
//                         <label>Gender</label>
//                         <select name="gender" value={scholarshipForm.gender} onChange={handleScholarshipFormChange}>
//                           <option value="">Any</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                       <div className="form-group">
//                         <label>Min Percentage</label>
//                         <input type="number" name="min_percentage" value={scholarshipForm.min_percentage} onChange={handleScholarshipFormChange} placeholder="e.g., 60" />
//                       </div>
//                       <div className="form-group">
//                         <label>Max Family Income</label>
//                         <input type="number" name="max_income" value={scholarshipForm.max_income} onChange={handleScholarshipFormChange} placeholder="e.g., 500000" />
//                       </div>
//                       <div className="form-group">
//                         <label>Apply Link</label>
//                         <input type="url" name="apply_link" value={scholarshipForm.apply_link} onChange={handleScholarshipFormChange} placeholder="https://..." />
//                       </div>
//                       <div className="form-group full-width">
//                         <label>Eligibility Criteria</label>
//                         <textarea name="eligibility" value={scholarshipForm.eligibility} onChange={handleScholarshipFormChange} rows="3" placeholder="Detailed eligibility requirements..." />
//                       </div>
//                     </div>
//                     <div className="form-actions">
//                       <button type="button" className="btn-cancel" onClick={() => setShowScholarshipForm(false)}>Cancel</button>
//                       <button type="submit" className="btn-submit">
//                         <i className="bi bi-check-circle me-2"></i>{editingScholarship ? 'Update' : 'Add'} Scholarship
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Scholarships Table */}
//             {scholarships.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-award"></i><h3>No Scholarships Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Title</th>
//                       <th>Provider</th>
//                       <th>Amount</th>
//                       <th>Deadline</th>
//                       <th>Applications</th>
//                       <th>Won</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {scholarships.map(scholarship => (
//                       <tr key={scholarship.id}>
//                         <td><strong>{scholarship.title}</strong></td>
//                         <td>{scholarship.provider}</td>
//                         <td>₹{scholarship.amount?.toLocaleString('en-IN')}</td>
//                         <td>{new Date(scholarship.deadline).toLocaleDateString('en-IN')}</td>
//                         <td><span className="count-badge">{scholarship.total_applications || 0}</span></td>
//                         <td><span className="count-badge won-badge">{scholarship.won_count || 0}</span></td>
//                         <td>
//                           <div className="action-buttons">
//                             <button className="btn-action-sm btn-edit" onClick={() => startEditScholarship(scholarship)} title="Edit">
//                               <i className="bi bi-pencil-fill"></i>
//                             </button>
//                             <button className="btn-action-sm btn-delete" onClick={() => handleDeleteScholarship(scholarship.id)} title="Delete">
//                               <i className="bi bi-trash-fill"></i>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* USER MANAGEMENT TAB */}
//         {activeTab === 'users' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-person-gear me-2"></i>User Management</h2>
//             {allUsers.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Users Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Role</th>
//                       <th>Status</th>
//                       <th>Activity Count</th>
//                       <th>Joined</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allUsers.map(usr => (
//                       <tr key={usr.id}>
//                         <td><strong>{usr.name}</strong></td>
//                         <td>{usr.email}</td>
//                         <td><span className="role-badge">{usr.role.toUpperCase()}</span></td>
//                         <td>
//                           <span className={`ban-status-badge ${usr.is_banned ? 'banned' : 'active'}`}>
//                             {usr.is_banned ? '🚫 Banned' : '✓ Active'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{usr.activity_count}</span></td>
//                         <td>{new Date(usr.created_at).toLocaleDateString('en-IN')}</td>
//                         <td>
//                           <button 
//                             className={`btn-action-sm ${usr.is_banned ? 'btn-unban' : 'btn-ban'}`} 
//                             onClick={() => handleBanUser(usr.id, usr.is_banned)}
//                             title={usr.is_banned ? 'Unban User' : 'Ban User'}
//                           >
//                             <i className={`bi ${usr.is_banned ? 'bi-unlock-fill' : 'bi-ban'}`}></i>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ACTIVITY LOGS TAB */}
//         {activeTab === 'activity' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-clock-history me-2"></i>Recent Activity Logs</h2>
//             {activityLogs.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-clock"></i><h3>No Activity Logs</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>User</th>
//                       <th>Role</th>
//                       <th>Action</th>
//                       <th>Details</th>
//                       <th>Admin</th>
//                       <th>Timestamp</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {activityLogs.map(log => (
//                       <tr key={log.id}>
//                         <td><strong>{log.user_name}</strong><br/><small>{log.user_email}</small></td>
//                         <td><span className="role-badge">{log.user_role.toUpperCase()}</span></td>
//                         <td><span className="action-badge">{log.action}</span></td>
//                         <td><small>{log.details ? JSON.parse(log.details).reason || 'N/A' : 'N/A'}</small></td>
//                         <td>{log.admin_name || 'System'}</td>
//                         <td>{new Date(log.created_at).toLocaleString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './AdminDashboard.css';

// function AdminDashboard() {
//   const { user } = useAuth();
  
//   // State
//   const [stats, setStats] = useState(null);
//   const [pendingMentors, setPendingMentors] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [allMentors, setAllMentors] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [scholarships, setScholarships] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [activityLogs, setActivityLogs] = useState([]);
  
//   const [activeTab, setActiveTab] = useState('overview');
//   const [applicationFilter, setApplicationFilter] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // Scholarship form state
//   const [showScholarshipForm, setShowScholarshipForm] = useState(false);
//   const [editingScholarship, setEditingScholarship] = useState(null);
//   const [scholarshipForm, setScholarshipForm] = useState({
//     title: '',
//     description: '',
//     amount: '',
//     deadline: '',
//     eligibility: '',
//     provider: '',
//     category: '',
//     education_level: '',
//     gender: '',
//     min_percentage: '',
//     max_income: '',
//     apply_link: ''
//   });

//   // CSV Upload state
//   const [csvFile, setCsvFile] = useState(null);

//   useEffect(() => {
//     fetchStats();
//     fetchPendingMentors();
//     if (activeTab === 'students') fetchAllStudents();
//     if (activeTab === 'mentors') fetchAllMentors();
//     if (activeTab === 'applications') fetchApplications();
//     if (activeTab === 'scholarships') fetchScholarships();
//     if (activeTab === 'users') fetchAllUsers();
//     if (activeTab === 'activity') fetchActivityLogs();
//   }, [activeTab, applicationFilter]);

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
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllStudents = async () => {
//     try {
//       const response = await api.get('/admin/students');
//       setAllStudents(response.data.data);
//     } catch (err) {
//       console.error('Fetch students error:', err);
//     }
//   };

//   const fetchAllMentors = async () => {
//     try {
//       const response = await api.get('/admin/mentors');
//       setAllMentors(response.data.data);
//     } catch (err) {
//       console.error('Fetch mentors error:', err);
//     }
//   };

//   const fetchApplications = async () => {
//     try {
//       const response = await api.get(`/admin/applications?status=${applicationFilter}`);
//       setApplications(response.data.data);
//     } catch (err) {
//       console.error('Fetch applications error:', err);
//     }
//   };

//   const fetchScholarships = async () => {
//     try {
//       const response = await api.get('/admin/scholarships');
//       setScholarships(response.data.data);
//     } catch (err) {
//       console.error('Fetch scholarships error:', err);
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const response = await api.get('/admin/users');
//       setAllUsers(response.data.data);
//     } catch (err) {
//       console.error('Fetch users error:', err);
//     }
//   };

//   const fetchActivityLogs = async () => {
//     try {
//       const response = await api.get('/admin/activity-logs?limit=100');
//       setActivityLogs(response.data.data);
//     } catch (err) {
//       console.error('Fetch activity logs error:', err);
//     }
//   };

//   const handleVerifyMentor = async (mentorId, action) => {
//     const confirmMessage = action === 'verify'
//       ? 'Are you sure you want to verify this mentor?'
//       : 'Are you sure you want to reject this mentor?';

//     if (!window.confirm(confirmMessage)) return;

//     try {
//       await api.put(`/admin/mentors/${mentorId}/verify`, { action });
//       alert(action === 'verify' ? 'Mentor verified!' : 'Mentor rejected!');
//       fetchPendingMentors();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to process mentor verification');
//     }
//   };

//   const handleUpdateApplicationStatus = async (appId, newStatus) => {
//     if (!window.confirm(`Update application status to "${newStatus}"?`)) return;

//     try {
//       await api.put(`/admin/applications/${appId}/status`, { status: newStatus });
//       alert('Application status updated!');
//       fetchApplications();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to update application status');
//     }
//   };

//   const handleScholarshipFormChange = (e) => {
//     setScholarshipForm({
//       ...scholarshipForm,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAddScholarship = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/admin/scholarships', scholarshipForm);
//       alert('Scholarship added successfully!');
//       setShowScholarshipForm(false);
//       resetScholarshipForm();
//       fetchScholarships();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to add scholarship');
//     }
//   };

//   const handleEditScholarship = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/admin/scholarships/${editingScholarship}`, scholarshipForm);
//       alert('Scholarship updated successfully!');
//       setEditingScholarship(null);
//       setShowScholarshipForm(false);
//       resetScholarshipForm();
//       fetchScholarships();
//     } catch (err) {
//       alert('Failed to update scholarship');
//     }
//   };

//   const handleDeleteScholarship = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this scholarship? This action cannot be undone.')) return;

//     try {
//       await api.delete(`/admin/scholarships/${id}`);
//       alert('Scholarship deleted successfully!');
//       fetchScholarships();
//       fetchStats();
//     } catch (err) {
//       alert('Failed to delete scholarship');
//     }
//   };

//   const startEditScholarship = (scholarship) => {
//     setEditingScholarship(scholarship.id);
//     setScholarshipForm({
//       title: scholarship.title,
//       description: scholarship.description,
//       amount: scholarship.amount,
//       deadline: scholarship.deadline.split('T')[0], // Format date
//       eligibility: scholarship.eligibility_text || '',
//       provider: scholarship.provider,
//       category: scholarship.category_eligible || '',
//       education_level: scholarship.education_level || '',
//       gender: scholarship.gender_eligible || '',
//       min_percentage: scholarship.min_percentage || '',
//       max_income: scholarship.max_income || '',
//       apply_link: scholarship.apply_link || ''
//     });
//     setShowScholarshipForm(true);
//   };

//   const resetScholarshipForm = () => {
//     setScholarshipForm({
//       title: '',
//       description: '',
//       amount: '',
//       deadline: '',
//       eligibility: '',
//       provider: '',
//       category: '',
//       education_level: '',
//       gender: '',
//       min_percentage: '',
//       max_income: '',
//       apply_link: ''
//     });
//     setEditingScholarship(null);
//   };

//   const handleCSVUpload = async (e) => {
//     e.preventDefault();
//     if (!csvFile) {
//       alert('Please select a CSV file');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       try {
//         const text = event.target.result;
//         const lines = text.split('\n');
//         const headers = lines[0].split(',').map(h => h.trim());
        
//         const scholarships = [];
//         for (let i = 1; i < lines.length; i++) {
//           if (!lines[i].trim()) continue;
          
//           const values = lines[i].split(',').map(v => v.trim());
//           const scholarship = {};
//           headers.forEach((header, index) => {
//             scholarship[header] = values[index] || null;
//           });
//           scholarships.push(scholarship);
//         }

//         const response = await api.post('/admin/scholarships/bulk-upload', { scholarships });
//         alert(response.data.message);
//         setCsvFile(null);
//         fetchScholarships();
//         fetchStats();
//       } catch (err) {
//         alert('Failed to upload CSV');
//       }
//     };
//     reader.readAsText(csvFile);
//   };

//   const handleBanUser = async (userId, currentBanStatus) => {
//     const action = currentBanStatus ? 'unban' : 'ban';
//     const reason = prompt(`Reason for ${action}ing this user:`);
//     if (reason === null) return;

//     try {
//       await api.put(`/admin/users/${userId}/ban`, { action, reason });
//       alert(`User ${action}ned successfully!`);
//       fetchAllUsers();
//     } catch (err) {
//       alert(`Failed to ${action} user`);
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'pending': return 'badge-pending';
//       case 'applied': return 'badge-applied';
//       case 'won': return 'badge-won';
//       case 'rejected': return 'badge-rejected';
//       default: return 'badge-default';
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
//             Welcome, {user?.name}! Comprehensive platform management.
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Enhanced Statistics */}
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

//         {/* Navigation Tabs */}
//         <div className="admin-tabs">
//           <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
//             <i className="bi bi-grid-3x3-gap me-2"></i>Overview
//           </button>
//           <button className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
//             <i className="bi bi-people me-2"></i>Students
//           </button>
//           <button className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`} onClick={() => setActiveTab('mentors')}>
//             <i className="bi bi-person-badge me-2"></i>Mentors
//           </button>
//           <button className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
//             <i className="bi bi-file-earmark-text me-2"></i>Applications
//           </button>
//           <button className={`tab-btn ${activeTab === 'scholarships' ? 'active' : ''}`} onClick={() => setActiveTab('scholarships')}>
//             <i className="bi bi-award me-2"></i>Scholarships
//           </button>
//           <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
//             <i className="bi bi-person-gear me-2"></i>User Management
//           </button>
//           <button className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
//             <i className="bi bi-clock-history me-2"></i>Activity Logs
//           </button>
//         </div>

//         {/* OVERVIEW TAB - Pending Mentors */}
//         {activeTab === 'overview' && (
//           <div className="admin-section">
//             <h2 className="section-title">
//               <i className="bi bi-hourglass-split me-2"></i>
//               Pending Mentor Verifications
//               {pendingMentors.length > 0 && <span className="badge-count">{pendingMentors.length}</span>}
//             </h2>

//             {loading && (
//               <div className="loading-container">
//                 <div className="spinner-border text-primary"></div>
//                 <p className="mt-3">Loading...</p>
//               </div>
//             )}

//             {!loading && pendingMentors.length === 0 && (
//               <div className="empty-state">
//                 <i className="bi bi-check-circle"></i>
//                 <h3>All Clear!</h3>
//                 <p>No pending mentor verifications.</p>
//               </div>
//             )}

//             {!loading && pendingMentors.length > 0 && (
//               <div className="mentors-table">
//                 {pendingMentors.map(mentor => (
//                   <div key={mentor.id} className="mentor-verification-card">
//                     <div className="mentor-info-section">
//                       <div className="mentor-avatar-admin">
//                         <img
//                           src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=80`}
//                           alt={mentor.name}
//                         />
//                       </div>
//                       <div className="mentor-details">
//                         <h4>{mentor.name}</h4>
//                         <p><i className="bi bi-envelope me-2"></i>{mentor.email}</p>
//                         <p><i className="bi bi-lightbulb me-2"></i><strong>Expertise:</strong> {mentor.expertise}</p>
//                         <p><i className="bi bi-award me-2"></i><strong>Experience:</strong> {mentor.experience_years} years</p>
//                         {mentor.bio && <p className="mentor-bio-admin"><i className="bi bi-file-text me-2"></i>{mentor.bio}</p>}
//                       </div>
//                     </div>
//                     <div className="verification-actions">
//                       <button className="btn-verify" onClick={() => handleVerifyMentor(mentor.id, 'verify')}>
//                         <i className="bi bi-check-circle-fill me-2"></i>Verify
//                       </button>
//                       <button className="btn-reject-admin" onClick={() => handleVerifyMentor(mentor.id, 'reject')}>
//                         <i className="bi bi-x-circle-fill me-2"></i>Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* STUDENTS TAB */}
//         {activeTab === 'students' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-people me-2"></i>All Students</h2>
//             {allStudents.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Students Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Education</th>
//                       <th>Location</th>
//                       <th>Profile</th>
//                       <th>Applications</th>
//                       <th>Won</th>
//                       <th>Mentors</th>
//                       <th>Joined</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allStudents.map(student => (
//                       <tr key={student.id}>
//                         <td><strong>{student.name}</strong></td>
//                         <td>{student.email}</td>
//                         <td>{student.education_level || 'N/A'}</td>
//                         <td>{student.city && student.state ? `${student.city}, ${student.state}` : 'N/A'}</td>
//                         <td>
//                           <span className={`profile-badge ${student.profile_completed ? 'completed' : 'incomplete'}`}>
//                             {student.profile_completed ? '✓ Complete' : '✗ Incomplete'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{student.total_applications}</span></td>
//                         <td><span className="count-badge won-badge">{student.won_scholarships}</span></td>
//                         <td><span className="count-badge">{student.connected_mentors}</span></td>
//                         <td>{new Date(student.created_at).toLocaleDateString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* MENTORS TAB */}
//         {activeTab === 'mentors' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-person-badge me-2"></i>All Mentors</h2>
//             {allMentors.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Mentors Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Expertise</th>
//                       <th>Experience</th>
//                       <th>Charge</th>
//                       <th>Status</th>
//                       <th>Requests</th>
//                       <th>Students</th>
//                       <th>Joined</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allMentors.map(mentor => (
//                       <tr key={mentor.id}>
//                         <td><strong>{mentor.name}</strong></td>
//                         <td>{mentor.email}</td>
//                         <td>{mentor.expertise}</td>
//                         <td>{mentor.experience_years} years</td>
//                         <td>₹{mentor.charge_per_session}/session</td>
//                         <td>
//                           <span className={`status-badge ${mentor.verified ? 'verified' : 'pending'}`}>
//                             {mentor.verified ? '✓ Verified' : '⏳ Pending'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{mentor.total_requests}</span></td>
//                         <td><span className="count-badge won-badge">{mentor.accepted_students}</span></td>
//                         <td>{new Date(mentor.created_at).toLocaleDateString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* APPLICATIONS TAB */}
//         {activeTab === 'applications' && (
//           <div className="admin-section">
//             <div className="section-header-with-filter">
//               <h2 className="section-title"><i className="bi bi-file-earmark-text me-2"></i>Applications Overview</h2>
//               <select className="filter-select-admin" value={applicationFilter} onChange={(e) => setApplicationFilter(e.target.value)}>
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="applied">Applied</option>
//                 <option value="won">Won</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//             </div>

//             {applications.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-file-earmark-x"></i><h3>No Applications Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Email</th>
//                       <th>Scholarship</th>
//                       <th>Amount</th>
//                       <th>Provider</th>
//                       <th>Status</th>
//                       <th>Applied Date</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {applications.map(app => (
//                       <tr key={app.id}>
//                         <td><strong>{app.student_name}</strong></td>
//                         <td>{app.student_email}</td>
//                         <td>{app.scholarship_title}</td>
//                         <td>₹{app.scholarship_amount?.toLocaleString('en-IN')}</td>
//                         <td>{app.provider}</td>
//                         <td>
//                           <span className={`application-status-badge ${getStatusBadgeClass(app.status)}`}>
//                             {app.status.toUpperCase()}
//                           </span>
//                         </td>
//                         <td>{new Date(app.applied_at).toLocaleDateString('en-IN')}</td>
//                         <td>
//                           <div className="action-buttons">
//                             {app.status !== 'won' && (
//                               <button className="btn-action-sm btn-won" onClick={() => handleUpdateApplicationStatus(app.id, 'won')} title="Mark as Won">
//                                 <i className="bi bi-trophy-fill"></i>
//                               </button>
//                             )}
//                             {app.status !== 'rejected' && (
//                               <button className="btn-action-sm btn-reject" onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')} title="Mark as Rejected">
//                                 <i className="bi bi-x-circle-fill"></i>
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* SCHOLARSHIPS TAB */}
//         {activeTab === 'scholarships' && (
//           <div className="admin-section">
//             <div className="section-header-with-filter">
//               <h2 className="section-title"><i className="bi bi-award me-2"></i>Scholarship Management</h2>
//               <div className="scholarship-actions-group">
//                 <button className="btn-add-scholarship" onClick={() => { setShowScholarshipForm(true); resetScholarshipForm(); }}>
//                   <i className="bi bi-plus-circle me-2"></i>Add Scholarship
//                 </button>
//                 <label className="btn-upload-csv">
//                   <i className="bi bi-upload me-2"></i>Bulk Upload CSV
//                   <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} style={{display: 'none'}} />
//                 </label>
//                 {csvFile && (
//                   <button className="btn-process-csv" onClick={handleCSVUpload}>
//                     <i className="bi bi-check-circle me-2"></i>Process {csvFile.name}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Scholarship Form Modal */}
//             {showScholarshipForm && (
//               <div className="modal-overlay" onClick={() => setShowScholarshipForm(false)}>
//                 <div className="modal-content scholarship-form-modal" onClick={(e) => e.stopPropagation()}>
//                   <div className="modal-header">
//                     <h3>{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h3>
//                     <button className="modal-close" onClick={() => setShowScholarshipForm(false)}>×</button>
//                   </div>
//                   <form onSubmit={editingScholarship ? handleEditScholarship : handleAddScholarship}>
//                     <div className="form-grid">
//                       <div className="form-group">
//                         <label>Title *</label>
//                         <input type="text" name="title" value={scholarshipForm.title} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group">
//                         <label>Provider *</label>
//                         <input type="text" name="provider" value={scholarshipForm.provider} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group">
//                         <label>Amount (₹) *</label>
//                         <input type="number" name="amount" value={scholarshipForm.amount} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group">
//                         <label>Deadline *</label>
//                         <input type="date" name="deadline" value={scholarshipForm.deadline} onChange={handleScholarshipFormChange} required />
//                       </div>
//                       <div className="form-group full-width">
//                         <label>Description *</label>
//                         <textarea name="description" value={scholarshipForm.description} onChange={handleScholarshipFormChange} rows="4" required />
//                       </div>
//                       <div className="form-group">
//                         <label>Category</label>
//                         <input type="text" name="category" value={scholarshipForm.category} onChange={handleScholarshipFormChange} placeholder="Merit, Need-based, etc." />
//                       </div>
//                       <div className="form-group">
//                         <label>Education Level</label>
//                         <select name="education_level" value={scholarshipForm.education_level} onChange={handleScholarshipFormChange}>
//                           <option value="">Any</option>
//                           <option value="undergraduate">Undergraduate</option>
//                           <option value="postgraduate">Postgraduate</option>
//                           <option value="doctorate">Doctorate</option>
//                         </select>
//                       </div>
//                       <div className="form-group">
//                         <label>Gender</label>
//                         <select name="gender" value={scholarshipForm.gender} onChange={handleScholarshipFormChange}>
//                           <option value="">Any</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                       <div className="form-group">
//                         <label>Min Percentage</label>
//                         <input type="number" name="min_percentage" value={scholarshipForm.min_percentage} onChange={handleScholarshipFormChange} placeholder="e.g., 60" />
//                       </div>
//                       <div className="form-group">
//                         <label>Max Family Income</label>
//                         <input type="number" name="max_income" value={scholarshipForm.max_income} onChange={handleScholarshipFormChange} placeholder="e.g., 500000" />
//                       </div>
//                       <div className="form-group">
//                         <label>Apply Link</label>
//                         <input type="url" name="apply_link" value={scholarshipForm.apply_link} onChange={handleScholarshipFormChange} placeholder="https://..." />
//                       </div>
//                       <div className="form-group full-width">
//                         <label>Eligibility Criteria</label>
//                         <textarea name="eligibility" value={scholarshipForm.eligibility} onChange={handleScholarshipFormChange} rows="3" placeholder="Detailed eligibility requirements..." />
//                       </div>
//                     </div>
//                     <div className="form-actions">
//                       <button type="button" className="btn-cancel" onClick={() => setShowScholarshipForm(false)}>Cancel</button>
//                       <button type="submit" className="btn-submit">
//                         <i className="bi bi-check-circle me-2"></i>{editingScholarship ? 'Update' : 'Add'} Scholarship
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Scholarships Table */}
//             {scholarships.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-award"></i><h3>No Scholarships Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Title</th>
//                       <th>Provider</th>
//                       <th>Amount</th>
//                       <th>Deadline</th>
//                       <th>Applications</th>
//                       <th>Won</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {scholarships.map(scholarship => (
//                       <tr key={scholarship.id}>
//                         <td><strong>{scholarship.title}</strong></td>
//                         <td>{scholarship.provider}</td>
//                         <td>₹{scholarship.amount?.toLocaleString('en-IN')}</td>
//                         <td>{new Date(scholarship.deadline).toLocaleDateString('en-IN')}</td>
//                         <td><span className="count-badge">{scholarship.total_applications || 0}</span></td>
//                         <td><span className="count-badge won-badge">{scholarship.won_count || 0}</span></td>
//                         <td>
//                           <div className="action-buttons">
//                             <button className="btn-action-sm btn-edit" onClick={() => startEditScholarship(scholarship)} title="Edit">
//                               <i className="bi bi-pencil-fill"></i>
//                             </button>
//                             <button className="btn-action-sm btn-delete" onClick={() => handleDeleteScholarship(scholarship.id)} title="Delete">
//                               <i className="bi bi-trash-fill"></i>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* USER MANAGEMENT TAB */}
//         {activeTab === 'users' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-person-gear me-2"></i>User Management</h2>
//             {allUsers.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Users Found</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Role</th>
//                       <th>Status</th>
//                       <th>Activity Count</th>
//                       <th>Joined</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allUsers.map(usr => (
//                       <tr key={usr.id}>
//                         <td><strong>{usr.name}</strong></td>
//                         <td>{usr.email}</td>
//                         <td><span className="role-badge">{usr.role.toUpperCase()}</span></td>
//                         <td>
//                           <span className={`ban-status-badge ${usr.is_banned ? 'banned' : 'active'}`}>
//                             {usr.is_banned ? '🚫 Banned' : '✓ Active'}
//                           </span>
//                         </td>
//                         <td><span className="count-badge">{usr.activity_count}</span></td>
//                         <td>{new Date(usr.created_at).toLocaleDateString('en-IN')}</td>
//                         <td>
//                           <button 
//                             className={`btn-action-sm ${usr.is_banned ? 'btn-unban' : 'btn-ban'}`} 
//                             onClick={() => handleBanUser(usr.id, usr.is_banned)}
//                             title={usr.is_banned ? 'Unban User' : 'Ban User'}
//                           >
//                             <i className={`bi ${usr.is_banned ? 'bi-unlock-fill' : 'bi-ban'}`}></i>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ACTIVITY LOGS TAB */}
//         {activeTab === 'activity' && (
//           <div className="admin-section">
//             <h2 className="section-title"><i className="bi bi-clock-history me-2"></i>Recent Activity Logs</h2>
//             {activityLogs.length === 0 ? (
//               <div className="empty-state"><i className="bi bi-clock"></i><h3>No Activity Logs</h3></div>
//             ) : (
//               <div className="data-table-container">
//                 <table className="admin-data-table">
//                   <thead>
//                     <tr>
//                       <th>User</th>
//                       <th>Role</th>
//                       <th>Action</th>
//                       <th>Details</th>
//                       <th>Admin</th>
//                       <th>Timestamp</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {activityLogs.map(log => (
//                       <tr key={log.id}>
//                         <td><strong>{log.user_name}</strong><br/><small>{log.user_email}</small></td>
//                         <td><span className="role-badge">{log.user_role.toUpperCase()}</span></td>
//                         <td><span className="action-badge">{log.action}</span></td>
//                         <td><small>{log.details ? JSON.parse(log.details).reason || 'N/A' : 'N/A'}</small></td>
//                         <td>{log.admin_name || 'System'}</td>
//                         <td>{new Date(log.created_at).toLocaleString('en-IN')}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
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
  
  // State
  const [stats, setStats] = useState(null);
  const [pendingMentors, setPendingMentors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allMentors, setAllMentors] = useState([]);
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Scholarship form state
  const [showScholarshipForm, setShowScholarshipForm] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [scholarshipForm, setScholarshipForm] = useState({
    title: '',
    description: '',
    amount: '',
    deadline: '',
    eligibility: '',
    provider: '',
    category: '',
    education_level: '',
    gender: '',
    min_percentage: '',
    max_income: '',
    apply_link: ''
  });

  // CSV Upload state
  const [csvFile, setCsvFile] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchPendingMentors();
    if (activeTab === 'students') fetchAllStudents();
    if (activeTab === 'mentors') fetchAllMentors();
    if (activeTab === 'applications') fetchApplications();
    if (activeTab === 'scholarships') fetchScholarships();
    if (activeTab === 'users') fetchAllUsers();
    if (activeTab === 'activity') fetchActivityLogs();
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

  const fetchScholarships = async () => {
    try {
      const response = await api.get('/admin/scholarships');
      setScholarships(response.data.data);
    } catch (err) {
      console.error('Fetch scholarships error:', err);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setAllUsers(response.data.data);
    } catch (err) {
      console.error('Fetch users error:', err);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const response = await api.get('/admin/activity-logs?limit=100');
      setActivityLogs(response.data.data);
    } catch (err) {
      console.error('Fetch activity logs error:', err);
    }
  };

  const handleVerifyMentor = async (mentorId, action) => {
    const confirmMessage = action === 'verify'
      ? 'Are you sure you want to verify this mentor?'
      : 'Are you sure you want to reject this mentor?';

    if (!window.confirm(confirmMessage)) return;

    try {
      await api.put(`/admin/mentors/${mentorId}/verify`, { action });
      alert(action === 'verify' ? 'Mentor verified!' : 'Mentor rejected!');
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
      alert('Application status updated!');
      fetchApplications();
      fetchStats();
    } catch (err) {
      alert('Failed to update application status');
    }
  };

  const handleScholarshipFormChange = (e) => {
    setScholarshipForm({
      ...scholarshipForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddScholarship = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/scholarships', scholarshipForm);
      alert('Scholarship added successfully!');
      setShowScholarshipForm(false);
      resetScholarshipForm();
      fetchScholarships();
      fetchStats();
    } catch (err) {
      alert('Failed to add scholarship');
    }
  };

  const handleEditScholarship = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/scholarships/${editingScholarship}`, scholarshipForm);
      alert('Scholarship updated successfully!');
      setEditingScholarship(null);
      setShowScholarshipForm(false);
      resetScholarshipForm();
      fetchScholarships();
    } catch (err) {
      alert('Failed to update scholarship');
    }
  };

  const handleDeleteScholarship = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scholarship? This action cannot be undone.')) return;

    try {
      await api.delete(`/admin/scholarships/${id}`);
      alert('Scholarship deleted successfully!');
      fetchScholarships();
      fetchStats();
    } catch (err) {
      alert('Failed to delete scholarship');
    }
  };

  const startEditScholarship = (scholarship) => {
    setEditingScholarship(scholarship.id);
    setScholarshipForm({
      title: scholarship.title,
      description: scholarship.description,
      amount: scholarship.amount,
      deadline: scholarship.deadline.split('T')[0], // Format date
      eligibility: scholarship.eligibility_text || '',
      provider: scholarship.provider,
      category: scholarship.category_eligible || '',
      education_level: scholarship.education_level_eligible || '',
      gender: scholarship.gender_eligible || '',
      min_percentage: scholarship.min_percentage || '',
      max_income: scholarship.max_income || '',
      apply_link: scholarship.apply_link || ''
    });
    setShowScholarshipForm(true);
  };

  const resetScholarshipForm = () => {
    setScholarshipForm({
      title: '',
      description: '',
      amount: '',
      deadline: '',
      eligibility: '',
      provider: '',
      category: '',
      education_level: '',
      gender: '',
      min_percentage: '',
      max_income: '',
      apply_link: ''
    });
    setEditingScholarship(null);
  };

  const handleCSVUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      alert('Please select a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const scholarships = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',').map(v => v.trim());
          const scholarship = {};
          headers.forEach((header, index) => {
            scholarship[header] = values[index] || null;
          });
          scholarships.push(scholarship);
        }

        const response = await api.post('/admin/scholarships/bulk-upload', { scholarships });
        alert(response.data.message);
        setCsvFile(null);
        fetchScholarships();
        fetchStats();
      } catch (err) {
        alert('Failed to upload CSV');
      }
    };
    reader.readAsText(csvFile);
  };

  const handleBanUser = async (userId, currentBanStatus) => {
    const action = currentBanStatus ? 'unban' : 'ban';
    const reason = prompt(`Reason for ${action}ing this user:`);
    if (reason === null) return;

    try {
      await api.put(`/admin/users/${userId}/ban`, { action, reason });
      alert(`User ${action}ned successfully!`);
      fetchAllUsers();
    } catch (err) {
      alert(`Failed to ${action} user`);
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
            Welcome, {user?.name}! Comprehensive platform management.
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Enhanced Statistics */}
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
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <i className="bi bi-grid-3x3-gap me-2"></i>Overview
          </button>
          <button className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
            <i className="bi bi-people me-2"></i>Students
          </button>
          <button className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`} onClick={() => setActiveTab('mentors')}>
            <i className="bi bi-person-badge me-2"></i>Mentors
          </button>
          <button className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
            <i className="bi bi-file-earmark-text me-2"></i>Applications
          </button>
          <button className={`tab-btn ${activeTab === 'scholarships' ? 'active' : ''}`} onClick={() => setActiveTab('scholarships')}>
            <i className="bi bi-award me-2"></i>Scholarships
          </button>
          <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <i className="bi bi-person-gear me-2"></i>User Management
          </button>
          <button className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
            <i className="bi bi-clock-history me-2"></i>Activity Logs
          </button>
        </div>

        {/* OVERVIEW TAB - Pending Mentors */}
        {activeTab === 'overview' && (
          <div className="admin-section">
            <h2 className="section-title">
              <i className="bi bi-hourglass-split me-2"></i>
              Pending Mentor Verifications
              {pendingMentors.length > 0 && <span className="badge-count">{pendingMentors.length}</span>}
            </h2>

            {loading && (
              <div className="loading-container">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading...</p>
              </div>
            )}

            {!loading && pendingMentors.length === 0 && (
              <div className="empty-state">
                <i className="bi bi-check-circle"></i>
                <h3>All Clear!</h3>
                <p>No pending mentor verifications.</p>
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
                        <p><i className="bi bi-envelope me-2"></i>{mentor.email}</p>
                        <p><i className="bi bi-lightbulb me-2"></i><strong>Expertise:</strong> {mentor.expertise}</p>
                        <p><i className="bi bi-award me-2"></i><strong>Experience:</strong> {mentor.experience_years} years</p>
                        {mentor.bio && <p className="mentor-bio-admin"><i className="bi bi-file-text me-2"></i>{mentor.bio}</p>}
                      </div>
                    </div>
                    <div className="verification-actions">
                      <button className="btn-verify" onClick={() => handleVerifyMentor(mentor.id, 'verify')}>
                        <i className="bi bi-check-circle-fill me-2"></i>Verify
                      </button>
                      <button className="btn-reject-admin" onClick={() => handleVerifyMentor(mentor.id, 'reject')}>
                        <i className="bi bi-x-circle-fill me-2"></i>Reject
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
            <h2 className="section-title"><i className="bi bi-people me-2"></i>All Students</h2>
            {allStudents.length === 0 ? (
              <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Students Found</h3></div>
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
            <h2 className="section-title"><i className="bi bi-person-badge me-2"></i>All Mentors</h2>
            {allMentors.length === 0 ? (
              <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Mentors Found</h3></div>
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
              <h2 className="section-title"><i className="bi bi-file-earmark-text me-2"></i>Applications Overview</h2>
              <select className="filter-select-admin" value={applicationFilter} onChange={(e) => setApplicationFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="applied">Applied</option>
                <option value="won">Won</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {applications.length === 0 ? (
              <div className="empty-state"><i className="bi bi-file-earmark-x"></i><h3>No Applications Found</h3></div>
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
                              <button className="btn-action-sm btn-won" onClick={() => handleUpdateApplicationStatus(app.id, 'won')} title="Mark as Won">
                                <i className="bi bi-trophy-fill"></i>
                              </button>
                            )}
                            {app.status !== 'rejected' && (
                              <button className="btn-action-sm btn-reject" onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')} title="Mark as Rejected">
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

        {/* SCHOLARSHIPS TAB */}
        {activeTab === 'scholarships' && (
          <div className="admin-section">
            <div className="section-header-with-filter">
              <h2 className="section-title"><i className="bi bi-award me-2"></i>Scholarship Management</h2>
              <div className="scholarship-actions-group">
                <button className="btn-add-scholarship" onClick={() => { setShowScholarshipForm(true); resetScholarshipForm(); }}>
                  <i className="bi bi-plus-circle me-2"></i>Add Scholarship
                </button>
                <label className="btn-upload-csv">
                  <i className="bi bi-upload me-2"></i>Bulk Upload CSV
                  <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} style={{display: 'none'}} />
                </label>
                {csvFile && (
                  <button className="btn-process-csv" onClick={handleCSVUpload}>
                    <i className="bi bi-check-circle me-2"></i>Process {csvFile.name}
                  </button>
                )}
              </div>
            </div>

            {/* Scholarship Form Modal */}
            {showScholarshipForm && (
              <div className="modal-overlay" onClick={() => setShowScholarshipForm(false)}>
                <div className="modal-content scholarship-form-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h3>
                    <button className="modal-close" onClick={() => setShowScholarshipForm(false)}>×</button>
                  </div>
                  <form onSubmit={editingScholarship ? handleEditScholarship : handleAddScholarship}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Title *</label>
                        <input type="text" name="title" value={scholarshipForm.title} onChange={handleScholarshipFormChange} required />
                      </div>
                      <div className="form-group">
                        <label>Provider *</label>
                        <input type="text" name="provider" value={scholarshipForm.provider} onChange={handleScholarshipFormChange} required />
                      </div>
                      <div className="form-group">
                        <label>Amount (₹) *</label>
                        <input type="number" name="amount" value={scholarshipForm.amount} onChange={handleScholarshipFormChange} required />
                      </div>
                      <div className="form-group">
                        <label>Deadline *</label>
                        <input type="date" name="deadline" value={scholarshipForm.deadline} onChange={handleScholarshipFormChange} required />
                      </div>
                      <div className="form-group full-width">
                        <label>Description *</label>
                        <textarea name="description" value={scholarshipForm.description} onChange={handleScholarshipFormChange} rows="4" required />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <input type="text" name="category" value={scholarshipForm.category} onChange={handleScholarshipFormChange} placeholder="Merit, Need-based, etc." />
                      </div>
                      <div className="form-group">
                        <label>Education Level</label>
                        <select name="education_level" value={scholarshipForm.education_level} onChange={handleScholarshipFormChange}>
                          <option value="">Any</option>
                          <option value="undergraduate">Undergraduate</option>
                          <option value="postgraduate">Postgraduate</option>
                          <option value="doctorate">Doctorate</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={scholarshipForm.gender} onChange={handleScholarshipFormChange}>
                          <option value="">Any</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Min Percentage</label>
                        <input type="number" name="min_percentage" value={scholarshipForm.min_percentage} onChange={handleScholarshipFormChange} placeholder="e.g., 60" />
                      </div>
                      <div className="form-group">
                        <label>Max Family Income</label>
                        <input type="number" name="max_income" value={scholarshipForm.max_income} onChange={handleScholarshipFormChange} placeholder="e.g., 500000" />
                      </div>
                      <div className="form-group">
                        <label>Apply Link</label>
                        <input type="url" name="apply_link" value={scholarshipForm.apply_link} onChange={handleScholarshipFormChange} placeholder="https://..." />
                      </div>
                      <div className="form-group full-width">
                        <label>Eligibility Criteria</label>
                        <textarea name="eligibility" value={scholarshipForm.eligibility} onChange={handleScholarshipFormChange} rows="3" placeholder="Detailed eligibility requirements..." />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="button" className="btn-cancel" onClick={() => setShowScholarshipForm(false)}>Cancel</button>
                      <button type="submit" className="btn-submit">
                        <i className="bi bi-check-circle me-2"></i>{editingScholarship ? 'Update' : 'Add'} Scholarship
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Scholarships Table */}
            {scholarships.length === 0 ? (
              <div className="empty-state"><i className="bi bi-award"></i><h3>No Scholarships Found</h3></div>
            ) : (
              <div className="data-table-container">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Provider</th>
                      <th>Amount</th>
                      <th>Deadline</th>
                      <th>Applications</th>
                      <th>Won</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scholarships.map(scholarship => (
                      <tr key={scholarship.id}>
                        <td><strong>{scholarship.title}</strong></td>
                        <td>{scholarship.provider}</td>
                        <td>₹{scholarship.amount?.toLocaleString('en-IN')}</td>
                        <td>{new Date(scholarship.deadline).toLocaleDateString('en-IN')}</td>
                        <td><span className="count-badge">{scholarship.total_applications || 0}</span></td>
                        <td><span className="count-badge won-badge">{scholarship.won_count || 0}</span></td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-action-sm btn-edit" onClick={() => startEditScholarship(scholarship)} title="Edit">
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button className="btn-action-sm btn-delete" onClick={() => handleDeleteScholarship(scholarship.id)} title="Delete">
                              <i className="bi bi-trash-fill"></i>
                            </button>
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

        {/* USER MANAGEMENT TAB */}
        {activeTab === 'users' && (
          <div className="admin-section">
            <h2 className="section-title"><i className="bi bi-person-gear me-2"></i>User Management</h2>
            {allUsers.length === 0 ? (
              <div className="empty-state"><i className="bi bi-person-x"></i><h3>No Users Found</h3></div>
            ) : (
              <div className="data-table-container">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Activity Count</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map(usr => (
                      <tr key={usr.id}>
                        <td><strong>{usr.name}</strong></td>
                        <td>{usr.email}</td>
                        <td><span className="role-badge">{usr.role.toUpperCase()}</span></td>
                        <td>
                          <span className={`ban-status-badge ${usr.is_banned ? 'banned' : 'active'}`}>
                            {usr.is_banned ? '🚫 Banned' : '✓ Active'}
                          </span>
                        </td>
                        <td><span className="count-badge">{usr.activity_count}</span></td>
                        <td>{new Date(usr.created_at).toLocaleDateString('en-IN')}</td>
                        <td>
                          <button 
                            className={`btn-action-sm ${usr.is_banned ? 'btn-unban' : 'btn-ban'}`} 
                            onClick={() => handleBanUser(usr.id, usr.is_banned)}
                            title={usr.is_banned ? 'Unban User' : 'Ban User'}
                          >
                            <i className={`bi ${usr.is_banned ? 'bi-unlock-fill' : 'bi-ban'}`}></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ACTIVITY LOGS TAB */}
        {activeTab === 'activity' && (
          <div className="admin-section">
            <h2 className="section-title"><i className="bi bi-clock-history me-2"></i>Recent Activity Logs</h2>
            {activityLogs.length === 0 ? (
              <div className="empty-state"><i className="bi bi-clock"></i><h3>No Activity Logs</h3></div>
            ) : (
              <div className="data-table-container">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Action</th>
                      <th>Details</th>
                      <th>Admin</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLogs.map(log => (
                      <tr key={log.id}>
                        <td><strong>{log.user_name}</strong><br/><small>{log.user_email}</small></td>
                        <td><span className="role-badge">{log.user_role.toUpperCase()}</span></td>
                        <td><span className="action-badge">{log.action}</span></td>
                        <td><small>{log.details ? JSON.parse(log.details).reason || 'N/A' : 'N/A'}</small></td>
                        <td>{log.admin_name || 'System'}</td>
                        <td>{new Date(log.created_at).toLocaleString('en-IN')}</td>
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