import { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatCases, setChatCases] = useState(() => {
    const saved = localStorage.getItem('chatbot-cases');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('chatbot-messages');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCaseId, setActiveCaseId] = useState(null);

  useEffect(() => {
    localStorage.setItem('chatbot-cases', JSON.stringify(chatCases));
  }, [chatCases]);

  useEffect(() => {
    localStorage.setItem('chatbot-messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const createNewChat = (user) => {
    const newCaseId = `case_${Date.now()}`;
    const newCase = {
      _id: newCaseId,
      userId: user?._id || 'unknown_user',
      title: 'New Chat',
      subject: 'General',
      provider: 'NVIDIA',
      modelUsed: 'google/gemma-2-2b-it',
      lastMessage: 'Say hi to start the conversation!',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setChatCases(prev => [newCase, ...prev]);
    setChatMessages(prev => ({ ...prev, [newCaseId]: [] }));
    setActiveCaseId(newCaseId);
  };

  const addMessage = (caseId, messageData) => {
    const newMsg = {
      _id: `msg_${Date.now()}`,
      caseId: caseId,
      sender: messageData.sender || 'USER',
      message: messageData.message || '',
      images: messageData.images || [], // Storing images if provided
      provider: 'NVIDIA', // Or pull from settings
      modelUsed: 'google/gemma-2-2b-it',
      createdAt: new Date().toISOString()
    };

    setChatMessages(prev => ({
      ...prev,
      [caseId]: [...(prev[caseId] || []), newMsg]
    }));

    // Update case lastMessage
    setChatCases(prev => prev.map(c => {
      if (c._id === caseId) {
        return { 
          ...c, 
          lastMessage: messageData.message || c.lastMessage, 
          updatedAt: new Date().toISOString() 
        };
      }
      return c;
    }));
  };

  return (
    <ChatContext.Provider value={{ 
      chatCases, 
      chatMessages, 
      activeCaseId, 
      setActiveCaseId, 
      createNewChat, 
      addMessage 
    }}>
      {children}
    </ChatContext.Provider>
  );
};
