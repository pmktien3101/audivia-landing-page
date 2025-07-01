import React from 'react';
import FriendTag from '../Friend';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../utils/routes';

const FriendsList = ({list}) => {
    const navigate = useNavigate();
    return (
        <div className='friend-list'>
            {list.map((friend, index)=> (
                <div
                    key={index}
                    onClick={() => navigate(ROUTES.PROFILE.replace(':userId', friend.id))}
                    style={{cursor: 'pointer'}}
                >
                    <FriendTag
                        avatarUrl={friend.avatarUrl}
                        username={friend.userName}
                    />
                </div>
            ))}
        </div>
    );
};

export default FriendsList;