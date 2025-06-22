import React from 'react';
import { FiImage, FiMapPin } from 'react-icons/fi';

export const CreatePostActions = ({ onClick }) => {
  return (
    <div className="create-post-actions">
      <div className="create-post-action" onClick={onClick}>
        <FiImage color="green" />
        <span>Ảnh</span>
      </div>
      <div className="create-post-action" onClick={onClick}>
        <FiMapPin color="blue" />
        <span>Check in</span>
      </div>
    </div>
  );
};