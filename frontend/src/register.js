import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTag, faUserGraduate, faEnvelope, faLock, faIdCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './register.css';
import { useNavigate } from "react-router-dom"; // To redirect after registration

function Register() {
  const [form, setForm] = useState({ 
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: '', 
    matric_number: '',
    examiner_id: '',
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
      role: form.role,
      matric_number: form.role === 'student' ? form.matric_number : undefined,
      examiner_id: form.role === 'examiner' ? form.examiner_id : undefined,
    };

    try {
      const registerRes = await axios.post("http://localhost:8000/api/register/", payload);

      if (registerRes.status === 201) {
        const identifier = form.role === 'student' ? form.matric_number : form.examiner_id;

        const loginRes = await axios.post("http://localhost:8000/api/token/", {
          username: identifier,
          password: form.password
        });

        localStorage.setItem("access_token", loginRes.data.access);
        localStorage.setItem("refresh_token", loginRes.data.refresh);

        if (form.role === 'student') {
          navigate('/student-dashboard');
        } else {
          navigate('/examiner-dashboard');
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        setError(err.response.data.detail || "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">

      <form onSubmit={handleSubmit} className="register-form">
        <p className="register-title">Create Account</p>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <div className="input-wrapper">
  <div className="icon-box">
    <FontAwesomeIcon icon={faUser} />
  </div>
  <input
    type="text"
    name="first_name"
    placeholder="First Name"
    value={form.first_name}
    onChange={handleChange}
    required
  />
</div>

<div className="input-wrapper">
  <div className="icon-box">
    <FontAwesomeIcon icon={faUserTag} />
  </div>
  <input
    type="text"
    name="last_name"
    placeholder="Last Name"
    value={form.last_name}
    onChange={handleChange}
    required
  />
</div>

<div className="input-wrapper">
  <div className="icon-box">
    <FontAwesomeIcon icon={faUserGraduate} />
  </div>
  <select
    name="role"
    value={form.role}
    onChange={handleChange}
    required
    style={{ 
      flex: 1, 
      border: "none", 
      outline: "none", 
      background: "transparent", 
      color: "white", 
      fontSize: "1rem", 
      paddingLeft: "18px" 
    }}
  >
    <option value="" disabled>Select Role</option>
    <option value="student">Student</option>
    <option value="examiner">Examiner</option>
  </select>
</div>

{form.role === 'student' && (
  <div className="input-wrapper">
    <div className="icon-box">
      <FontAwesomeIcon icon={faIdCard} />
    </div>
    <input
      type="text"
      name="matric_number"
      placeholder="Matric Number"
      value={form.matric_number}
      onChange={handleChange}
      required
    />
  </div>
)}

{form.role === 'examiner' && (
  <div className="input-wrapper">
  <div className="icon-box">
    <FontAwesomeIcon icon={faIdCard} />
  </div>
  <input
    type="text"
    name="examiner_id"
    placeholder="Examiner ID"
    value={form.examiner_id}
    onChange={handleChange}
    required
  />
</div>
)}



        <div className="input-wrapper">
          <div className="icon-box">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <div className="icon-box">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">REGISTER</button>

        <div className="login-link">
          <span>Already have an account? </span><a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
