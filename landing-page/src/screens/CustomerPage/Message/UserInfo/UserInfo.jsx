import React from 'react'
import './style.css'
export default function UserInfo({user}) {
  return (
    <div>
        <img src={user.avatarUrl}/>
        <p>{user.name}</p>
        <button>Xem trang cá nhân</button>
    </div>
  )
}
