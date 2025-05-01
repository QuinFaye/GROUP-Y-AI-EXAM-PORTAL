import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import ForgotPassword from './forgot-password';
import StudentDashboard from './student-dashboard';
import ExaminerDashboard from './examiner-dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/examiner-dashboard" element={<ExaminerDashboard />} />
        <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
        <Route path="*" element={<Login />} /> {/* Redirect to login for any unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
