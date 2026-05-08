import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const DatabaseSettings = () => {
  const { settings, updateSettings } = useContext(SettingsContext);

  return (
    <div className="form-group">
      <label>MongoDB Connection URI</label>
      <input 
        type="password" 
        className="input-modern" 
        placeholder="mongodb+srv://..."
        value={settings.mongoDbUri}
        onChange={(e) => updateSettings({ mongoDbUri: e.target.value })}
      />
      <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
        Used to store and fetch chat history.
      </small>
    </div>
  );
};

export default DatabaseSettings;
