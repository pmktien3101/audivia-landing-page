import React from 'react'
import NotificationCard from '../NotificationCard'
import './style.css'

export default function NotificationList({ notifications = [], onNotificationClick, onDeleteNotification }) {
  // if (!notifications.length) {
  //   return <div className="notification-list-empty">No notifications.</div>;
  // }
  return (
    <div className="notification-list-container">
      {notifications.map((notification) => (
        <NotificationCard 
          key={notification.id} 
          notification={notification} 
          onClick={() => onNotificationClick(notification)}
          onDelete={onDeleteNotification}
        />
      ))}
    </div>
  );
}
