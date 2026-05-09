import React, { useContext, useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { ChatContext } from '../../context/ChatContext';
import LottieComponent from 'lottie-react';
import bookLottie from '../../assets/book-lottie.json';
import './ChatInterface.css';

const Lottie = typeof LottieComponent === 'function' ? LottieComponent : LottieComponent.default || LottieComponent;

const ChatInterface = () => {
  const { chatMessages, activeCaseId, createNewChat, addMessage } = useContext(ChatContext);
  const [isTyping, setIsTyping] = useState(false);

  // If there's no active chat, create one on load
  useEffect(() => {
    if (!activeCaseId) {
      createNewChat();
    }
  }, [activeCaseId, createNewChat]);

  const messages = activeCaseId && chatMessages[activeCaseId] ? chatMessages[activeCaseId] : [];

  const handleSendMessage = (text, images) => {
    if (!activeCaseId) return;

    // 1. Add user message
    addMessage(activeCaseId, {
      sender: 'USER',
      message: text,
      images: images
    });

    setIsTyping(true);

    // 2. Simulate AI response
    setTimeout(() => {
      addMessage(activeCaseId, {
        sender: 'AI',
        message: "That's an interesting question! I am a simulated response since we're currently in the frontend-only UI demo. Make sure to configure your AI Provider in the settings panel once the backend is hooked up!",
        images: []
      });
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`chat-container ${messages.length === 0 ? 'empty' : ''}`}>
      
      <div className="messages-area-wrapper">
        <div className={`empty-state-content ${messages.length === 0 ? 'visible' : 'hidden'}`}>
          <div className="lottie-container">
            <Lottie animationData={bookLottie} loop={true} />
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-main)' }}>How can I help you today?</h2>
        </div>

        {messages.length > 0 && (
          <MessageList messages={messages} isTyping={isTyping} />
        )}
      </div>

      <div className="input-transition-wrapper">
        <MessageInput onSend={handleSendMessage} />
      </div>

      <div className="bottom-spacer" />

    </div>
  );
};

export default ChatInterface;
