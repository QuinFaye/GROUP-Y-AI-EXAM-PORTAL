import React from 'react';
import './student-dashboard.css';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';


function StudentDashboard() {
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
      <div className="student-dashboard">
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
            <li>Take Exam</li>
            <li>My Results</li>
            <li>Support</li>
            <li>Settings</li>
            <li>Logout</li>
    </ul>
  </div>
)}


        <div className="side-nav">
          <ul>
            <li>Dashboard</li>
            <li>Take Exam</li>
            <li>My Results</li>
            <li>Support</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </div>
  
        <div className="main-content">
            <div className="welcome-box">
                <div className="welcome-header">
                     <h2>WELCOME BACK, Jane</h2>
                     <p>You have completed 3 of 5 exams this semester</p>
                </div>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${(3 / 5) * 100}%` }}></div>
                </div>
            </div>

            <div className="exam-section">

{/* Ongoing Exams */}
<h3 className="section-title">Ongoing Exams</h3>
<div className="exam-card ongoing">
  <div className="exam-details">
    <h4>Elementary Differential Equation</h4>
    <p className="course-code">MTH 202</p>
    <p><strong>Date:</strong> 21-04-2025</p>
    <p><strong>Duration:</strong> 30 minutes - 35 questions</p>
    <p><strong>Attempt Interval:</strong> 10:00am - 18:00pm</p>
  </div>
  <div className="exam-status">
    <span className="status ongoing-status">● Ongoing</span>
    <button className="start-btn">Start Exam</button>
  </div>
</div>

{/* Upcoming Exams */}
<h3 className="section-title">Upcoming Exams</h3>
<div className="exam-card upcoming">
  <div className="exam-details">
    <h4>Introduction to Probability</h4>
    <p className="course-code">STA 102</p>
    <p><strong>Date:</strong> 24-04-2025</p>
    <p><strong>Duration:</strong> 45 minutes - 40 questions</p>
    <p><strong>Attempt Interval:</strong> 9:00am - 4:00pm</p>
  </div>
  <div className="exam-status">
    <span className="status upcoming-status">● Not Started</span>
    <button className="view-btn">View Details</button>
  </div>
</div>

{/* Completed Exams */}
<h3 className="section-title">Completed Exams</h3>
<div className="completed-exams">
  {[1, 2, 3].map((item) => (
    <div key={item} className="exam-card completed">
      <div className="exam-details">
        <h4>Course Title {item}</h4>
        <p className="course-code">COURSE 10{item}</p>
        <p><strong>Date:</strong> 12-04-2025</p>
        <p><strong>Duration:</strong> 40 minutes - 50 questions</p>
      </div>
      <div className="exam-status">
        <span className="status completed-status">● Completed</span>
        <button className="view-btn">View Result</button>
      </div>
    </div>
  ))}
</div>
</div>


        </div>

      </div>
    );
  }
  
  export default StudentDashboard;
