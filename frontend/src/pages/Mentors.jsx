
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MentorCard from '../components/MentorCard';
import api from '../utils/api';
import './Mentors.css';

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');

  useEffect(() => {
    fetchMentors();
  }, [searchQuery, expertiseFilter]);

  const fetchMentors = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (expertiseFilter !== 'all') params.expertise = expertiseFilter;

      const response = await api.get('/mentors', { params });
      setMentors(response.data.data);
    } catch (err) {
      console.error('Fetch mentors error:', err);
      setError('Failed to load mentors');
    } finally {
      setLoading(false);
    }
  };

  const expertiseOptions = [
    { value: 'all', label: 'All Expertise' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Research', label: 'Research' },
    { value: 'Scholarships', label: 'Scholarships' },
    { value: 'Study Abroad', label: 'Study Abroad' }
  ];

  return (
    <div className="mentors-page">
      <div className="mentors-hero">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-people me-3"></i>
            Find Your Mentor
          </h1>
          <p className="page-subtitle">
            Connect with experienced mentors who can guide you through your scholarship journey
          </p>
        </div>
      </div>

      <div className="container mt-5">
        {/* Search & Filters */}
        <div className="filters-bar">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search mentors by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={expertiseFilter}
            onChange={(e) => setExpertiseFilter(e.target.value)}
          >
            {expertiseOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="spinner-border text-primary"></div>
            <p className="mt-3">Loading mentors...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && mentors.length === 0 && (
          <div className="empty-state">
            <i className="bi bi-person-x"></i>
            <h3>No Mentors Found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Mentors Grid */}
        {!loading && !error && mentors.length > 0 && (
          <>
            <div className="results-count mb-4">
              <p>Found <strong>{mentors.length}</strong> mentor{mentors.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="mentors-grid">
              {mentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Mentors;



//////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main ///////////////////////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main ///////////////////////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main ///////////////////////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main ///////////////////////////////////below main /////////////////
//////////////////below main /////////////////
//////////////////below main /////////////////

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import MentorCard from '../components/MentorCard';
// import api from '../utils/api';
// import './Mentors.css';

// function Mentors() {
//   const [mentors, setMentors] = useState([]);
//   const [connectedMentorIds, setConnectedMentorIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [expertiseFilter, setExpertiseFilter] = useState('all');
//   const { isAuthenticated, user } = useAuth();

//   useEffect(() => {
//     fetchMentors();
//     if (isAuthenticated && user?.role === 'student') {
//       fetchConnectedMentors();
//     }
//   }, [searchQuery, expertiseFilter, isAuthenticated]);

//   const fetchMentors = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const params = {};
//       if (searchQuery) params.search = searchQuery;
//       if (expertiseFilter !== 'all') params.expertise = expertiseFilter;

//       const response = await api.get('/mentors', { params });
//       setMentors(response.data.data);
//     } catch (err) {
//       console.error('Fetch mentors error:', err);
//       setError('Failed to load mentors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchConnectedMentors = async () => {
//     try {
//       const response = await api.get('/mentors/my-mentors');
//       const mentors = response.data.data || [];
//       // Get IDs of accepted mentors (already filtered on backend)
//       const acceptedIds = mentors.map(m => m.mentor_id);
//       setConnectedMentorIds(acceptedIds);
//     } catch (err) {
//       console.error('Fetch connected mentors error:', err);
//     }
//   };

//   const expertiseOptions = [
//     { value: 'all', label: 'All Expertise' },
//     { value: 'Engineering', label: 'Engineering' },
//     { value: 'Medical', label: 'Medical' },
//     { value: 'Research', label: 'Research' },
//     { value: 'Scholarships', label: 'Scholarships' },
//     { value: 'Study Abroad', label: 'Study Abroad' }
//   ];

//   return (
//     <div className="mentors-page">
//       <div className="mentors-hero">
//         <div className="container">
//           <h1 className="page-title">
//             <i className="bi bi-people me-3"></i>
//             Find Your Mentor
//           </h1>
//           <p className="page-subtitle">
//             Connect with experienced mentors who can guide you through your scholarship journey
//           </p>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Search & Filters */}
//         <div className="filters-bar">
//           <div className="search-box">
//             <i className="bi bi-search"></i>
//             <input
//               type="text"
//               placeholder="Search mentors by name or expertise..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <select
//             className="filter-select"
//             value={expertiseFilter}
//             onChange={(e) => setExpertiseFilter(e.target.value)}
//           >
//             {expertiseOptions.map(opt => (
//               <option key={opt.value} value={opt.value}>{opt.label}</option>
//             ))}
//           </select>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="loading-container">
//             <div className="spinner-border text-primary"></div>
//             <p className="mt-3">Loading mentors...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="alert alert-danger">
//             <i className="bi bi-exclamation-triangle-fill me-2"></i>
//             {error}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && mentors.length === 0 && (
//           <div className="empty-state">
//             <i className="bi bi-person-x"></i>
//             <h3>No Mentors Found</h3>
//             <p>Try adjusting your search or filters</p>
//           </div>
//         )}

//         {/* Mentors Grid */}
//         {!loading && !error && mentors.length > 0 && (
//           <>
//             <div className="results-count mb-4">
//               <p>Found <strong>{mentors.length}</strong> mentor{mentors.length !== 1 ? 's' : ''}
//                 {connectedMentorIds.length > 0 && (
//                   <span className="connected-count ms-2">
//                     • <i className="bi bi-check-circle-fill text-success me-1"></i>
//                     {connectedMentorIds.length} Connected
//                   </span>
//                 )}
//               </p>
//             </div>

//             <div className="mentors-grid">
//               {mentors.map(mentor => (
//                 <MentorCard
//                   key={mentor.id}
//                   mentor={mentor}
//                   isConnected={connectedMentorIds.includes(mentor.mentor_id || mentor.id)}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Mentors;
