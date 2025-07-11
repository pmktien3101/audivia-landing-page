import React from 'react';
import './style.css'
export default function GroupAvatar({ members }) {
    // Lấy tối đa 3 avatar đầu tiên
    const avatars = Array.isArray(members)
    ? members.map(m => m.user?.avatarUrl).filter(Boolean).slice(0, 3)
    : [];

    // Vị trí tam giác đều trong 1 hình tròn 40x40
    const positions = [
    { top: 2, left: 12 },   // trên giữa
    { top: 20, left: 2 },  // dưới trái
    { top: 20, left: 22 }, // dưới phải
    ];

    return (
    <div className="group-avatar-circle">
    {avatars.map((url, idx) => (
        <img
        key={idx}
        src={url}
        alt="avatar"
        className="group-avatar-img"
        style={{ ...positions[idx], position: 'absolute' }}
        />
    ))}
    </div>
    );
}
