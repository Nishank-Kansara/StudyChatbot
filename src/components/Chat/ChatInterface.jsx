import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: "Hi there! I'm your StudyBuddy AI. I can help you with math, science, history, and more! You can even upload pictures of your homework. How can I help you today?",
      images: []
    }
  ]);

  const handleSendMessage = (text, images) => {
    // 1. Add user message to UI
    const newUserMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      images
    };
    
    setMessages(prev => [...prev, newUserMsg]);

    // 2. Simulate AI response (In real app, call your backend/provider here)
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "That's an interesting question! I am a simulated response since we're currently in the frontend-only UI demo. Make sure to configure your AI Provider in the settings panel once the backend is hooked up!",
        images: []
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
