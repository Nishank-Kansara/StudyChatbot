import React from 'react';
import { Bot, User, ShieldCheck } from 'lucide-react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin, mockStudent, mockAdmin }) => {
  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="login-header">
          <Bot className="login-brand-icon" size={48} />
          <h1>StudyBuddy AI</h1>
          <p>Sign in to continue your learning journey.</p>
        </div>

        <div className="login-options">
          <button 
            className="login-btn student-btn"
            onClick={() => onLogin(mockStudent)}
          >
            <div className="login-btn-content">
              <User size={24} />
              <div className="login-btn-text">
                <span className="login-role">Student</span>
                <span className="login-name">{mockStudent.name}</span>
              </div>
            </div>
          </button>

          <button 
            className="login-btn admin-btn"
            onClick={() => onLogin(mockAdmin)}
          >
            <div className="login-btn-content">
              <ShieldCheck size={24} />
              <div className="login-btn-text">
                <span className="login-role">Admin</span>
                <span className="login-name">{mockAdmin.name}</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
