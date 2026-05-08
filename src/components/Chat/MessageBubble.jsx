import React from 'react';
import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`message-bubble-wrapper ${isUser ? 'user' : 'ai'}`}>
      <div className="avatar">
        {isUser ? <User size={20} color="white" /> : <Bot size={20} color="white" />}
      </div>
      
      <div className="message-content">
        <div className="text">{message.text}</div>
        
        {message.images && message.images.length > 0 && (
          <div className="message-images-grid" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            {message.images.map((img, idx) => (
              <img key={idx} src={img} alt="Uploaded attachment" className="message-image" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
