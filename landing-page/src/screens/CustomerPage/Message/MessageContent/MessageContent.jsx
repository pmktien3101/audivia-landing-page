import React, { useEffect, useRef } from 'react';
import './style.css';

export default function MessageContent({ messages, currentUserId, typingUsers }) {
  // Group messages theo ngày (nếu muốn)
  // Hoặc chỉ render tuần tự nếu chưa cần group

  const endRef = useRef(null);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, typingUsers]);
  return (
    <div className="message-content-list">
      {messages && messages.length === 0 && (
        <div className="message-empty">Chưa có tin nhắn nào.</div>
      )}
      {messages && messages.map((msg, idx) => {
        const isMine = msg.sender.id === currentUserId;
        
        return (
          <div
            key={msg.id || idx}
            className={`message-row ${isMine ? 'mine' : 'friend'}`}
          >
            {/* Chỉ render avatar nếu không phải của mình */}
            {!isMine && (
              <img
                className="message-avatar"
                src={msg.sender.avatarUrl || '/default-avatar.png'}
                alt={msg.sender.username}
              />
            )}
            <div className="message-bubble">
              <div className="message-content-text">{msg.content}</div>
              <div className="message-time">
                {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        );
      })}
      {typingUsers && typingUsers.length > 0 && (
        <div className="message-row friend">
          <img
            className="message-avatar"
            src={typingUsers[0]?.avatarUrl || "/default-avatar.png"}
            alt={typingUsers[0]?.username || "User"}
          />
          <div className="message-bubble typing-indicator">
            <span>
              {typingUsers.length === 1 
                ? `${typingUsers[0]?.username || 'Người dùng'} đang nhập...` 
                : `${typingUsers.length} người đang nhập...`
              }
            </span>
          </div>
        </div>
      )}
      <span ref={endRef} style={{ display: 'block', height: 0 }} />
    </div>
  );
}
