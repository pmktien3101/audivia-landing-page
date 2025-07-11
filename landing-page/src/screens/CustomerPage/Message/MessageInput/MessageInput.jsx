import React, { useState } from 'react';
import './style.css'
export default function MessageInput({ onSend, onTyping }) {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    if (onSend) onSend(message);
    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value)
    if (onTyping) onTyping()
  }

  return (
    <form className="message-input" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Nhập tin nhắn..."
        value={message}
        onChange={handleChange}
        autoComplete="off"
      />
      <button type="submit">Gửi</button>
    </form>
  );
} 