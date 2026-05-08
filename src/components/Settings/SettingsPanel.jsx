import React from 'react';
import { X, Settings, Database, Cloud, Link as LinkIcon } from 'lucide-react';
import AIConnectionSettings from './AIConnectionSettings';
import DatabaseSettings from './DatabaseSettings';
import ClientConnectionSettings from './ClientConnectionSettings';
import './SettingsPanel.css';

const SettingsPanel = ({ onClose }) => {
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2><Settings className="brand-icon" /> Configuration</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close settings">
          <X size={24} />
        </button>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3><Cloud size={18} /> AI Provider</h3>
          <AIConnectionSettings />
        </div>

        <div className="settings-section">
          <h3><Database size={18} /> Database Connection</h3>
          <DatabaseSettings />
        </div>

        <div className="settings-section">
          <h3><LinkIcon size={18} /> Client Connection</h3>
          <ClientConnectionSettings />
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-3d" onClick={onClose}>Done</button>
      </div>
    </div>
  );
};

export default SettingsPanel;
