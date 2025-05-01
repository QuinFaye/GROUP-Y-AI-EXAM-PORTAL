import React, { useState } from 'react';
import './forgot-password.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reset link sent to: ${email}`);
    // to be connected to backend
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        
        <div class="input-wrapper">
          <div class="icon-box">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        
        <button type="submit">Send Reset Link</button>
        
        <a className="back-link" href="/login">← Back to Login</a>
      </form>
    </div>
  );
}

export default ForgotPassword;
