import { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('chatbot-settings');
    return saved ? JSON.parse(saved) : {
      aiProvider: 'gemini', // default
      azureEndpoint: '',
      azureDeploymentName: '',
      apiKey: '',
      mongoDbUri: '',
      clientConnectionUrl: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('chatbot-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
