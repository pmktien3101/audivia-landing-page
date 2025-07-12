import React from 'react'
import './style.css'
import GroupAvatar from '../../components/GroupAvatar/GroupAvatar';




export default function ListConversation({ chatRooms, currentUserId, selectedRoomId, onClick }) {
    if (!chatRooms || chatRooms.length === 0) {
      return <div className="list-conversation-empty">Không có cuộc trò chuyện nào.</div>;
    }

  
    return (
      <div className="list-conversation">
        {chatRooms.map(room => {
          if (room.type === 'private') {
            // Lấy user còn lại (không phải currentUser)
            const otherMember = room.members.find(m => m.userId !== currentUserId);
            const user = otherMember?.user;
            return (
              <div className={`conversation-item ${selectedRoomId === room.id ? 'conversation-item-selected' : ''}`} key={room.id} onClick={() => onClick(room)}>
                <img className="conversation-avatar" src={user?.avatarUrl || '/default-avatar.png'} alt={user?.username} />
                <div className='conversation-content'>
                    <span className="conversation-username"><b>{user?.username}</b></span>
                    <span className='last-message'>Vào để xem tin nhắn</span>
                </div>

              </div>
            );
          } else {
            // group
            return (
              <div className={`conversation-item ${selectedRoomId === room.id ? 'conversation-item-selected' : ''}`} key={room.id} onClick={() => onClick(room)}>
                  <GroupAvatar members={room.members} />
                <div className='conversation-content'>
                  <span className="conversation-username">{room.name}</span>
                    <span className='last-message'>Vào để xem tin nhắn</span>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }