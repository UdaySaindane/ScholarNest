import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the specific CSS for the dashboard

// Dummy data for demonstration
const studentProfile = {
  name: "Uday ",
  email: "demo@example.com",
  major: "Computer Engineering",
  gpa: 3.8,
  appliedCount: 3,
  mentorsCount: 1,
};

const appliedScholarships = [
  { id: 1, name: "MahaDBT", status: "Pending", appliedOn: "2024-10-15" },
  { id: 2, name: "Mahajyoti", status: "In Review", appliedOn: "2024-10-10" },
  { id: 3, name: "Dyanjyoti", status: "Accepted", appliedOn: "2024-09-28" },
];

const mentorConnections = [
  { id: 1, name: "Mr. Mentor", expertise: "Scholarship Co-ordinatior" },
];

function Dashboard() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Welcome, {studentProfile.name}!</h1>
      
      <div className="row g-4">
        {/* Left Column: Profile & Mentors */}
        <div className="col-lg-4">
          {/* Profile Summary Card */}
          <div className="card dashboard-card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title fw-bold text-primary mb-3">My Profile</h5>
              <ul className="list-unstyled">
                <li><strong>Email:</strong> {studentProfile.email}</li>
                <li><strong>Major:</strong> {studentProfile.major}</li>
                <li><strong>GPA:</strong> {studentProfile.gpa}</li>
              </ul>
              <Link to="/profile" className="btn btn-outline-primary btn-sm mt-2">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Mentor Connections Card */}
          <div className="card dashboard-card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold text-primary mb-3">My Mentors ({mentorConnections.length})</h5>
              {mentorConnections.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {mentorConnections.map(mentor => (
                    <li key={mentor.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <div>
                        <h6 className="mb-0">{mentor.name}</h6>
                        <small className="text-muted">{mentor.expertise}</small>
                      </div>
                      <Link to={`/mentor/${mentor.id}`} className="btn btn-sm btn-outline-secondary">
                        Chat
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">You haven't connected with any mentors yet.</p>
              )}
              <Link to="/mentors" className="btn btn-primary btn-sm mt-3">
                Find Mentors
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Applied Scholarships */}
        <div className="col-lg-8">
          <div className="card dashboard-card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold text-primary mb-3">My Applied Scholarships ({appliedScholarships.length})</h5>
              {appliedScholarships.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Scholarship Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Applied On</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appliedScholarships.map(app => (
                        <tr key={app.id}>
                          <td>{app.name}</td>
                          <td>
                            <span className={`badge ${
                              app.status === 'Accepted' ? 'bg-success' :
                              app.status === 'Pending' ? 'bg-warning text-dark' :
                              'bg-info'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td>{app.appliedOn}</td>
                          <td>
                            <Link to={`/scholarships/${app.id}`} className="btn btn-sm btn-outline-secondary">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="lead text-muted">You haven't applied for any scholarships yet.</p>
                  <Link to="/scholarships" className="btn btn-primary">
                    Find Scholarships
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
