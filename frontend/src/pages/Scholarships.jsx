// src/pages/Scholarships.jsx
import React, { useState } from 'react';
import ScholarshipCard from '../components/ScholarshipCard';
import './Scholarships.css';

function Scholarships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [selectedDeadline, setSelectedDeadline] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  // Dummy scholarship data
  const scholarships = [
    {
      id: 1,
      title: "L'ORÉAL For Young Women in Science Program 2025-26",
      organization: "L'ORÉAL Foundation",
      logo: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=L'OREAL",
      description: "Supporting young women pursuing careers in science, technology, engineering, and mathematics with comprehensive funding.",
      amount: "₹1,00,000",
      deadline: "2025-11-03",
      applicants: "2,450",
      eligibility: "Female, Graduate",
      matchPercentage: 95,
      trending: true,
      tags: ["Women", "STEM", "Research"]
    },
    {
      id: 2,
      title: "BYPL Sashakt Scholarship 2025-26",
      organization: "BSES Yamuna Power Limited",
      logo: "https://via.placeholder.com/80x80/FF8C42/FFFFFF?text=BSES",
      description: "Financial assistance for meritorious students from economically weaker sections pursuing higher education.",
      amount: "₹75,000",
      deadline: "2025-11-21",
      applicants: "3,890",
      eligibility: "Class 12, Graduate",
      matchPercentage: 92,
      trending: true,
      tags: ["Merit", "Need-Based", "All Streams"]
    },
    {
      id: 3,
      title: "SBI Platinum Jubilee Asha Scholarship 2025",
      organization: "State Bank of India",
      logo: "https://via.placeholder.com/80x80/FFA45B/FFFFFF?text=SBI",
      description: "Supporting students from low-income families to pursue their dreams in higher education and professional courses.",
      amount: "₹50,000",
      deadline: "2025-11-15",
      applicants: "5,230",
      eligibility: "Graduate, Postgraduate",
      matchPercentage: 88,
      trending: false,
      tags: ["Banking", "Finance", "Need-Based"]
    },
    {
      id: 4,
      title: "National Merit Scholarship 2025-26",
      organization: "National Scholarship Board",
      logo: "https://via.placeholder.com/80x80/FFBB74/FFFFFF?text=NMS",
      description: "Recognizing and rewarding academic excellence across all streams with comprehensive financial support.",
      amount: "₹1,50,000",
      deadline: "2025-12-01",
      applicants: "1,890",
      eligibility: "Class 10, Class 12",
      matchPercentage: 85,
      trending: false,
      tags: ["Merit", "All Streams", "Academic"]
    },
    {
      id: 5,
      title: "Research Excellence Grant 2025",
      organization: "Scientific Research Council",
      logo: "https://via.placeholder.com/80x80/FFD28D/FFFFFF?text=SRC",
      description: "Supporting innovative research projects in science and technology with funding and mentorship opportunities.",
      amount: "₹2,00,000",
      deadline: "2026-01-10",
      applicants: "892",
      eligibility: "Postgraduate, PhD",
      matchPercentage: 82,
      trending: true,
      tags: ["Research", "PhD", "Innovation"]
    },
    {
      id: 6,
      title: "Women Empowerment Education Fund",
      organization: "Tech Innovation Foundation",
      logo: "https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=TIF",
      description: "Empowering women to excel in technology and engineering fields through financial assistance and guidance.",
      amount: "₹80,000",
      deadline: "2025-11-30",
      applicants: "2,340",
      eligibility: "Female, Engineering",
      matchPercentage: 90,
      trending: true,
      tags: ["Women", "Technology", "Engineering"]
    },
    {
      id: 7,
      title: "Sports Excellence Scholarship",
      organization: "National Sports Authority",
      logo: "https://via.placeholder.com/80x80/FF8C42/FFFFFF?text=NSA",
      description: "Supporting student-athletes who excel in both academics and sports with financial assistance.",
      amount: "₹60,000",
      deadline: "2025-12-15",
      applicants: "1,567",
      eligibility: "Sports, Graduate",
      matchPercentage: 78,
      trending: false,
      tags: ["Sports", "Athletics", "All Streams"]
    },
    {
      id: 8,
      title: "Minority Community Education Scholarship",
      organization: "Social Welfare Department",
      logo: "https://via.placeholder.com/80x80/FFA45B/FFFFFF?text=SWD",
      description: "Promoting education among minority communities with comprehensive financial and academic support.",
      amount: "₹45,000",
      deadline: "2026-01-31",
      applicants: "4,120",
      eligibility: "Minority, All Streams",
      matchPercentage: 75,
      trending: false,
      tags: ["Minority", "Need-Based", "All Streams"]
    },
    {
      id: 9,
      title: "Engineering Excellence Award 2025",
      organization: "AICTE",
      logo: "https://via.placeholder.com/80x80/FFBB74/FFFFFF?text=AICTE",
      description: "Recognizing exceptional engineering students with financial support and industry mentorship opportunities.",
      amount: "₹1,20,000",
      deadline: "2025-11-25",
      applicants: "3,450",
      eligibility: "Engineering, B.Tech",
      matchPercentage: 87,
      trending: true,
      tags: ["Engineering", "Technology", "Merit"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'bi-grid' },
    { value: 'merit', label: 'Merit-Based', icon: 'bi-trophy' },
    { value: 'need', label: 'Need-Based', icon: 'bi-heart' },
    { value: 'women', label: 'Women', icon: 'bi-gender-female' },
    { value: 'research', label: 'Research', icon: 'bi-search' },
    { value: 'sports', label: 'Sports', icon: 'bi-award' },
    { value: 'minority', label: 'Minority', icon: 'bi-people' }
  ];

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAmount('all');
    setSelectedDeadline('all');
    setSortBy('relevance');
  };

  return (
    <div className="scholarships-page">
      <div className="scholarships-hero">
        <div className="container">
          <h1 className="page-title">
            Discover Your Perfect <span className="highlight">Scholarship</span>
          </h1>
          <p className="page-subtitle">
            Explore 500+ verified scholarships matched to your profile
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
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      <i className={`bi ${category.icon} me-2`}></i>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div className="filter-group">
                <label className="filter-label">Scholarship Amount</label>
                <select
                  className="filter-select"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                >
                  <option value="all">All Amounts</option>
                  <option value="0-50000">Up to ₹50,000</option>
                  <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                  <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                  <option value="200000+">Above ₹2,00,000</option>
                </select>
              </div>

              {/* Deadline Filter */}
              <div className="filter-group">
                <label className="filter-label">Deadline</label>
                <select
                  className="filter-select"
                  value={selectedDeadline}
                  onChange={(e) => setSelectedDeadline(e.target.value)}
                >
                  <option value="all">All Deadlines</option>
                  <option value="week">Within 1 Week</option>
                  <option value="month">Within 1 Month</option>
                  <option value="3months">Within 3 Months</option>
                </select>
              </div>

              {/* Eligibility */}
              <div className="filter-group">
                <label className="filter-label">Eligibility</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Class 10</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Class 12</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Graduate</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Postgraduate</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>PhD</span>
                  </label>
                </div>
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
                  <span className="stat-value">500+</span>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="match">Best Match</option>
                  <option value="deadline">Deadline</option>
                  <option value="amount-high">Amount (High to Low)</option>
                  <option value="amount-low">Amount (Low to High)</option>
                  <option value="applicants">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="results-info">
              <p className="results-text">
                Showing <span className="highlight-number">{scholarships.length}</span> scholarships
                {selectedCategory !== 'all' && <span> in <strong>{categories.find(c => c.value === selectedCategory)?.label}</strong></span>}
              </p>
              <div className="view-toggle">
                <button className="view-btn active">
                  <i className="bi bi-grid-3x3-gap"></i>
                </button>
                <button className="view-btn">
                  <i className="bi bi-list-ul"></i>
                </button>
              </div>
            </div>

            {/* Scholarship Cards Grid */}
            <div className="scholarships-grid">
              {scholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <button className="pagination-btn pagination-prev">
                <i className="bi bi-chevron-left"></i>
                Previous
              </button>
              <div className="pagination-numbers">
                <button className="pagination-number active">1</button>
                <button className="pagination-number">2</button>
                <button className="pagination-number">3</button>
                <span className="pagination-dots">...</span>
                <button className="pagination-number">10</button>
              </div>
              <button className="pagination-btn pagination-next">
                Next
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Scholarships;