// import React from 'react';
// import { Link } from 'react-router-dom';
// import './MentorCard.css';

// function MentorCard({ mentor }) {
//   return (
//     <div className="mentor-card">
//       <div className="mentor-card-header">
//         <div className="mentor-avatar">
//           <img 
//             src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=100`}
//             alt={mentor.name}
//           />
//           {mentor.verified && (
//             <div className="verified-badge">
//               <i className="bi bi-check-circle-fill"></i>
//             </div>
//           )}
//         </div>
//         <div className="mentor-info">
//           <h3 className="mentor-name">{mentor.name}</h3>
//           <p className="mentor-expertise">
//             <i className="bi bi-lightbulb me-2"></i>
//             {mentor.expertise}
//           </p>
//         </div>
//       </div>

//       <div className="mentor-card-body">
//         <div className="mentor-stats">
//           <div className="stat-item">
//             <i className="bi bi-award"></i>
//             <span>{mentor.experience_years} years</span>
//           </div>
//           <div className="stat-item">
//             <i className="bi bi-people"></i>
//             <span>{mentor.total_students || 0} students</span>
//           </div>
//         </div>

//         <p className="mentor-bio">
//           {mentor.bio ? (mentor.bio.length > 120 ? mentor.bio.substring(0, 120) + '...' : mentor.bio) : 'No bio available'}
//         </p>

//         <div className="mentor-card-footer">
//           <div className="mentor-charge">
//             <i className="bi bi-currency-rupee"></i>
//             <span>{mentor.charge_per_session || 'Free'} per session</span>
//           </div>
//           <Link to={`/mentor/${mentor.id}`} className="btn-view-mentor">
//             View Profile
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MentorCard;
import React from 'react';
import { Link } from 'react-router-dom';
import './MentorCard.css';

function MentorCard({ mentor, isConnected = false }) {
  return (
    <div className={`mentor-card ${isConnected ? 'mentor-card-connected' : ''}`}>

      {/* Connected Banner */}
      {isConnected && (
        <div className="connected-banner">
          <i className="bi bi-check-circle-fill me-2"></i>
          Your Mentor
        </div>
      )}

      <div className="mentor-card-header">
        <div className="mentor-avatar">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=4A90E2&color=fff&size=100`}
            alt={mentor.name}
          />
          {mentor.verified && (
            <div className="verified-badge">
              <i className="bi bi-check-circle-fill"></i>
            </div>
          )}
        </div>
        <div className="mentor-info">
          <h3 className="mentor-name">
            {mentor.name}
            {isConnected && (
              <span className="connected-tag ms-2">
                <i className="bi bi-patch-check-fill"></i>
              </span>
            )}
          </h3>
          <p className="mentor-expertise">
            <i className="bi bi-lightbulb me-2"></i>
            {mentor.expertise}
          </p>
        </div>
      </div>

      <div className="mentor-card-body">
        <div className="mentor-stats">
          <div className="stat-item">
            <i className="bi bi-award"></i>
            <span>{mentor.experience_years} years</span>
          </div>
          <div className="stat-item">
            <i className="bi bi-people"></i>
            <span>{mentor.total_students || 0} students</span>
          </div>
        </div>

        <p className="mentor-bio">
          {mentor.bio ? (mentor.bio.length > 120 ? mentor.bio.substring(0, 120) + '...' : mentor.bio) : 'No bio available'}
        </p>

        <div className="mentor-card-footer">
          <div className="mentor-charge">
            <i className="bi bi-currency-rupee"></i>
            <span>{mentor.charge_per_session || 'Free'} per session</span>
          </div>
          <Link
            to={`/mentor/${mentor.id}`}
            className={`btn-view-mentor ${isConnected ? 'btn-view-mentor-connected' : ''}`}
          >
            {isConnected ? (
              <>
                <i className="bi bi-chat-dots me-2"></i>
                View & Chat
              </>
            ) : (
              'View Profile'
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MentorCard;