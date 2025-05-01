import React from 'react';
import './examiner-dashboard.css';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';


function ExaminerDashboard() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");
  
    useEffect(() => {
      const countdown = () => {
        const examDate = new Date();
        examDate.setMonth(examDate.getMonth() + 2);
        const now = new Date();
        const difference = examDate - now;
  
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
  
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      };
  
      countdown();
      const timer = setInterval(countdown, 1000);
      return () => clearInterval(timer);
    }, []);

  return (
    <div className="examiner-dashboard">
      <div className="top-nav">
      <div className="exam-info">
          <span>{new Date().toLocaleDateString()}</span>
          <span>Next Exam: {timeLeft}</span>
        </div>
        <button className="logout-btn">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>

      {!mobileNavOpen && (
  <button className="hamburger" onClick={() => setMobileNavOpen(true)}>
    ☰
  </button>
)}

{mobileNavOpen && (
  <div className="mobile-overlay">
    <button className="close-btn" onClick={() => setMobileNavOpen(false)}>✖</button>
    <ul className="mobile-menu">
        <li>Dashboard</li>
        <li>Exams</li>
        <li>Proctor</li>
        <li>Grades</li>
        <li>Settings</li>
        <li>Logout</li>
    </ul>
  </div>
)}

      <div className="side-nav">
        <ul>
          <li>Dashboard</li>
          <li>Exams</li>
          <li>Proctor</li>
          <li>Grades</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Welcome, Examiner!</h1>
        <p>Your dashboard controls are here.</p>
      </div>
    </div>
  );
}

export default ExaminerDashboard;
