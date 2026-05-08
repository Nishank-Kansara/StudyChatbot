import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const AIConnectionSettings = () => {
  const { settings, updateSettings } = useContext(SettingsContext);

  const handleProviderChange = (e) => {
    updateSettings({ aiProvider: e.target.value });
  };

  return (
    <div>
      <div className="form-group">
        <label>Select Provider</label>
        <select 
          className="select-modern" 
          value={settings.aiProvider}
          onChange={handleProviderChange}
        >
          <option value="gemini">Google Gemini</option>
          <option value="chatgpt">OpenAI ChatGPT</option>
          <option value="azure">Azure OpenAI</option>
        </select>
      </div>

      <div className="form-group">
        <label>API Key</label>
        <input 
          type="password" 
          className="input-modern" 
          placeholder={`Enter ${settings.aiProvider.toUpperCase()} API Key`}
          value={settings.apiKey}
          onChange={(e) => updateSettings({ apiKey: e.target.value })}
        />
      </div>

      {settings.aiProvider === 'azure' && (
        <>
          <div className="form-group">
            <label>Azure Endpoint</label>
            <input 
              type="text" 
              className="input-modern" 
              placeholder="https://your-resource.openai.azure.com/"
              value={settings.azureEndpoint}
              onChange={(e) => updateSettings({ azureEndpoint: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Deployment Name</label>
            <input 
              type="text" 
              className="input-modern" 
              placeholder="e.g., gpt-35-turbo"
              value={settings.azureDeploymentName}
              onChange={(e) => updateSettings({ azureDeploymentName: e.target.value })}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AIConnectionSettings;
