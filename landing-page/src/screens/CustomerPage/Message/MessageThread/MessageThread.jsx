import React from 'react'
import MessageHeader from '../MessageHeader/MessageHeader'
import MessageInput from '../MessageInput/MessageInput'
import MessageContent from '../MessageContent/MessageContent'
import './style.css'

export default function MessageThread({userId, avatarUrl, username, messages, currentUserId, typingUsers, onSend, onTyping}) {
  return (
    <div className='message-thread-container'>
        <MessageHeader avatarUrl={avatarUrl} username={username} userId={userId}/>
        <div className='message-content'>
            <MessageContent messages={messages} currentUserId={currentUserId} typingUsers={typingUsers}/>
        </div>
        <div>
          <MessageInput onSend={onSend} onTyping={onTyping}/>
        </div>


    </div>
  )
}
