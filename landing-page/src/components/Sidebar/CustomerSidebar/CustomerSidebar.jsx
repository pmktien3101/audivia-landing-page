import React from 'react';
import { FaUser, FaWallet, FaHistory, FaVolumeUp, FaSignOutAlt } from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './style.css';
import ROUTES from '../../../utils/routes';
import userService from '../../../services/user';

const menuItems = [
  {
    id: 1,
    title: 'Trang cá nhân',
    icon: FaUser,
    path: ROUTES.PROFILE_ME,
  },
  {
    id: 2,
    title: 'Ví của tôi',
    icon: FaWallet,
    path: ROUTES.WALLET,
  },
  {
    id: 3,
    title: 'Lịch sử tour',
    icon: FaHistory,
    path: ROUTES.HISTORY_TOUR,
  },
  {
    id: 4,
    title: 'Đăng xuất',
    icon: FaSignOutAlt,
    path: null,
  },
];

const CustomerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    userService.logout();
    navigate(ROUTES.GUEST_HOME);
  };

  const handleOnclick = () => {
    navigate("/home")
  }
  return (
    <div className="sidebar">
      <div className="logo" onClick={handleOnclick}>
        <div className="logo-icon">
          <img src='https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png' alt="Audivia Logo" />
        </div>
        <div className="logo-text">Audivia</div>
      </div>
      <nav>
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              {item.path ? (
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <div className="nav-icon">
                    <item.icon size={20} />
                  </div>
                  <div className="title-item">
                    {item.title}
                  </div>
                </Link>
              ) : (
                <button
                  className="nav-link logout-btn"
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', padding: 0, width: '100%', textAlign: 'left', cursor: 'pointer', marginLeft:'15px', marginTop:'20px' }}
                >
                  <div className="nav-icon">
                    <item.icon size={20} />
                  </div>
                  <div className="title-item">
                    {item.title}
                  </div>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CustomerSidebar;
