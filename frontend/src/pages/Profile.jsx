import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileForm from '../components/ProfileForm';
import api from '../utils/api';
import './Profile.css';

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchProfileStatus();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data.data);
    } catch (err) {
      console.error('Fetch profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileStatus = async () => {
    try {
      const response = await api.get('/profile/status');
      setProfileStatus(response.data.data);
    } catch (err) {
      console.error('Fetch status error:', err);
    }
  };

  const handleProfileSuccess = (updatedProfile) => {
    setProfile(updatedProfile);
    setProfileStatus({ profile_completed: true, profile_exists: true });
    // Optionally redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-person-circle me-3"></i>
            My Profile
          </h1>
          <p className="page-subtitle">
            {profileStatus?.profile_completed 
              ? 'Update your information to stay eligible for scholarships' 
              : 'Complete your profile to start applying for scholarships'}
          </p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        {!profileStatus?.profile_completed && (
          <div className="alert alert-warning profile-alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>
              <strong>Profile Incomplete!</strong>
              <p className="mb-0">You need to complete your profile before applying for scholarships.</p>
            </div>
          </div>
        )}

        <ProfileForm 
          existingProfile={profile} 
          onSuccess={handleProfileSuccess}
        />
      </div>
    </div>
  );
}

export default Profile;