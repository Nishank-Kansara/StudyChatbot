import { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('chatbot-settings');
    return saved ? JSON.parse(saved) : {
      provider: 'GEMINI',
      modelName: 'gemini-2.5-pro',
      apiKey: '',
      baseUrl: 'https://generativelanguage.googleapis.com',
      temperature: 0.6,
      topP: 0.7,
      maxTokens: 1500,
      streamEnabled: true,
      systemPrompt: 'You are a teacher who explains concepts in very simple language for students from class 7th to 12th.',
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
