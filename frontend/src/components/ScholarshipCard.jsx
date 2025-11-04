// src/components/ScholarshipCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ScholarshipCard.css';

function ScholarshipCard({ scholarship }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="scholarship-card">
      <div className="scholarship-card-header">
        <div className="scholarship-logo-container">
          <img 
            src={scholarship.logo || 'https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=Logo'} 
            alt={scholarship.organization} 
            className="scholarship-logo"
          />
        </div>
        <button 
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmark}
        >
          <i className={`bi ${isBookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
        </button>
      </div>

      <div className="scholarship-card-body">
        <div className="scholarship-badges">
          <span className="badge badge-match">
            <i className="bi bi-lightning-fill me-1"></i>
            {scholarship.matchPercentage}% Match
          </span>
          {scholarship.trending && (
            <span className="badge badge-trending">
              <i className="bi bi-graph-up me-1"></i>
              Trending
            </span>
          )}
        </div>

        <h3 className="scholarship-title">{scholarship.title}</h3>
        <p className="scholarship-organization">
          <i className="bi bi-building me-2"></i>
          {scholarship.organization}
        </p>

        <p className="scholarship-description">{scholarship.description}</p>

        <div className="scholarship-details">
          <div className="detail-item">
            <i className="bi bi-currency-rupee"></i>
            <div className="detail-content">
              <span className="detail-label">Amount</span>
              <span className="detail-value">{scholarship.amount}</span>
            </div>
          </div>

          <div className="detail-item">
            <i className="bi bi-calendar-event"></i>
            <div className="detail-content">
              <span className="detail-label">Deadline</span>
              <span className="detail-value">{scholarship.deadline}</span>
            </div>
          </div>

          <div className="detail-item">
            <i className="bi bi-people"></i>
            <div className="detail-content">
              <span className="detail-label">Applicants</span>
              <span className="detail-value">{scholarship.applicants}</span>
            </div>
          </div>

          <div className="detail-item">
            <i className="bi bi-mortarboard"></i>
            <div className="detail-content">
              <span className="detail-label">Eligibility</span>
              <span className="detail-value">{scholarship.eligibility}</span>
            </div>
          </div>
        </div>

        <div className="scholarship-tags">
          {scholarship.tags && scholarship.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="scholarship-card-footer">
        <Link to={`/scholarship/${scholarship.id}`} className="btn-view-details">
          <i className="bi bi-eye me-2"></i>
          View Details
        </Link>
        <button className="btn-apply">
          <i className="bi bi-file-earmark-text me-2"></i>
          Apply Now
        </button>
      </div>

      <div className="card-gradient-effect"></div>
    </div>
  );
}

export default ScholarshipCard;