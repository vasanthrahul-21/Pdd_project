import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'driver'

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { mobileNumber, password, userType: activeTab });
    // Add your authentication logic here
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="login-heading">
          Book Ambulance Services for event with <span className="highlight">Best Facility</span>
        </h1>
        <div className="decorative-shapes">
          <div className="pink-square"></div>
          <div className="blue-square"></div>
        </div>
      </div>
      
      <div className="login-right">
        <h2 className="login-title">Log in Medulance</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your Mobile No."
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <p className="privacy-note">We'll never share your Number with anyone else.</p>
          
          <button type="submit" className="submit-button">SUBMIT</button>
          
          <button 
            type="button" 
            className="driver-button"
            onClick={() => setActiveTab('driver')}
          >
            DRIVER LOGIN
          </button>
        </form>
        
        <div className="footer">
          <p>Copyright © Medulance. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;