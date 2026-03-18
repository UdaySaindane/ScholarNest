import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './MentorDetail.css';

function MentorDetail() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    fetchMentorDetail();
  }, [id]);

  const fetchMentorDetail = async () => {
    try {
      const response = await api.get(`/mentors/${id}`);
      setMentor(response.data.data);
    } catch (err) {
      console.error('Fetch mentor error:', err);
      setError('Failed to load mentor details');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestMentor = async () => {
    if (!isAuthenticated) {
      alert('Please login to connect with mentors');
      navigate('/login');
      return;
    }

    if (user?.role !== 'student') {
      alert('Only students can request mentors');
      return;
    }

    setRequesting(true);

    try {
      await api.post('/mentors/request', {
        mentor_id: mentor.id,
        scholarship_id: null // Can be linked to specific scholarship later
      });

      alert('Mentor request sent successfully! The mentor will be notified.');
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert('Failed to send request. Please try again.');
      }
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading mentor details...</p>
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error || 'Mentor not found'}
        </div>
        <Link to="/mentors" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Mentors
        </Link>
      </div>
    );
  }

  return (
    <div className="mentor-detail-page">
      <div className="mentor-detail-header">
        <div className="container">
          <Link to="/mentors" className="back-link">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Mentors
          </Link>

          <div className="mentor-profile-header">
            <div className="mentor-avatar-large">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=150`}
                alt={mentor.name}
              />
              {mentor.verified && (
                <div className="verified-badge-large">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
              )}
            </div>

            <div className="mentor-header-info">
              <h1 className="mentor-detail-name">{mentor.name}</h1>
              <p className="mentor-detail-expertise">
                <i className="bi bi-lightbulb me-2"></i>
                {mentor.expertise}
              </p>
              <div className="mentor-header-stats">
                <div className="stat-badge">
                  <i className="bi bi-award"></i>
                  <span>{mentor.experience_years} Years Experience</span>
                </div>
                <div className="stat-badge">
                  <i className="bi bi-people"></i>
                  <span>{mentor.total_students || 0} Students Guided</span>
                </div>
                {mentor.verified && (
                  <div className="stat-badge verified">
                    <i className="bi bi-patch-check-fill"></i>
                    <span>Verified Mentor</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="detail-card">
              <h3>
                <i className="bi bi-person-badge me-2"></i>
                About Me
              </h3>
              <p className="mentor-full-bio">
                {mentor.bio || 'No bio available'}
              </p>
            </div>

            <div className="detail-card">
              <h3>
                <i className="bi bi-briefcase me-2"></i>
                Areas of Expertise
              </h3>
              <div className="expertise-tags">
                {mentor.expertise.split(',').map((exp, index) => (
                  <span key={index} className="expertise-tag">
                    {exp.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-card">
              <h3>
                <i className="bi bi-chat-dots me-2"></i>
                How I Can Help
              </h3>
              <ul className="help-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Scholarship application guidance
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Essay and SOP review
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Interview preparation
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Document verification tips
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Career counseling
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="mentor-action-card">
              <div className="charge-info">
                <i className="bi bi-currency-rupee"></i>
                <div>
                  <span className="charge-label">Session Charge</span>
                  <span className="charge-value">
                    {mentor.charge_per_session ? `₹${mentor.charge_per_session}` : 'Free'}
                  </span>
                </div>
              </div>

              <button 
                className="btn-request-mentor" 
                onClick={handleRequestMentor}
                disabled={requesting}
              >
                {requesting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sending Request...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Request This Mentor
                  </>
                )}
              </button>

              <div className="contact-info">
                <h5>
                  <i className="bi bi-envelope me-2"></i>
                  Contact Information
                </h5>
                <p className="mentor-email">{mentor.email}</p>
              </div>

              <div className="mentor-stats-detail">
                <h5>
                  <i className="bi bi-graph-up me-2"></i>
                  Statistics
                </h5>
                <div className="stat-row">
                  <span>Total Students Helped:</span>
                  <strong>{mentor.total_students || 0}</strong>
                </div>
                <div className="stat-row">
                  <span>Years of Experience:</span>
                  <strong>{mentor.experience_years}</strong>
                </div>
                <div className="stat-row">
                  <span>Success Rate:</span>
                  <strong>95%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDetail;
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './MentorDetail.css';

// function MentorDetail() {
//   const { id } = useParams();
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();

//   const [mentor, setMentor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [requesting, setRequesting] = useState(false);

//   useEffect(() => {
//     fetchMentorDetail();
//   }, [id]);

//   const fetchMentorDetail = async () => {
//     try {
//       const response = await api.get(`/mentors/${id}`);
//       setMentor(response.data.data);
//     } catch (err) {
//       console.error('Fetch mentor error:', err);
//       setError('Failed to load mentor details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRequestMentor = async () => {
//     if (!isAuthenticated) {
//       alert('Please login to connect with mentors');
//       navigate('/login');
//       return;
//     }

//     if (user?.role !== 'student') {
//       alert('Only students can request mentors');
//       return;
//     }

//     setRequesting(true);

//     try {
//       await api.post('/mentors/request', {
//         mentor_id: mentor.id,
//         scholarship_id: null // Can be linked to specific scholarship later
//       });

//       alert('Mentor request sent successfully! The mentor will be notified.');
//     } catch (err) {
//       if (err.response?.data?.message) {
//         alert(err.response.data.message);
//       } else {
//         alert('Failed to send request. Please try again.');
//       }
//     } finally {
//       setRequesting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="mt-3">Loading mentor details...</p>
//       </div>
//     );
//   }

//   if (error || !mentor) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger">
//           <i className="bi bi-exclamation-triangle-fill me-2"></i>
//           {error || 'Mentor not found'}
//         </div>
//         <Link to="/mentors" className="btn btn-primary">
//           <i className="bi bi-arrow-left me-2"></i>
//           Back to Mentors
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mentor-detail-page">
//       <div className="mentor-detail-header">
//         <div className="container">
//           <Link to="/mentors" className="back-link">
//             <i className="bi bi-arrow-left me-2"></i>
//             Back to Mentors
//           </Link>

//           <div className="mentor-profile-header">
//             <div className="mentor-avatar-large">
//               <img 
//                 src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=150`}
//                 alt={mentor.name}
//               />
//               {mentor.verified && (
//                 <div className="verified-badge-large">
//                   <i className="bi bi-check-circle-fill"></i>
//                 </div>
//               )}
//             </div>

