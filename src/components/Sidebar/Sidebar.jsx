import React, { useContext } from 'react';
import { Plus, MessageSquare, X } from 'lucide-react';
import { ChatContext } from '../../context/ChatContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { chatCases, activeCaseId, setActiveCaseId, createNewChat } = useContext(ChatContext);

  return (
    <>
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={() => { createNewChat(); onClose(); }}>
            <Plus size={20} />
            <span>New Chat</span>
          </button>
          <button className="sidebar-close-btn icon-btn" onClick={onClose} aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <div className="chat-list">
          {chatCases.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
              No chats yet. Start a new one!
            </div>
          ) : (
            chatCases.map((chat) => (
              <div 
                key={chat._id} 
                className={`chat-item ${activeCaseId === chat._id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCaseId(chat._id);
                  onClose();
                }}
              >
                <div className="chat-item-title">
                  <MessageSquare size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/>
                  {chat.title || 'New Chat'}
                </div>
                <div className="chat-item-subtitle">{chat.lastMessage || '...'}</div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 15
          }}
          onClick={onClose}
          className="sidebar-mobile-overlay"
        />
      )}
    </>
  );
};

export default Sidebar;
