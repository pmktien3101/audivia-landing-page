import React, { useEffect, useState } from 'react';
import './style.css';
import userService from '../../../services/user';
import NotificationService from '../../../services/notification';
import NotificationList from '../../../components/Notification/NotificationList';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [user, setUser] = useState()
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const fetchCurrentUser = async () => {
    try {
      const result = await userService.getCurrentUser()
      console.log(result);
      
      if (result)
        setUser(result)
    } catch (error) {
      console.log(error);
    }
  }
  

  const fetchNotificationByUserId = async() => {
    try {
      setIsLoading(true)
      const response = await NotificationService.getNotificationsByUser(user?.id)
      if (response)
        setNotifications(response)
    } catch (error) {
      console.log(error);      
    }
    finally 
    {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    fetchNotificationByUserId()
  }, [user])

  const handleNotificationClick = async (notification) => {
    // Mark as read and navigate
    if (!notification.isRead) {
      setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n));
      try {
        await NotificationService.updateStatusNotification(notification.id, user?.id, true);
      } catch (error) {
        setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: false } : n));
      }
    }
    // Navigate based on notification type
    if (notification.tourId) {
      navigate(`/tour-detail/${notification.tourId}`)
    } else {
      navigate('/my-wallet')
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await NotificationService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      // Optionally show error
    }
  };

  return (
    <div className='notification-main-container'>
      <div className='notification-list-main'>
        {
          isLoading ? <div className='notification-loading-container'>
            <div className='notification-loading-spinner'>Đang tải thông báo...</div>
          </div> : <NotificationList 
            notifications={notifications} 
            onNotificationClick={handleNotificationClick}
            onDeleteNotification={handleDeleteNotification}
          />
        }
      </div>

    </div>
  );
};

export default Notification; 