//             <div className="mentor-header-info">
//               <h1 className="mentor-detail-name">{mentor.name}</h1>
//               <p className="mentor-detail-expertise">
//                 <i className="bi bi-lightbulb me-2"></i>
//                 {mentor.expertise}
//               </p>
//               <div className="mentor-header-stats">
//                 <div className="stat-badge">
//                   <i className="bi bi-award"></i>
//                   <span>{mentor.experience_years} Years Experience</span>
//                 </div>
//                 <div className="stat-badge">
//                   <i className="bi bi-people"></i>
//                   <span>{mentor.total_students || 0} Students Guided</span>
//                 </div>
//                 {mentor.verified && (
//                   <div className="stat-badge verified">
//                     <i className="bi bi-patch-check-fill"></i>
//                     <span>Verified Mentor</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mt-4 mb-5">
//         <div className="row">
//           <div className="col-lg-8">
//             <div className="detail-card">
//               <h3>
//                 <i className="bi bi-person-badge me-2"></i>
//                 About Me
//               </h3>
//               <p className="mentor-full-bio">
//                 {mentor.bio || 'No bio available'}
//               </p>
//             </div>

//             <div className="detail-card">
//               <h3>
//                 <i className="bi bi-briefcase me-2"></i>
//                 Areas of Expertise
//               </h3>
//               <div className="expertise-tags">
//                 {mentor.expertise.split(',').map((exp, index) => (
//                   <span key={index} className="expertise-tag">
//                     {exp.trim()}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="detail-card">
//               <h3>
//                 <i className="bi bi-chat-dots me-2"></i>
//                 How I Can Help
//               </h3>
//               <ul className="help-list">
//                 <li>
//                   <i className="bi bi-check-circle-fill"></i>
//                   Scholarship application guidance
//                 </li>
//                 <li>
//                   <i className="bi bi-check-circle-fill"></i>
//                   Essay and SOP review
//                 </li>
//                 <li>
//                   <i className="bi bi-check-circle-fill"></i>
//                   Interview preparation
//                 </li>
//                 <li>
//                   <i className="bi bi-check-circle-fill"></i>
//                   Document verification tips
//                 </li>
//                 <li>
//                   <i className="bi bi-check-circle-fill"></i>
//                   Career counseling
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="col-lg-4">
//             <div className="mentor-action-card">
//               <div className="charge-info">
//                 <i className="bi bi-currency-rupee"></i>
//                 <div>
//                   <span className="charge-label">Session Charge</span>
//                   <span className="charge-value">
//                     {mentor.charge_per_session ? `₹${mentor.charge_per_session}` : 'Free'}
//                   </span>
//                 </div>
//               </div>

//               <button 
//                 className="btn-request-mentor" 
//                 onClick={handleRequestMentor}
//                 disabled={requesting}
//               >
//                 {requesting ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Sending Request...
//                   </>
//                 ) : (
//                   <>
//                     <i className="bi bi-person-plus-fill me-2"></i>
//                     Request This Mentor
//                   </>
//                 )}
//               </button>

//               <div className="contact-info">
//                 <h5>
//                   <i className="bi bi-envelope me-2"></i>
//                   Contact Information
//                 </h5>
//                 <p className="mentor-email">{mentor.email}</p>
//               </div>

//               <div className="mentor-stats-detail">
//                 <h5>
//                   <i className="bi bi-graph-up me-2"></i>
//                   Statistics
//                 </h5>
//                 <div className="stat-row">
//                   <span>Total Students Helped:</span>
//                   <strong>{mentor.total_students || 0}</strong>
//                 </div>
//                 <div className="stat-row">
//                   <span>Years of Experience:</span>
//                   <strong>{mentor.experience_years}</strong>
//                 </div>
//                 <div className="stat-row">
//                   <span>Success Rate:</span>
//                   <strong>95%</strong>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MentorDetail;