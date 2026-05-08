import { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { ChatProvider } from './context/ChatContext';
import { Bot, Settings as SettingsIcon, Menu, LogOut, User } from 'lucide-react';
import ChatInterface from './components/Chat/ChatInterface';
import SettingsPanel from './components/Settings/SettingsPanel';
import Sidebar from './components/Sidebar/Sidebar';
import LoginScreen from './components/Auth/LoginScreen';
import './App.css';

const mockAdmin = {
  "_id": "681cf2d8a123456789abcd01",
  "name": "Admin",
  "email": "admin@studentchatbot.com",
  "password": "$2a$10$hashedPassword",
  "classLevel": null,
  "role": "ADMIN",
  "createdAt": "2026-05-08T21:45:00"
};

const mockStudent = {
  "_id": "681cf2d8a123456789abcd02",
  "name": "Mock Student",
  "email": "nishank@gmail.com",
  "password": "$2a$10$hashedPassword",
  "classLevel": "10",
  "role": "STUDENT",
  "createdAt": "2026-05-08T21:50:00"
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsSettingsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        mockStudent={mockStudent}
        mockAdmin={mockAdmin}
      />
    );
  }

  return (
    <SettingsProvider>
      <ChatProvider>
        <div className="app-container">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          {/* Main Chat View */}
          <div className="main-view" style={{ transform: isSettingsOpen ? 'scale(0.95)' : 'scale(1)', filter: isSettingsOpen ? 'blur(4px)' : 'none' }}>
            <header className="top-bar">
              <div className="brand">
                <button className="icon-btn mobile-menu-btn" style={{ marginRight: '8px' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle Sidebar">
                  <Menu size={20} />
                </button>
                <Bot className="brand-icon" size={28} />
                <span>StudyBuddy AI</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <User size={16} />
                  <span className="hide-on-mobile">{currentUser.name} ({currentUser.role})</span>
                </div>

                {currentUser.role === 'ADMIN' && (
                  <button
                    className="icon-btn"
                    onClick={() => setIsSettingsOpen(true)}
                    aria-label="Settings"
                    title="Settings"
                  >
                    <SettingsIcon size={20} />
                  </button>
                )}

                <button
                  className="icon-btn"
                  onClick={handleLogout}
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </header>

            <ChatInterface />
          </div>

          {/* Settings Modal Overlay */}
          <div className={`settings-overlay ${isSettingsOpen ? 'open' : ''}`}>
            <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
          </div>
        </div>
      </ChatProvider>
    </SettingsProvider>
  );
}

export default App;
