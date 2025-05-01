import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './login.css';

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/login/", form);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      console.log("Login success");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="icon-circle">
        <FontAwesomeIcon icon={faUser} size="3x" />
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <p className="login-title">Y Exams</p>
        {error && <p className="error-text">{error}</p>}

        <div className="input-wrapper">
          <div className="icon-box">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            type="text"
            name="username"
            placeholder="User ID / Matric No."
            value={form.username}
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
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-link">
          <span>Don't have an account? </span><a href="/register">Register</a>
        </div>

        <button type="submit">LOGIN</button>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
