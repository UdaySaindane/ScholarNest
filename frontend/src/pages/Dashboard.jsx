

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