import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './EligibilityChecker.css';

function EligibilityChecker() {
  const [recommendations, setRecommendations] = useState([]);
  const [allScholarships, setAllScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' or 'eligible'
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await api.get('/eligibility/recommendations');
      const data = response.data.data;
      
      setRecommendations(data.eligible);
      setAllScholarships(data.all);
      setStats({
        total: data.total_scholarships,
        eligible: data.eligible_count,
        percentage: Math.round((data.eligible_count / data.total_scholarships) * 100)
      });
    } catch (err) {
      console.error('Fetch recommendations error:', err);
      setError(err.response?.data?.message || 'Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 90) return '#28a745';
    if (score >= 75) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const displayedScholarships = filter === 'eligible' ? recommendations : allScholarships;

  if (loading) {
    return (
      <div className="eligibility-checker-page">
        <div className="checker-hero">
          <div className="container">
            <h1 className="page-title">
              <i className="bi bi-stars me-3"></i>
              Eligibility Checker
            </h1>
            <p className="page-subtitle">
              Discover scholarships that match your profile
            </p>
          </div>
        </div>

        <div className="container mt-5">
          <div className="loading-container">
            <div className="spinner-border text-primary"></div>
            <p className="mt-3">Analyzing your profile and matching scholarships...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="eligibility-checker-page">
        <div className="checker-hero">
          <div className="container">
            <h1 className="page-title">
              <i className="bi bi-stars me-3"></i>
              Eligibility Checker
            </h1>
            <p className="page-subtitle">
              Discover scholarships that match your profile
            </p>
          </div>
        </div>

        <div className="container mt-5">
          <div className="alert alert-warning">
            <div className="d-flex align-items-start">
              <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '2rem' }}></i>
              <div>
                <h4 className="alert-heading">Profile Required</h4>
                <p className="mb-3">{error}</p>
                <Link to="/profile" className="btn btn-primary">
                  <i className="bi bi-person-fill-gear me-2"></i>
                  Complete Your Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eligibility-checker-page">
      <div className="checker-hero">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-stars me-3"></i>
            Eligibility Checker
          </h1>
          <p className="page-subtitle">
            Based on your profile, we've found scholarships you're eligible for
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Statistics Cards */}
        {stats && (
          <div className="stats-grid mb-5">
            <div className="stat-card stat-total">
              <i className="bi bi-award-fill"></i>
              <div>
                <h3>{stats.total}</h3>
                <p>Total Scholarships</p>
              </div>
            </div>
            <div className="stat-card stat-eligible">
              <i className="bi bi-check-circle-fill"></i>
              <div>
                <h3>{stats.eligible}</h3>
                <p>You're Eligible For</p>
              </div>
            </div>
            <div className="stat-card stat-match">
              <i className="bi bi-percent"></i>
              <div>
                <h3>{stats.percentage}%</h3>
                <p>Match Rate</p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Scholarships ({allScholarships.length})
          </button>
          <button
            className={`filter-tab ${filter === 'eligible' ? 'active' : ''}`}
            onClick={() => setFilter('eligible')}
          >
            <i className="bi bi-check-circle me-2"></i>
            Eligible Only ({recommendations.length})
          </button>
        </div>

        {/* Scholarships Grid */}
        {displayedScholarships.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <h3>No Scholarships Found</h3>
            <p>Try updating your profile to see more matches</p>
            <Link to="/profile" className="btn btn-primary">
              Update Profile
            </Link>
          </div>
        ) : (
          <div className="scholarships-grid">
            {displayedScholarships.map((scholarship) => (
              <div key={scholarship.id} className="scholarship-card">
                <div className="match-badge" style={{ background: getMatchColor(scholarship.match_score) }}>
                  <i className="bi bi-check-circle me-1"></i>
                  {scholarship.match_score}% Match
                </div>

                {scholarship.match_score >= 50 && (
                  <div className="eligible-ribbon">
                    <i className="bi bi-patch-check-fill"></i>
                    Eligible
                  </div>
                )}

                <h3 className="scholarship-title">{scholarship.title}</h3>
                <p className="scholarship-provider">
                  <i className="bi bi-building me-2"></i>
                  {scholarship.provider}
                </p>

                <div className="scholarship-amount">
                  <i className="bi bi-currency-rupee"></i>
                  {scholarship.amount}
                </div>

                <div className="scholarship-meta">
                  <span className="meta-item">
                    <i className="bi bi-calendar-event"></i>
                    Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-IN')}
                  </span>
                </div>

                <div className="match-details">
                  <p className="match-details-title">
                    <i className="bi bi-info-circle me-2"></i>
                    Eligibility Status:
                  </p>
                  <div className="match-criteria">
                    {scholarship.match_details.map((detail, idx) => (
                      <div key={idx} className={`criteria-item ${detail.matched ? 'matched' : 'not-matched'}`}>
                        <i className={`bi ${detail.matched ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                        <span>{detail.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-actions">
                  <Link
                    to={`/scholarship/${scholarship.id}`}
                    className="btn btn-primary btn-block"
                  >
                    <i className="bi bi-eye me-2"></i>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EligibilityChecker;