

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext'; // NEW
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scholarships from './pages/Scholarships';
import ScholarshipDetail from './pages/ScholarshipDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Applications from './pages/Applications';
import Mentors from './pages/Mentors';
import MentorDetail from './pages/MentorDetail';
import MentorDashboard from './pages/MentorDashboard';
import MentorProfile from './pages/MentorProfile';
import AdminDashboard from './pages/AdminDashboard';
import EligibilityChecker from './pages/EligibilityChecker';
// Role-based Dashboard Redirect Component
function DashboardRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user.role === 'mentor') {
    return <Navigate to="/mentor/dashboard" replace />;
  } else {
    return <Dashboard />;
  }
}

// Admin Route Guard
function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Mentor Route Guard
function MentorRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== 'mentor') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider> {/* NEW - Wrap with Socket Provider */}
        <BrowserRouter>
          <Navbar />
          
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/scholarship/:id" element={<ScholarshipDetail />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/mentor/:id" element={<MentorDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/eligibility-checker" element={<EligibilityChecker />} />
              {/* Protected Routes - All Authenticated Users */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRedirect />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student Only Routes */}
              <Route 
                path="/applications" 
                element={
                  <ProtectedRoute>
                    <Applications />
                  </ProtectedRoute>
                } 
              />
              
              {/* Mentor Only Routes */}
              <Route 
                path="/mentor/dashboard" 
                element={
                  <MentorRoute>
                    <MentorDashboard />
                  </MentorRoute>
                } 
              />
              <Route 
                path="/mentor/profile" 
                element={
                  <MentorRoute>
                    <MentorProfile />
                  </MentorRoute>
                } 
              />
              
              {/* Admin Only Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
            </Routes>
          </main>
        </BrowserRouter>
      </SocketProvider> {/* NEW - Close Socket Provider */}
    </AuthProvider>
  );
}

export default App;