import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../utils/routes';
import GroupAvatar from '../../components/GroupAvatar/GroupAvatar';
// import nếu bạn đã tách GroupAvatar ra file riêng

export default function MessageHeader({ avatarUrl, username, userId }) {
  const navigate = useNavigate();
  const handleOnClicK = () => {
    if (!userId) return;
    navigate(ROUTES.PROFILE.replace(':userId', userId));
  };

  return (
    <div className='message-header-container' onClick={handleOnClicK}>
      {Array.isArray(avatarUrl) && avatarUrl.length > 1 ? (
        <GroupAvatar members={avatarUrl} />
      ) : (
        <img
          src={avatarUrl}
          className="message-header-avatar"
          // onError={e => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
        />
      )}
      <b><h6 className='message-header-name'>{username}</h6></b>
    </div>
  );
}
