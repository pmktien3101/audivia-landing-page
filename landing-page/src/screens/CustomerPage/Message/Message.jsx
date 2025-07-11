/**
 * Message.jsx - cập nhật URL với roomId khi click, tự động load lại room khi refresh
 */
import React, { useEffect, useState } from 'react'
import './style.css'
import MessageThread from './MessageThread/MessageThread'
import ListFriend from './ListFriend/ListFriend'
import ListConversation from './ListConversation/ListConversation'
import useUser from '../../../hooks/useUser'
import userService from '../../../services/user'
import MessageService from '../../../services/message'
import ChatService from '../../../services/chat'
import { createGroupAvatarUrl } from '../../../utils/groupAvatar'
import { useParams, useNavigate } from 'react-router-dom'
import { ChatSignalRService } from '../../../services/chatSignalR'
import CreateGroupModal from './CreateGroupModal'
import UserInfo from './UserInfo/UserInfo'

export default function Message() {
  const token = localStorage.getItem('accessToken');
  const {id} = useParams()
  const navigate = useNavigate()
  const user = useUser()
  const [friends, setFriends] = useState()
  const [chatRooms, setChatRooms] = useState([])
  const [messageHeader, setMessageHeader] = useState({})
  const [messages, setMessages] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const [typingUsers, setTypingUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const fetchCurrentUser = async () => {
    try {
      const rs = await userService.getCurrentUser()
      setCurrentUser(rs)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    fetchCurrentUser()
  }, [])
  // Khởi tạo SignalR connection - chỉ chạy một lần khi component mount
  useEffect(() => {
    const startSignalR = async () => {
      if (token && user?.userId) {
        try {
          await ChatSignalRService.startConnection(token);
        } catch (error) {
          console.error('Failed to start SignalR connection:', error);
        }
      }
    };
    startSignalR();
  }, [token, user?.userId]);

  // Lắng nghe message và typing events
  useEffect(() => {
    // Lắng nghe nhận message realtime
    const handleReceiveMessage = (data) => {
      
      let message = data.response ? data.response : data;
    
      if (!message.sender || !message.sender.id) {
        const guid = message.id || ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      
        let avatarUrl = '';
        if (message.senderId === user.userId) {
          // Tin nhắn của mình
          avatarUrl = user.raw.avatarUrl;
        } else {
          // Tin nhắn của người khác: tìm trong friends
          const friend = friends?.find(f => f.id === message.senderId);
          avatarUrl = friend?.avatarUrl;
        }
      
        message = { ...message, sender: { id: message.senderId, avatarUrl: avatarUrl }, id: guid };
      }
    
      // Chỉ thêm nếu chưa có message.id trong mảng
      setMessages(prev => {
        if (!Array.isArray(prev)) return [message];
        if (prev.some(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };
    ChatSignalRService.onReceiveMessage(handleReceiveMessage);
    
    // Lắng nghe typing status
    const handleUserTyping = (data) => { //nhận data từ signalR
      if (data.chatRoomId === id && chatRooms && chatRooms.length > 0) {
        // Tìm thông tin user từ friends hoặc chatRooms
        let userInfo = null;
        
        // Tìm trong friends trước
        // if (friends) {
        //   userInfo = friends.find(f => f.id === data.userId);
        // }
        
        // Nếu không tìm thấy trong friends, tìm trong chatRooms
        // if (!userInfo && chatRooms.length > 0) {
        //   const currentRoom = chatRooms.find(r => r.id === id);
        //   if (currentRoom) {
        //     const member = currentRoom.members.find(m => m.userId === data.userId);
        //     userInfo = member?.user;
        //   }
        // }
        const currentRoom = chatRooms.find(r => r.id === id);
        if (currentRoom) {
          const member = currentRoom.members.find(m => m.userId === data.userId);
          userInfo = member?.user;
        }
        
        // Thêm user vào danh sách đang typing
        setTypingUsers(prev => {
          if (!prev.find(user => user.userId === data.userId)) {
            return [...prev, { 
              userId: data.userId,
              username: userInfo?.username || 'Người dùng',
              avatarUrl: userInfo?.avatarUrl
            }];
          }
          return prev;
        });
        
        // Tự động xóa sau 3 giây
        setTimeout(() => {
          setTypingUsers(prev => prev.filter(user => user.userId !== data.userId));
        }, 3000);
      }
    };
    
    ChatSignalRService.onUserTyping(handleUserTyping);
    
    return () => {
      ChatSignalRService.removeMessageCallback(handleReceiveMessage);
      ChatSignalRService.removeTypingCallback(handleUserTyping);
    };
  }, [user, id, friends, chatRooms]);


  useEffect(() => {
    if (chatRooms.length > 0) {
      if (id && chatRooms.find(r => r.id === id)) {
        const room = chatRooms.find(r => r.id === id);
        if (room) {
          setSelectedRoomId(room.id);
          handleConversationClick(room, { skipNavigate: true });
        }
      } else {
        // Nếu không có id, tự động chọn room mới nhất
        const mostRecentRoom = chatRooms[0];
        if (mostRecentRoom) {
          setSelectedRoomId(mostRecentRoom.id);
          handleConversationClick(mostRecentRoom, { skipNavigate: true });
        }
      }
      setTypingUsers([]);
    }
  }, [id, chatRooms]);

  // Lấy danh sách bạn bè
  const fetchListFriend = async () => {
    try {
      if (!user || !user.userId) return;
      const result = await userService.getUserFriends(user.userId)
      if (result) setFriends(result);
    } catch (error) {
      console.error('Lỗi lấy danh sách bạn bè:', error);
    }
  };

  // Lấy danh sách chatroom
  const fetchChatRooms = async () => {
    try {
      const result = await ChatService.getChatRoomsByUserId(user?.userId)
      if (result) setChatRooms(result);
    } catch (error) {
      console.error('Lỗi lấy danh sách chatroom:', error);
    }
  };

  // Khi click vào conversation, cập nhật URL và load messages
  const handleConversationClick = async (room, options = {}) => {
    try {
      // Cập nhật selectedRoomId
      setSelectedRoomId(room.id);
      
      // Chỉ navigate nếu không có skipNavigate flag
      if (!options.skipNavigate) {
        navigate(`/message/t/${room.id}`);
      }

    // Join room mới
    await ChatSignalRService.joinRoom(room.id);
    
      if (room.type === 'private'){
        const otherMember = room.members.find(m => m.userId !== user.userId);
        const friend = otherMember?.user;
        console.log(friend.avatarUrl.length);
        
        setMessageHeader({avatarUrl: friend.avatarUrl, username: friend.username, userId: friend.id})
      } 
      else {
        // Lấy 3 avatar thành viên
        // const avatars = room.members
        //   .map(m => m.user?.avatarUrl)
        //   .filter(Boolean)
        //   .slice(0, 3);
        console.log(room.members);
        
        setMessageHeader({ avatarUrl: room.members, username: room.name });
        
      }
      const response = await MessageService.getMessagesByChatRoom(room.id)
      if (response) {
        setMessages(response)
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Khi load lại trang, tự động lấy roomId từ URL để load lại chatroom/messages
  useEffect(() => {
    fetchListFriend();
    fetchChatRooms();
  }, []);

  const handleTyping = () => {
    if (!id || !user?.userId) return
     ChatSignalRService.sendTypingStatus(id, user.userId)
  }
  const handleSendMessage = async (content) => {
    // if (!id || !user?.userId) return;
    const messageObj = {
      content: content,
      senderId: user.userId,
      chatRoomId: id,  
      type: 'text',
      status: 'sent'
      // Thêm các trường khác nếu backend yêu cầu
    };
    
    await MessageService.createMessage(messageObj); 
  };


  const handleSearchFriend = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCreateGroup = async (groupName, selectedFriendIds) => {
    try {
      // Tạo chatroom
      const chatRoom = await ChatService.createChatRoom(groupName, user.userId, 'group');
      console.log(chatRoom);
      
      // Thêm current user vào room
      await ChatService.createChatRoomMember(chatRoom.id, user.userId, user.name, true);
      
      // Thêm các friend được chọn vào room
      for (const friendId of selectedFriendIds) {
        const friend = friends.find(f => f.id === friendId);
        if (friend) {
          await ChatService.createChatRoomMember(chatRoom.id, friendId, friend.userName, false);
        }
      }
      
      // Refresh danh sách chatrooms
      await fetchChatRooms();
      
      // Chuyển vào chatroom mới tạo
      navigate(`/message/t/${chatRoom.id}`);
      
    } catch (error) {
      console.error('Lỗi tạo nhóm:', error);
      throw error;
    }
  };
  const filteredFriends = debouncedSearchTerm 
    ? friends?.filter(friend =>
        friend.userName?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : friends;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Delay 300ms
  
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleFriendClick = (friendId) => {
    let chatRoom = chatRooms.find(c => c.type === 'private' &&  c.members.some(m => m.userId === friendId))
    navigate(`/message/t/${chatRoom.id}`)
    
  }
  return (
    <div className='message-container'>
      <div className="message-section-left">
        <div className="chat-header">
          <h1 className='chat-title'>Tin nhắn</h1>
          <button 
            className="create-group-button"
            onClick={() => setShowCreateGroupModal(true)}
            title="Tạo nhóm chat"
          >
            <span>+</span>
          </button>
        </div>
        <input className='search-friends' placeholder='Tìm kiếm bạn bè' onChange={handleSearchFriend}/>
        <ListFriend list={filteredFriends} onClick={handleFriendClick}/>
        <ListConversation chatRooms={chatRooms} currentUserId={user?.userId} selectedRoomId={selectedRoomId} onClick={handleConversationClick}/>
      </div>
      <div className="message-section-middle">
        <MessageThread
          userId={messageHeader.userId}
          avatarUrl={messageHeader.avatarUrl} 
          username={messageHeader.username} 
          messages={messages}
          currentUserId={user.userId}
          typingUsers={typingUsers}
          onSend={handleSendMessage}
          onTyping={handleTyping}
        />
      </div>
      {/* <div className="message-section-right">
        <UserInfo user={messageHeader}/>
      </div> */}
      
      {showCreateGroupModal && (
        <CreateGroupModal
          friends={friends}
          onClose={() => setShowCreateGroupModal(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  )
}
