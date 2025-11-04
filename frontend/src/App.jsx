import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scholarships from './pages/Scholarships';

 // --- IMPORT NEW DASHBOARD PAGE ---
// Placeholder components for other pages


const ScholarshipList = () => <div className="container pt-5 text-center"><h2>Scholarships Page Coming Soon</h2></div>;
const MentorList = () => <div className="container pt-5 text-center"><h2>Mentors Page Coming Soon</h2></div>;
const Login = () => <div className="container pt-5 text-center"><h2>Login Page Coming Soon</h2></div>;
// --- FIXED TYPO IN THIS LINE ---
const Register = () => <div className="container pt-5 text-center"><h2>Register Page Coming Soon</h2></div>;

function App() {
  return (
    <BrowserRouter>
      {/* Navbar will be displayed on all pages */}
      <Navbar />
      
      {/* Page content will be rendered here based on the route */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

// // Import Bootstrap CSS - Make sure to install bootstrap: npm install bootstrap
// // You should import this in your main.jsx or index.js file
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // Import your custom global styles
// // import './main.css';

// // Import Components

// src/App.jsx
