import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const ClientConnectionSettings = () => {
  const { settings, updateSettings } = useContext(SettingsContext);

  return (
    <div className="form-group">
      <label>Client Backend URL</label>
      <input 
        type="text" 
        className="input-modern" 
        placeholder="https://api.yourclient.com/v1"
        value={settings.clientConnectionUrl}
        onChange={(e) => updateSettings({ clientConnectionUrl: e.target.value })}
      />
       <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
        Custom webhook or external API connection endpoint.
      </small>
    </div>
  );
};

export default ClientConnectionSettings;
