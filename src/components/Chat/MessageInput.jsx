import React, { useState, useRef, useEffect } from 'react';
import { Send, ImagePlus, X } from 'lucide-react';
const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = () => {
    if (text.trim() === '' && images.length === 0) return;
    onSend(text, images);
    setText('');
    setImages([]);

    // Reset textarea height after sending
    if (fileInputRef.current && fileInputRef.current.nextElementSibling) {
      const textarea = document.querySelector('.chat-input');
      if (textarea) textarea.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
    // Reset file input so same file can be selected again
    e.target.value = '';
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="input-area-wrapper">
      <div className="input-container">

          <button
            className="action-btn"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload Image"
          >
            <ImagePlus size={22} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Image Previews */}
            {images.length > 0 && (
              <div className="image-preview-area">
                {images.map((img, idx) => (
                  <div key={idx} className="image-preview-item">
                    <img src={img} alt={`Preview ${idx}`} />
                    <button className="remove-img-btn" onClick={() => removeImage(idx)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <textarea
              className="chat-input"
              placeholder={isMobile ? "Ask anything..." : "Ask anything or share a photo of your homework..."}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>

          <button
            className="action-btn send-btn"
            onClick={handleSend}
            disabled={text.trim() === '' && images.length === 0}
            aria-label="Send Message"
          >
            <Send size={20} />
          </button>

        </div>
    </div>
  );
};

export default MessageInput;
