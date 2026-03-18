import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './ScholarshipDetail.css';

function ScholarshipDetail() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileStatus, setProfileStatus] = useState(null);
  const [mentorStatus, setMentorStatus] = useState(null); // null = not checked, 'connected', 'pending', 'none'

  useEffect(() => {
    fetchScholarshipDetail();
    if (isAuthenticated) {
      fetchProfileStatus();
      fetchMentorStatus();
    }
  }, [id, isAuthenticated]);

  const fetchScholarshipDetail = async () => {
    try {
      const response = await api.get(`/scholarships/${id}`);
      setScholarship(response.data.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load scholarship details');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileStatus = async () => {
    try {
      const response = await api.get('/profile/status');
      setProfileStatus(response.data.data);
    } catch (err) {
      console.error('Profile status error:', err);
    }
  };

  const fetchMentorStatus = async () => {
    try {
      const response = await api.get('/mentorship/my-mentors');
      const mentors = response.data.data || [];
      // Check if any mentor request is accepted
      const connected = mentors.some(m => m.status === 'accepted');
      const pending = mentors.some(m => m.status === 'pending');
      if (connected) {
        setMentorStatus('connected');
      } else if (pending) {
        setMentorStatus('pending');
      } else {
        setMentorStatus('none');
      }
    } catch (err) {
      console.error('Mentor status error:', err);
      setMentorStatus('none');
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      alert('Please login to apply for scholarships');
      navigate('/login');
      return;
    }

    if (!profileStatus?.profile_completed) {
      const confirmComplete = window.confirm(
        'You need to complete your profile before applying. Would you like to complete it now?'
      );
      if (confirmComplete) {
        navigate('/profile');
      }
      return;
    }

    try {
      const response = await api.post('/applications', {
        scholarship_id: scholarship.id
      });

      if (response.data.success) {
        alert('Application saved successfully! You will now be redirected to the scholarship portal.');
        if (scholarship?.apply_link) {
          window.open(scholarship.apply_link, '_blank');
        }
      }
    } catch (error) {
      if (error.response?.data?.already_applied) {
        alert('You have already applied for this scholarship!');
      } else if (error.response?.data?.profile_completed === false) {
        alert('Please complete your profile before applying');
        navigate('/profile');
      } else {
        alert(error.response?.data?.message || 'Failed to save application');
      }
    }
  };

  const handleConnectMentor = () => {
    if (!isAuthenticated) {
      alert('Please login to connect with mentors');
      navigate('/login');
      return;
    }
    // Always redirect to mentors page
    navigate('/mentors');
  };

  const getMentorButtonContent = () => {
    if (!isAuthenticated) {
      return {
        text: 'Connect to Mentor',
        icon: 'bi-people',
        className: 'btn-connect-mentor',
        disabled: false
      };
    }

    switch (mentorStatus) {
      case 'connected':
        return {
          text: 'Mentor Connected ✓',
          icon: 'bi-person-check-fill',
          className: 'btn-connect-mentor btn-mentor-connected',
          disabled: false
        };
      case 'pending':
        return {
          text: 'Request Pending...',
          icon: 'bi-hourglass-split',
          className: 'btn-connect-mentor btn-mentor-pending',
          disabled: true
        };
      default:
        return {
          text: 'Connect to Mentor',
          icon: 'bi-people',
          className: 'btn-connect-mentor',
          disabled: false
        };
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading scholarship details...</p>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error || 'Scholarship not found'}
        </div>
        <Link to="/scholarships" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Scholarships
        </Link>
      </div>
    );
  }

  const daysRemaining = Math.ceil(
    (new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const mentorBtn = getMentorButtonContent();

  return (
    <div className="scholarship-detail-page">
      {/* Profile Warning Alert */}
      {isAuthenticated && !profileStatus?.profile_completed && (
        <div className="container mt-4">
          <div className="alert alert-warning d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '1.5rem' }}></i>
            <div className="flex-grow-1">
              <strong>Profile Incomplete!</strong> Complete your profile to apply for this scholarship.
            </div>
            <Link to="/profile" className="btn btn-sm btn-warning ms-3">
              <i className="bi bi-person-plus-fill me-2"></i>
              Complete Profile
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="detail-header">
        <div className="container">
          <Link to="/scholarships" className="back-link">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Scholarships
          </Link>
          
          <div className="header-content mt-4">
            <h1 className="scholarship-detail-title">{scholarship.title}</h1>
            <p className="provider-name">
              <i className="bi bi-building me-2"></i>
              {scholarship.provider}
            </p>
            
            {scholarship.tags && (
              <div className="scholarship-tags mt-3">
                {scholarship.tags.split(',').map((tag, index) => (
                  <span key={index} className="badge bg-light text-dark me-2">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-4 mb-5">
        <div className="row">
          <div className="col-lg-8">
            {/* Description */}
            <div className="detail-card">
              <h3>
                <i className="bi bi-info-circle me-2"></i>
                About This Scholarship
              </h3>
              <p className="scholarship-description">{scholarship.description}</p>
            </div>

            {/* Eligibility */}
            <div className="detail-card">
              <h3>
                <i className="bi bi-check2-circle me-2"></i>
                Eligibility Criteria
              </h3>
              <p className="scholarship-description">{scholarship.eligibility_text}</p>
              
              <div className="eligibility-tags mt-4">
                <h5 className="mb-3">
                  <i className="bi bi-tags me-2"></i>
                  Quick Eligibility Check:
                </h5>
                <div className="row g-3">
                  {scholarship.gender_eligible && scholarship.gender_eligible !== 'All' && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-person"></i>
                        <div>
                          <strong>Gender:</strong> {scholarship.gender_eligible}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {scholarship.education_level_eligible && scholarship.education_level_eligible !== 'All' && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-mortarboard"></i>
                        <div>
                          <strong>Level:</strong> {scholarship.education_level_eligible}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {scholarship.course_eligible && scholarship.course_eligible !== 'All' && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-book"></i>
                        <div>
                          <strong>Course:</strong> {scholarship.course_eligible}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {scholarship.max_income && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-currency-rupee"></i>
                        <div>
                          <strong>Max Income:</strong> ₹{scholarship.max_income.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {scholarship.min_percentage && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-percent"></i>
                        <div>
                          <strong>Min Percentage:</strong> {scholarship.min_percentage}%
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {scholarship.min_cgpa && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-star"></i>
                        <div>
                          <strong>Min CGPA:</strong> {scholarship.min_cgpa}/10
                        </div>
                      </div>
                    </div>
                  )}

                  {scholarship.category_eligible && scholarship.category_eligible !== 'All' && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-people"></i>
                        <div>
                          <strong>Category:</strong> {scholarship.category_eligible}
                        </div>
                      </div>
                    </div>
                  )}

                  {scholarship.state_eligible && scholarship.state_eligible !== 'All' && (
                    <div className="col-md-6">
                      <div className="eligibility-item">
                        <i className="bi bi-geo-alt"></i>
                        <div>
                          <strong>State:</strong> {scholarship.state_eligible}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* How to Apply */}
            <div className="detail-card">
              <h3>
                <i className="bi bi-clipboard-check me-2"></i>
                How to Apply
              </h3>
              <ol className="apply-steps">
                <li>
                  <strong>Complete Your Profile</strong> - Ensure all required details are filled in ScholarNest
                </li>
                <li>
                  <strong>Click Apply Now</strong> - You'll be redirected to the official scholarship portal
                </li>
                <li>
                  <strong>Fill Application Form</strong> - Complete the application on the official website
                </li>
                <li>
                  <strong>Submit Documents</strong> - Upload required documents as per instructions
                </li>
                <li>
                  <strong>Track Your Application</strong> - Come back to ScholarNest to track status
                </li>
              </ol>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Quick Info Card */}
            <div className="quick-info-card">
              <div className="info-item">
                <i className="bi bi-currency-rupee"></i>
                <div>
                  <span className="info-label">Scholarship Amount</span>
                  <span className="info-value">{scholarship.amount}</span>
                </div>
              </div>

              <div className="info-item">
                <i className="bi bi-calendar-event"></i>
                <div>
                  <span className="info-label">Application Deadline</span>
                  <span className="info-value">
                    {new Date(scholarship.deadline).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {daysRemaining > 0 ? (
                    <span className="days-remaining">
                      {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
                    </span>
                  ) : (
                    <span className="deadline-passed">Deadline passed</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <i className="bi bi-people"></i>
                <div>
                  <span className="info-label">Total Applicants</span>
                  <span className="info-value">{scholarship.total_applicants || 0}</span>
                </div>
              </div>

              <div className="info-item">
                <i className="bi bi-globe"></i>
                <div>
                  <span className="info-label">Source</span>
                  <span className="info-value">
                    {scholarship.source === 'manual' ? 'Verified by Admin' : 'Web Scraped'}
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              {/* Apply Button */}
              <button 
                className="btn-apply-now" 
                onClick={handleApply}
                disabled={isAuthenticated && !profileStatus?.profile_completed}
              >
                <i className="bi bi-box-arrow-up-right me-2"></i>
                {!isAuthenticated 
                  ? 'Login to Apply'
                  : (profileStatus?.profile_completed 
                      ? 'Apply Now' 
                      : 'Complete Profile to Apply')
                }
              </button>

              {/* Connect to Mentor Button */}
              <button 
                className={mentorBtn.className}
                onClick={handleConnectMentor}
                disabled={mentorBtn.disabled}
              >
                <i className={`bi ${mentorBtn.icon} me-2`}></i>
                {mentorBtn.text}
              </button>

              {/* Share Button */}
              <button 
                className="btn-share"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
              >
                <i className="bi bi-share me-2"></i>
                Share Scholarship
              </button>
            </div>

            {/* Additional Info Card */}
            <div className="additional-info-card mt-4">
              <h5>
                <i className="bi bi-lightbulb me-2"></i>
                Need Help?
              </h5>
              <p className="small text-muted mb-3">
                Connect with our mentors to get guidance on your application
              </p>
              <Link to="/mentors" className="btn btn-outline-primary btn-sm w-100">
                <i className="bi bi-search me-2"></i>
                Find Mentors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipDetail;
////////////////////////////////////
////////////////////////////////////

////////////////////////////////////

////////////////////////////////////

////////////////////////////////////

////////////////////////////////////

////////////////////////////////////

////////////////////////////////////

////////////////////////////////////

////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../utils/api';
// import './ScholarshipDetail.css';
// // import api from '../utils/api';

// function ScholarshipDetail() {
//   const { id } = useParams();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   const [scholarship, setScholarship] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [profileStatus, setProfileStatus] = useState(null);

//   useEffect(() => {
//     fetchScholarshipDetail();
//     if (isAuthenticated) {
//       fetchProfileStatus();
//     }
//   }, [id, isAuthenticated]);

//   const fetchScholarshipDetail = async () => {
//     try {
//       const response = await api.get(`/scholarships/${id}`);
//       setScholarship(response.data.data);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('Failed to load scholarship details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProfileStatus = async () => {
//     try {
//       const response = await api.get('/profile/status');
//       setProfileStatus(response.data.data);
//     } catch (err) {
//       console.error('Profile status error:', err);
//     }
//   };

//   // const handleApply = () => {
//   //   if (!isAuthenticated) {
//   //     alert('Please login to apply for scholarships');
//   //     navigate('/login');
//   //     return;
//   //   }

//   //   // Check if profile is completed
//   //   if (!profileStatus?.profile_completed) {
//   //     const confirmComplete = window.confirm(
//   //       'You need to complete your profile before applying. Would you like to complete it now?'
//   //     );
//   //     if (confirmComplete) {
//   //       navigate('/profile');
//   //     }
//   //     return;
//   //   }
    
//   //   // Open external link
//   //   if (scholarship?.apply_link) {
//   //     window.open(scholarship.apply_link, '_blank');
      
//   //     // TODO: In next phase, we'll add application tracking here
//   //     // saveApplication(scholarship.id);
//   //   }
//   // };


//   const handleApply = async () => {
//   if (!isAuthenticated) {
//     alert('Please login to apply for scholarships');
//     navigate('/login');
//     return;
//   }

//   // Check if profile is completed
//   if (!profileStatus?.profile_completed) {
//     const confirmComplete = window.confirm(
//       'You need to complete your profile before applying. Would you like to complete it now?'
//     );
//     if (confirmComplete) {
//       navigate('/profile');
//     }
//     return;
//   }

//   try {
//     // Save application to database
//     const response = await api.post('/applications', {
//       scholarship_id: scholarship.id
//     });

//     if (response.data.success) {
//       // Show success message
//       alert('Application saved successfully! You will now be redirected to the scholarship portal.');
      
//       // Open external link
//       if (scholarship?.apply_link) {
//         window.open(scholarship.apply_link, '_blank');
//       }

//       // Optionally navigate to applications page
//       // navigate('/applications');
//     }
//   } catch (error) {
//     if (error.response?.data?.already_applied) {
//       alert('You have already applied for this scholarship!');
//     } else if (error.response?.data?.profile_completed === false) {
//       alert('Please complete your profile before applying');
//       navigate('/profile');
//     } else {
//       alert(error.response?.data?.message || 'Failed to save application');
//     }
//   }
// };


//   const handleConnectMentor = () => {
//     if (!isAuthenticated) {
//       alert('Please login to connect with mentors');
//       navigate('/login');
//       return;
//     }

//     // TODO: Implement mentor connection in future phase
//     alert('Mentor connection feature coming soon!');
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="mt-3 text-muted">Loading scholarship details...</p>
//       </div>
//     );
//   }

//   if (error || !scholarship) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger">
//           <i className="bi bi-exclamation-triangle-fill me-2"></i>
//           {error || 'Scholarship not found'}
//         </div>
//         <Link to="/scholarships" className="btn btn-primary">
//           <i className="bi bi-arrow-left me-2"></i>
//           Back to Scholarships
//         </Link>
//       </div>
//     );
//   }

//   // Calculate days remaining
//   const daysRemaining = Math.ceil(
//     (new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24)
//   );

//   return (
//     <div className="scholarship-detail-page">
//       {/* Profile Warning Alert */}
//       {isAuthenticated && !profileStatus?.profile_completed && (
//         <div className="container mt-4">
//           <div className="alert alert-warning d-flex align-items-center">
//             <i className="bi bi-exclamation-triangle-fill me-3" style={{ fontSize: '1.5rem' }}></i>
//             <div className="flex-grow-1">
//               <strong>Profile Incomplete!</strong> Complete your profile to apply for this scholarship.
//             </div>
//             <Link to="/profile" className="btn btn-sm btn-warning ms-3">
//               <i className="bi bi-person-plus-fill me-2"></i>
//               Complete Profile
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="detail-header">
//         <div className="container">
//           <Link to="/scholarships" className="back-link">
//             <i className="bi bi-arrow-left me-2"></i>
//             Back to Scholarships
//           </Link>
          
//           <div className="header-content mt-4">
//             <h1 className="scholarship-detail-title">{scholarship.title}</h1>
//             <p className="provider-name">
//               <i className="bi bi-building me-2"></i>
//               {scholarship.provider}
//             </p>
            
//             {/* Tags */}
//             {scholarship.tags && (
//               <div className="scholarship-tags mt-3">
//                 {scholarship.tags.split(',').map((tag, index) => (
//                   <span key={index} className="badge bg-light text-dark me-2">
//                     {tag.trim()}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mt-4 mb-5">
//         <div className="row">
//           <div className="col-lg-8">
//             {/* Description */}
//             <div className="detail-card">
//               <h3>
//                 <i className="bi bi-info-circle me-2"></i>
//                 About This Scholarship
//               </h3>
//               <p className="scholarship-description">{scholarship.description}</p>
//             </div>

//             {/* Eligibility */}
//             <div className="detail-card">
//               <h3>
//                 <i className="bi bi-check2-circle me-2"></i>
//                 Eligibility Criteria
//               </h3>
//               <p className="scholarship-description">{scholarship.eligibility_text}</p>
              
//               <div className="eligibility-tags mt-4">
//                 <h5 className="mb-3">
//                   <i className="bi bi-tags me-2"></i>
//                   Quick Eligibility Check:
//                 </h5>
//                 <div className="row g-3">
//                   {scholarship.gender_eligible && scholarship.gender_eligible !== 'All' && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-person"></i>
//                         <div>
//                           <strong>Gender:</strong> {scholarship.gender_eligible}
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   {scholarship.education_level_eligible && scholarship.education_level_eligible !== 'All' && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-mortarboard"></i>
//                         <div>
//                           <strong>Level:</strong> {scholarship.education_level_eligible}
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   {scholarship.course_eligible && scholarship.course_eligible !== 'All' && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-book"></i>
//                         <div>
//                           <strong>Course:</strong> {scholarship.course_eligible}
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   {scholarship.max_income && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-currency-rupee"></i>
//                         <div>
//                           <strong>Max Income:</strong> ₹{scholarship.max_income.toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   {scholarship.min_percentage && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-percent"></i>
//                         <div>
//                           <strong>Min Percentage:</strong> {scholarship.min_percentage}%
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   {scholarship.min_cgpa && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-star"></i>
//                         <div>
//                           <strong>Min CGPA:</strong> {scholarship.min_cgpa}/10
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {scholarship.category_eligible && scholarship.category_eligible !== 'All' && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-people"></i>
//                         <div>
//                           <strong>Category:</strong> {scholarship.category_eligible}
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {scholarship.state_eligible && scholarship.state_eligible !== 'All' && (
//                     <div className="col-md-6">
//                       <div className="eligibility-item">
//                         <i className="bi bi-geo-alt"></i>
//                         <div>
//                           <strong>State:</strong> {scholarship.state_eligible}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* How to Apply */}
//             <div className="detail-card">
//               <h3>
//                 <i className="bi bi-clipboard-check me-2"></i>
//                 How to Apply
//               </h3>
//               <ol className="apply-steps">
//                 <li>
//                   <strong>Complete Your Profile</strong> - Ensure all required details are filled in ScholarNest
//                 </li>
//                 <li>
//                   <strong>Click Apply Now</strong> - You'll be redirected to the official scholarship portal
//                 </li>
//                 <li>
//                   <strong>Fill Application Form</strong> - Complete the application on the official website
//                 </li>
//                 <li>
//                   <strong>Submit Documents</strong> - Upload required documents as per instructions
//                 </li>
//                 <li>
//                   <strong>Track Your Application</strong> - Come back to ScholarNest to track status
//                 </li>
//               </ol>
//             </div>
//           </div>

//           <div className="col-lg-4">
//             {/* Quick Info Card */}
//             <div className="quick-info-card">
//               <div className="info-item">
//                 <i className="bi bi-currency-rupee"></i>
//                 <div>
//                   <span className="info-label">Scholarship Amount</span>
//                   <span className="info-value">{scholarship.amount}</span>
//                 </div>
//               </div>

//               <div className="info-item">
//                 <i className="bi bi-calendar-event"></i>
//                 <div>
//                   <span className="info-label">Application Deadline</span>
//                   <span className="info-value">
//                     {new Date(scholarship.deadline).toLocaleDateString('en-IN', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </span>
//                   {daysRemaining > 0 && (
//                     <span className="days-remaining">
//                       {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
//                     </span>
//                   )}
//                   {daysRemaining <= 0 && (
//                     <span className="deadline-passed">Deadline passed</span>
//                   )}
//                 </div>
//               </div>

//               <div className="info-item">
//                 <i className="bi bi-people"></i>
//                 <div>
//                   <span className="info-label">Total Applicants</span>
//                   <span className="info-value">{scholarship.total_applicants || 0}</span>
//                 </div>
//               </div>

//               <div className="info-item">
//                 <i className="bi bi-globe"></i>
//                 <div>
//                   <span className="info-label">Source</span>
//                   <span className="info-value">
//                     {scholarship.source === 'manual' ? 'Verified by Admin' : 'Web Scraped'}
//                   </span>
//                 </div>
//               </div>

//               <hr className="my-4" />

//               {/* Apply Button */}
//               <button 
//                 className="btn-apply-now" 
//                 onClick={handleApply}
//                 disabled={isAuthenticated && !profileStatus?.profile_completed}
//               >
//                 <i className="bi bi-box-arrow-up-right me-2"></i>
//                 {!isAuthenticated 
//                   ? 'Login to Apply'
//                   : (profileStatus?.profile_completed 
//                       ? 'Apply Now' 
//                       : 'Complete Profile to Apply')
//                 }
//               </button>

//               {/* Connect to Mentor Button */}
//               <button 
//                 className="btn-connect-mentor"
//                 onClick={handleConnectMentor}
//               >
//                 <i className="bi bi-people me-2"></i>
//                 Connect to Mentor
//               </button>

//               {/* Bookmark Button */}
//               <button className="btn-bookmark">
//                 <i className="bi bi-bookmark me-2"></i>
//                 Save for Later
//               </button>

//               {/* Share Button */}
//               <button className="btn-share">
//                 <i className="bi bi-share me-2"></i>
//                 Share Scholarship
//               </button>
//             </div>

//             {/* Additional Info Card */}
//             <div className="additional-info-card mt-4">
//               <h5>
//                 <i className="bi bi-lightbulb me-2"></i>
//                 Need Help?
//               </h5>
//               <p className="small text-muted mb-3">
//                 Connect with our mentors to get guidance on your application
//               </p>
//               <Link to="/mentors" className="btn btn-outline-primary btn-sm w-100">
//                 <i className="bi bi-search me-2"></i>
//                 Find Mentors
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ScholarshipDetail;