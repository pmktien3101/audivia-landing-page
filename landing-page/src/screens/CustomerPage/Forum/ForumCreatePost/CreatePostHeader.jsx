import React from 'react';

export const CreatePostHeader = ({ avatarUrl, onClick }) => {
  return (
    <div className="create-post-header">
      <img src={avatarUrl} alt="avatar" className="create-post-avatar" />
      <div className="create-post-input" onClick={onClick}>
        Bạn đang nghĩ gì?
      </div>
    </div>
  );
};