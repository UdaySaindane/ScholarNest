

import React, { useState, useEffect } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import api from '../utils/api';
import './Scholarships.css';

function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [selectedDeadline, setSelectedDeadline] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalScholarships, setTotalScholarships] = useState(0);

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'bi-grid' },
    { value: 'merit', label: 'Merit-Based', icon: 'bi-trophy' },
    { value: 'need', label: 'Need-Based', icon: 'bi-heart' },
    { value: 'women', label: 'Women', icon: 'bi-gender-female' },
    { value: 'research', label: 'Research', icon: 'bi-search' },
    { value: 'sports', label: 'Sports', icon: 'bi-award' },
    { value: 'minority', label: 'Minority', icon: 'bi-people' }
  ];

  // Fetch scholarships from API
  useEffect(() => {
    fetchScholarships();
  }, [searchQuery, selectedCategory, selectedDeadline, sortBy, currentPage]);

  const fetchScholarships = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {
        page: currentPage,
        limit: 9,
        sort: sortBy
      };

      if (searchQuery) params.search = searchQuery;
      if (selectedDeadline !== 'all') params.deadline = selectedDeadline;
      
      // Map category to search term
      if (selectedCategory !== 'all') {
        params.search = selectedCategory;
      }

      const response = await api.get('/scholarships', { params });
      
      setScholarships(response.data.data.scholarships);
      setTotalPages(response.data.data.pagination.totalPages);
      setTotalScholarships(response.data.data.pagination.totalScholarships);
          {/* ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    ////////////////////////edited below////////////////////////////////
    ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    ////////////////////////edited below////////////////////////////////
    ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    ////////////////////////edited below////////////////////////////////
    ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////// */}
// setScholarships(response.data.scholarships);
// setTotalPages(response.data.pagination.totalPages);
// setTotalScholarships(response.data.pagination.totalScholarships);


    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load scholarships. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAmount('all');
    setSelectedDeadline('all');
    setSortBy('deadline');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="scholarships-page">
      <div className="scholarships-hero">
        <div className="container">
          <h1 className="page-title">
            Discover Your Perfect <span className="highlight">Scholarship</span>
          </h1>
          <p className="page-subtitle">
            Explore {totalScholarships}+ verified scholarships matched to your profile
          </p>
        </div>
      </div>

      <div className="container">
        <div className="scholarships-content">
          {/* Sidebar */}
          <aside className="scholarships-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">
                <i className="bi bi-funnel me-2"></i>
                Filters
              </h3>

              {/* Category Filter */}
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="category-pills">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className={`category-pill ${selectedCategory === category.value ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setCurrentPage(1);
                      }}
                    >
                      <i className={`bi ${category.icon} me-2`}></i>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deadline Filter */}
              <div className="filter-group">
                <label className="filter-label">Deadline</label>
                <select
                  className="filter-select"
                  value={selectedDeadline}
                  onChange={(e) => {
                    setSelectedDeadline(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Deadlines</option>
                  <option value="week">Within 1 Week</option>
                  <option value="month">Within 1 Month</option>
                  <option value="upcoming">Upcoming Only</option>
                </select>
              </div>

              {/* Reset Button */}
              <button className="btn-reset-filters" onClick={handleReset}>
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reset All Filters
              </button>
            </div>

            {/* Quick Stats */}
            <div className="sidebar-section sidebar-stats">
              <h3 className="sidebar-title">
                <i className="bi bi-bar-chart me-2"></i>
                Quick Stats
              </h3>
              <div className="stat-item">
                <i className="bi bi-award-fill"></i>
                <div>
                  <span className="stat-value">{totalScholarships}+</span>
                  <span className="stat-label">Total Scholarships</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="bi bi-people-fill"></i>
                <div>
                  <span className="stat-value">50K+</span>
                  <span className="stat-label">Students Helped</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="bi bi-cash-stack"></i>
                <div>
                  <span className="stat-value">₹10Cr+</span>
                  <span className="stat-label">Funds Distributed</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="scholarships-main">
            {/* Search and Sort Bar */}
            <div className="search-sort-bar">
              <div className="search-container">
                <i className="bi bi-search search-icon"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search scholarships by name, organization, or keywords..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery('')}>
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>

              <div className="sort-container">
                <label className="sort-label">
                  <i className="bi bi-sort-down me-2"></i>
                  Sort By:
                </label>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="deadline">Deadline</option>
                  <option value="recent">Most Recent</option>
                  <option value="amount-high">Amount (High to Low)</option>
                  <option value="amount-low">Amount (Low to High)</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="results-info">
              <p className="results-text">
                Showing <span className="highlight-number">{scholarships.length}</span> of{' '}
                <span className="highlight-number">{totalScholarships}</span> scholarships
                {selectedCategory !== 'all' && <span> in <strong>{categories.find(c => c.value === selectedCategory)?.label}</strong></span>}
              </p>
            </div>

            {/* Error State */}
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p className="mt-3">Loading scholarships...</p>
              </div>
            )}

            {/* Scholarship Cards Grid */}
            {!loading && !error && scholarships.length > 0 && (
              <div className="scholarships-grid">
                {scholarships.map((scholarship) => (
                  <ScholarshipCard 
                    key={scholarship.id} 
                    scholarship={{
                      ...scholarship,
                      eligibility: scholarship.eligibility_text || 'Check details',
                      applicants: scholarship.total_applicants || '0',
                      matchPercentage: 85, // Placeholder for now
                      trending: false,
                      tags: scholarship.tags ? scholarship.tags.split(',') : []
                    }} 
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && scholarships.length === 0 && (
              <div className="empty-state">
                <i className="bi bi-search"></i>
                <h3>No scholarships found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button className="btn btn-primary mt-3" onClick={handleReset}>
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && scholarships.length > 0 && totalPages > 1 && (
              <div className="pagination-container">
                <button 
                  className="pagination-btn pagination-prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="pagination-dots">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                <button 
                  className="pagination-btn pagination-next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Scholarships;