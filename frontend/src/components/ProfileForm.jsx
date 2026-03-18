import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './ProfileForm.css';

function ProfileForm({ existingProfile, onSuccess }) {
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    category: '',
    annual_family_income: '',
    education_level: '',
    course: '',
    field_of_study: '',
    current_year: '',
    percentage: '',
    cgpa: '',
    college_university: '',
    state: '',
    city: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Populate form if editing existing profile
  useEffect(() => {
    if (existingProfile) {
      setFormData({
        dob: existingProfile.dob || '',
        gender: existingProfile.gender || '',
        category: existingProfile.category || '',
        annual_family_income: existingProfile.annual_family_income || '',
        education_level: existingProfile.education_level || '',
        course: existingProfile.course || '',
        field_of_study: existingProfile.field_of_study || '',
        current_year: existingProfile.current_year || '',
        percentage: existingProfile.percentage || '',
        cgpa: existingProfile.cgpa || '',
        college_university: existingProfile.college_university || '',
        state: existingProfile.state || '',
        city: existingProfile.city || '',
        phone: existingProfile.phone || ''
      });
    }
  }, [existingProfile]);

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
    setLoading(true);

    try {
      const response = await api.post('/profile', formData);
      
      setSuccess(response.data.message);
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(response.data.data);
        }, 1500);
      }
    } catch (err) {
      console.error('Profile save error:', err);
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-container">
      <div className="profile-form-header">
        <h2>
          <i className="bi bi-person-circle me-2"></i>
          {existingProfile ? 'Update Your Profile' : 'Complete Your Profile'}
        </h2>
        <p>Fill in all required details to apply for scholarships</p>
      </div>

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

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Personal Information */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-person me-2"></i>
            Personal Information
          </h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="dob" className="form-label required">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label required">Gender</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="category" className="form-label required">Category</label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="Minority">Minority</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label required">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-currency-rupee me-2"></i>
            Financial Information
          </h3>

          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="annual_family_income" className="form-label required">
                Annual Family Income (in ₹)
              </label>
              <input
                type="number"
                className="form-control"
                id="annual_family_income"
                name="annual_family_income"
                value={formData.annual_family_income}
                onChange={handleChange}
                placeholder="e.g., 500000"
                min="0"
                required
              />
              <small className="form-text text-muted">
                Enter total annual family income for eligibility verification
              </small>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-mortarboard me-2"></i>
            Academic Information
          </h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="education_level" className="form-label required">
                Education Level
              </label>
              <select
                className="form-control"
                id="education_level"
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                required
              >
                <option value="">Select Level</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 12">Class 12</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="course" className="form-label required">Course/Stream</label>
              <select
                className="form-control"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Law">Law</option>
                <option value="Management">Management</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="field_of_study" className="form-label">Field of Study</label>
              <input
                type="text"
                className="form-control"
                id="field_of_study"
                name="field_of_study"
                value={formData.field_of_study}
                onChange={handleChange}
                placeholder="e.g., Computer Science, MBBS"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="current_year" className="form-label">Current Year</label>
              <select
                className="form-control"
                id="current_year"
                name="current_year"
                value={formData.current_year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="percentage" className="form-label">
                Percentage (Class 10/12)
              </label>
              <input
                type="number"
                className="form-control"
                id="percentage"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                placeholder="e.g., 85.5"
                step="0.01"
                min="0"
                max="100"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="cgpa" className="form-label">
                CGPA (College Students)
              </label>
              <input
                type="number"
                className="form-control"
                id="cgpa"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="e.g., 8.5"
                step="0.01"
                min="0"
                max="10"
              />
            </div>
          </div>
        </div>

        {/* Institution & Location */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-geo-alt me-2"></i>
            Institution & Location
          </h3>

          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="college_university" className="form-label required">
                College/University Name
              </label>
              <input
                type="text"
                className="form-control"
                id="college_university"
                name="college_university"
                value={formData.college_university}
                onChange={handleChange}
                placeholder="e.g., Delhi University"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="state" className="form-label required">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g., Delhi"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label required">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., New Delhi"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save-profile" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                {existingProfile ? 'Update Profile' : 'Complete Profile'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;