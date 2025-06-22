import React from 'react';
import FriendTag from '../Friend';

const FriendsList = ({list}) => {
    return (
        <div className='friend-list'>
            {list.map((friend, index)=> (
                <FriendTag
                key={index}
                avatarUrl={friend.avatarUrl}
                username={friend.userName}
                />
            ))}
        </div>
    );
};

export default FriendsList;