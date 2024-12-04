import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { register } from "../../api";
import "./RegisterPage.css";
import AppleTextfield from "../../components/AppleTextfield/AppleTextfield";

export const RegisterPage = () => {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      setError("");
      setSuccess(false);

      if (!nameValue || !emailValue || !passwordValue) {
        setError("All fields are required.");
        return;
      }

      const response = await register({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="registerpage__parent-container">
      <div className="container">
        <div className="header">
          <div className="text">Register New Account</div>
        </div>

        <div className="entries">
          {/* NAME */}
          <AppleTextfield
            id="name"
            label="Name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            required
          />

          {/* EMAIL */}
          <AppleTextfield
            id="email"
            label="Email"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <AppleTextfield
            id="password"
            label="Password"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Registration successful! You can now <Link to="/login">sign in</Link>.
          </div>
        )}

        {/*Register and Login Button*/}
        <div className="submit-container">
          <div className="submit-register" onClick={handleRegister}>Register</div>
        </div>

        {/*Register New Account Hyperlink*/}
        <div className="register-new-account">
          Already have an account?{" "}
          <span>
            <Link to="/login">Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
