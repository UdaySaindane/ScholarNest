import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './MentorProfile.css';

function MentorProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    expertise: '',
    experience_years: '',
    bio: '',
    charge_per_session: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/mentors/profile');
      if (response.data.data) {
        const profile = response.data.data;
        setFormData({
          expertise: profile.expertise || '',
          experience_years: profile.experience_years || '',
          bio: profile.bio || '',
          charge_per_session: profile.charge_per_session || ''
        });
        setProfileExists(true);
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    // Validation
    if (!formData.expertise || !formData.experience_years || !formData.bio) {
      setError('Please fill in all required fields');
      setSaving(false);
      return;
    }

    try {
      const response = await api.put('/mentors/profile', formData);
      setSuccess(response.data.message);
      
      setTimeout(() => {
        navigate('/mentor/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mentor-profile-page">
      <div className="mentor-profile-hero">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-person-badge me-3"></i>
            {profileExists ? 'Update Your Profile' : 'Complete Your Profile'}
          </h1>
          <p className="page-subtitle">
            Fill in your details to help students find and connect with you
          </p>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        {!profileExists && (
          <div className="alert alert-warning">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Profile Incomplete!</strong> Complete your profile to get verified by admin and start mentoring students.
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            {success}
          </div>
        )}

        <div className="profile-form-container">
          <form onSubmit={handleSubmit} className="mentor-profile-form">
            {/* Expertise */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="bi bi-lightbulb me-2"></i>
                Professional Information
              </h3>

              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="expertise" className="form-label required">
                    Areas of Expertise
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="e.g., Engineering Scholarships, Study Abroad, Research Grants"
                    required
                  />
                  <small className="form-text text-muted">
                    Separate multiple areas with commas
                  </small>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="experience_years" className="form-label required">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="experience_years"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    min="0"
                    max="50"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="charge_per_session" className="form-label">
                    Charges Per Session (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="charge_per_session"
                    name="charge_per_session"
                    value={formData.charge_per_session}
                    onChange={handleChange}
                    placeholder="e.g., 500 (Leave blank for free)"
                    min="0"
                  />
                  <small className="form-text text-muted">
                    Leave blank if you want to mentor for free
                  </small>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="bi bi-file-text me-2"></i>
                About You
              </h3>

              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="bio" className="form-label required">
                    Professional Bio
                  </label>
                  <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell students about your experience, achievements, and how you can help them..."
                    required
                  ></textarea>
                  <small className="form-text text-muted">
                    Min 100 characters. This will be displayed on your mentor profile.
                  </small>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="form-actions">
              <button type="submit" className="btn-save-profile" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {profileExists ? 'Update Profile' : 'Complete Profile'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;