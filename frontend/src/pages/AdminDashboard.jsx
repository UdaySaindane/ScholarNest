import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
    fetchPendingMentors();
  }, []);

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

  const handleVerifyMentor = async (mentorId, action) => {
    const confirmMessage = action === 'verify' 
      ? 'Are you sure you want to verify this mentor?' 
      : 'Are you sure you want to reject this mentor? This will remove their account.';

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await api.put(`/admin/mentors/${mentorId}/verify`, { action });
      alert(action === 'verify' ? 'Mentor verified successfully!' : 'Mentor rejected and removed.');
      fetchPendingMentors(); // Refresh list
      fetchStats(); // Update stats
    } catch (err) {
      alert('Failed to process mentor verification');
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
            Welcome, {user?.name}! Manage platform operations and verify mentors.
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Statistics Overview */}
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

        {/* Pending Mentor Verifications */}
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

          {error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {!loading && !error && pendingMentors.length === 0 && (
            <div className="empty-state">
              <i className="bi bi-check-circle"></i>
              <h3>All Clear!</h3>
              <p>No pending mentor verifications at the moment.</p>
            </div>
          )}

          {!loading && !error && pendingMentors.length > 0 && (
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
                      {mentor.charge_per_session && (
                        <p className="mentor-charge-admin">
                          <i className="bi bi-currency-rupee me-2"></i>
                          <strong>Charges:</strong> ₹{mentor.charge_per_session} per session
                        </p>
                      )}
                      {mentor.bio && (
                        <p className="mentor-bio-admin">
                          <i className="bi bi-file-text me-2"></i>
                          <strong>Bio:</strong> {mentor.bio}
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

        {/* Quick Actions */}
        <div className="admin-section mt-5">
          <h2 className="section-title">
            <i className="bi bi-lightning-fill me-2"></i>
            Quick Actions
          </h2>
          <div className="quick-actions-grid">
            <div className="action-card-admin">
              <i className="bi bi-award"></i>
              <h4>Manage Scholarships</h4>
              <p>Add, edit, or remove scholarships</p>
              <button className="btn-action-admin">Coming Soon</button>
            </div>
            <div className="action-card-admin">
              <i className="bi bi-people"></i>
              <h4>View All Users</h4>
              <p>Browse students and mentors</p>
              <button className="btn-action-admin">Coming Soon</button>
            </div>
            <div className="action-card-admin">
              <i className="bi bi-graph-up"></i>
              <h4>Analytics</h4>
              <p>View platform statistics</p>
              <button className="btn-action-admin">Coming Soon</button>
            </div>
            <div className="action-card-admin">
              <i className="bi bi-gear"></i>
              <h4>Settings</h4>
              <p>Configure platform settings</p>
              <button className="btn-action-admin">Coming Soon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;