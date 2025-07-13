import React, { useState, useEffect } from 'react'
import MessageHeader from '../MessageHeader/MessageHeader'
import MessageInput from '../MessageInput/MessageInput'
import MessageContent from '../MessageContent/MessageContent'
import './style.css'

export default function MessageThread({userId, avatarUrl, username, messages, currentUserId, typingUsers, onSend, onTyping, isLoading = false}) {
  const [loadingMessages, setLoadingMessages] = useState(true)

  useEffect(() => {
    // Simulate loading time for messages
    if (messages && messages.length > 0) {
      setLoadingMessages(false)
    }
  }, [messages])

  if (isLoading) {
    return (
      <div className='message-thread-container'>
        <div className='message-loading-container'>
          <div className='message-loading-spinner'></div>
          <p className='message-loading-text'>Đang tải tin nhắn...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='message-thread-container'>
        <MessageHeader avatarUrl={avatarUrl} username={username} userId={userId}/>
        <div className='message-content'>
            {loadingMessages ? (
              <div className='message-content-loading'>
                <div className='message-loading-spinner'></div>
                <p className='message-loading-text'>Đang tải tin nhắn...</p>
              </div>
            ) : (
              <MessageContent messages={messages} currentUserId={currentUserId} typingUsers={typingUsers}/>
            )}
        </div>
        <div>
          <MessageInput onSend={onSend} onTyping={onTyping}/>
        </div>
    </div>
  )
}
