// src/components/MessageModal.jsx

import React, { useState } from 'react';
import './MessageModal.css';

const MessageModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = (event) => setInputMessage(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputMessage.trim() === '') return; // Prevent sending empty messages
    const newMessage = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
    simulateReply(); // Simulate a reply from the server
  };

  const simulateReply = () => {
    setTimeout(() => {
      const replyMessage = { text: 'This is a simulated reply.', sender: 'receiver' };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    }, 1000); // Simulate a delay for the reply
  };

  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Chat</h2>
          <div className="chat-box">
            {messages.map((message, index) => (
              <div key={index} className={message.sender === 'user' ? 'message user' : 'message receiver'}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
              required
            />
            <button type="submit" className="send-button">
              <span className="send-icon">&#10148;</span> {/* Send icon */}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default MessageModal;
