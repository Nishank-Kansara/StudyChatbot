import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const AIConnectionSettings = () => {
  const { settings, updateSettings } = useContext(SettingsContext);

  const handleProviderChange = (e) => {
    updateSettings({ provider: e.target.value });
  };

  return (
    <div>
      <div className="form-group">
        <label>Select Provider</label>
        <select 
          className="select-modern" 
          value={settings.provider || 'GEMINI'}
          onChange={handleProviderChange}
        >
          <option value="GEMINI">Google Gemini</option>
          <option value="GROQ">Groq</option>
          <option value="NVIDIA">NVIDIA</option>
        </select>
      </div>

      <div className="form-group">
        <label>Model Name</label>
        <input 
          type="text" 
          className="input-modern" 
          placeholder="e.g. gemini-2.5-pro"
          value={settings.modelName || ''}
          onChange={(e) => updateSettings({ modelName: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>API Key</label>
        <input 
          type="password" 
          className="input-modern" 
          placeholder={`Enter ${(settings.provider || 'GEMINI')} API Key`}
          value={settings.apiKey || ''}
          onChange={(e) => updateSettings({ apiKey: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Base URL</label>
        <input 
          type="text" 
          className="input-modern" 
          placeholder="Base URL"
          value={settings.baseUrl || ''}
          onChange={(e) => updateSettings({ baseUrl: e.target.value })}
        />
      </div>
      
      <div className="form-group" style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label>Temperature ({settings.temperature || 0})</label>
          <input 
            type="range" 
            min="0" max="2" step="0.1"
            value={settings.temperature || 0}
            onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Max Tokens</label>
          <input 
            type="number" 
            className="input-modern" 
            value={settings.maxTokens || 0}
            onChange={(e) => updateSettings({ maxTokens: parseInt(e.target.value, 10) })}
          />
        </div>
      </div>
      
      <div className="form-group" style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <label>Top P ({settings.topP || 0})</label>
          <input 
            type="range" 
            min="0" max="1" step="0.05"
            value={settings.topP || 0}
            onChange={(e) => updateSettings({ topP: parseFloat(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={settings.streamEnabled || false}
              onChange={(e) => updateSettings({ streamEnabled: e.target.checked })}
            />
            Stream Enabled
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>System Prompt</label>
        <textarea 
          className="input-modern" 
          rows={3}
          value={settings.systemPrompt || ''}
          onChange={(e) => updateSettings({ systemPrompt: e.target.value })}
        />
      </div>
    </div>
  );
};

export default AIConnectionSettings;
