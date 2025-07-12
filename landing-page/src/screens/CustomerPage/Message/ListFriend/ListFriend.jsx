import React, { useState } from 'react';
import './style.css'

export default function ListFriend({ list, onClick }) {
  const [page, setPage] = useState(0);
  const pageSize = 5;

  if (!list || list.length === 0) {
    return <div className="list-friend-empty">Không có bạn bè nào.</div>;
  }

  const start = page * pageSize;
  const end = start + pageSize;
  const currentList = list.slice(start, end);

  return (
    <div className="list-friend">
      {currentList.map(friend => (
        <div className="friend-item" key={friend.id} onClick={() => onClick(friend.id)}>
          <img className="friend-avatar" src={friend.avatarUrl || '/default-avatar.png'} alt={friend.username} />
          <span className="friend-username">{friend.userName}</span>
        </div>
      ))}
      <div className="list-friend-pagination">
        {page > 0 && (
          <button onClick={() => setPage(page - 1)}>&lt;</button>
        )}
        {end < list.length && (
          <button onClick={() => setPage(page + 1)}>&gt;</button>
        )}
      </div>
    </div>
  );
}
