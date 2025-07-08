import React from 'react'
import './style.css'

export default function NotificationCard({ notification, onClick, onDelete }) {
  return (
    <div className={`notification-container${!notification.isRead ? ' unread' : ''}`} onClick={onClick}>
        <div className="notification-header">{notification.type}</div>
        <div className="notification-content">{notification.content}</div>
        <div className="notification-time">{notification.timeAgo}</div>
        <button className="notification-delete-btn" onClick={e => { e.stopPropagation(); onDelete(notification.id); }}>Delete</button>
    </div>
  )
}
