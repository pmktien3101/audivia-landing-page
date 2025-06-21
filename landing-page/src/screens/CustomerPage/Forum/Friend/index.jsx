

import React from 'react';
import './style.css'
const FriendTag = ({avatarUrl, username}) => {
    return (
        <div className='friendtag-container'>
            <img src={avatarUrl} className="friend-avatar"></img>
            <h6 className='friend-name'>{username}</h6>
        </div>
    );
};

export default FriendTag;