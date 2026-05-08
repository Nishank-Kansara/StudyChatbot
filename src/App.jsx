import { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { Bot, Settings as SettingsIcon } from 'lucide-react';
import ChatInterface from './components/Chat/ChatInterface';
import SettingsPanel from './components/Settings/SettingsPanel';
import './App.css';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [role, setRole] = useState('student'); // 'student' or 'admin'

  return (
    <SettingsProvider>
      <div className="app-container">
        {/* Main Chat View */}
        <div className="main-view" style={{ transform: isSettingsOpen ? 'scale(0.95)' : 'scale(1)', filter: isSettingsOpen ? 'blur(4px)' : 'none' }}>
          <header className="top-bar">
            <div className="brand">
              <Bot className="brand-icon" size={28} />
              <span>StudyBuddy AI</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Temporary Role Toggle for Demo Purposes */}
              <select 
                className="select-modern" 
                style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
                value={role} 
                onChange={(e) => {
                  setRole(e.target.value);
                  if (e.target.value !== 'admin') setIsSettingsOpen(false);
                }}
              >
                <option value="student">Student View</option>
                <option value="admin">Admin View</option>
              </select>

              {role === 'admin' && (
                <button 
                  className="icon-btn" 
                  onClick={() => setIsSettingsOpen(true)}
                  aria-label="Settings"
                >
                  <SettingsIcon size={20} />
                </button>
              )}
            </div>
          </header>
          
          <ChatInterface />
        </div>

        {/* Settings Modal Overlay */}
        <div className={`settings-overlay ${isSettingsOpen ? 'open' : ''}`}>
           <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;
