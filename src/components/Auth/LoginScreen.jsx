import React, { useState } from 'react';
import { Bot, Mail, Lock, User as UserIcon, AlertCircle, Eye, EyeOff } from 'lucide-react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin, mockStudent, mockAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Simulated Auth Check
      if (email === mockStudent.email && password === mockStudent.password) {
        onLogin(mockStudent);
      } else if (email === mockAdmin.email && password === mockAdmin.password) {
        onLogin(mockAdmin);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Simulated Signup
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
      // Create a mock user object for the demo
      const newUser = {
        _id: 'new_user_' + Date.now(),
        name,
        email,
        password,
        role,
        classLevel: role === 'STUDENT' ? '10' : null,
        createdAt: new Date().toISOString()
      };
      onLogin(newUser);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-inner">
        <div className="login-card glass-panel">
          <div className="login-header">
          <Bot className="login-brand-icon" size={48} />
          <h1>StudyBuddy AI</h1>
          <p>{isLogin ? 'Sign in to continue your learning journey.' : 'Create an account to start learning.'}</p>
        </div>

        <div className="login-tabs">
          <button 
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(true); setError(''); }}
            type="button"
          >
            Sign In
          </button>
          <button 
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setError(''); }}
            type="button"
          >
            Create Account
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-scroll-area">
            {error && (
              <div className="auth-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <UserIcon size={18} className="left-icon" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="left-icon" />
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="left-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>I am a...</label>
                <select 
                  className="select-modern full-width"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="STUDENT">Student</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Student: <span>{mockStudent.email}</span> / <span>{mockStudent.password}</span></p>
          <p>Admin: <span>{mockAdmin.email}</span> / <span>{mockAdmin.password}</span></p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
