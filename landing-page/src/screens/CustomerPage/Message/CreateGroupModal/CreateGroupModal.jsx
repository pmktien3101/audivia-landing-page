import React, { useState } from 'react';
import './style.css';
import toast from 'react-hot-toast';

export default function CreateGroupModal({ friends, onClose, onCreateGroup }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFriendToggle = (friendId) => {
    setSelectedFriends(prev => {
      if (prev.includes(friendId)) {
        return prev.filter(id => id !== friendId);
      } else {
        return [...prev, friendId];
      }
    });
  };

  const handleCreateGroup = async () => {
    if (selectedFriends.length === 0) {
      alert('Vui lòng chọn ít nhất một bạn bè');
      return;
    }
    if (!groupName.trim()) {
      toast.error('Vui lòng nhập tên nhóm');
      return;
    }

    setIsLoading(true);
    try {
      await onCreateGroup(groupName, selectedFriends);
      onClose();
    } catch (error) {
      console.error('Lỗi tạo nhóm:', error);
      toast.error('Có lỗi xảy ra khi tạo nhóm');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tạo nhóm chat</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Tên nhóm:</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nhập tên nhóm..."
              maxLength={50}
            />
          </div>
          
          <div className="form-group">
            <label>Chọn bạn bè ({selectedFriends.length} đã chọn):</label>
            <div className="friends-list">
              {friends?.map(friend => (
                <div 
                  key={friend.id} 
                  className={`friend-item ${selectedFriends.includes(friend.id) ? 'selected' : ''}`}
                  onClick={() => handleFriendToggle(friend.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleFriendToggle(friend.id)}
                  />
                  <img 
                    className="friend-avatar conversation-avatar" 
                    src={friend.avatarUrl || '/default-avatar.png'} 
                    alt={friend.userName} 
                  />
                  <span className="friend-name conversation-title">{friend.userName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose} disabled={isLoading}>
            Hủy
          </button>
          <button 
            className="create-button" 
            onClick={handleCreateGroup}
            disabled={isLoading || selectedFriends.length === 0 || !groupName.trim()}
          >
            {isLoading ? 'Đang tạo...' : 'Tạo nhóm'}
          </button>
        </div>
      </div>
    </div>
  );
} 