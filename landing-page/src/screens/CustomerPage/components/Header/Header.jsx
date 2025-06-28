import { FiBell, FiMail, FiLogOut, FiHome, FiUser, FiSettings, FiMenu, FiMessageCircle } from "react-icons/fi"
import { useState } from "react"
import { useNavigate, Link, NavLink } from "react-router-dom"
import './style.css'
import userService from "../../../../services/user"
import ROUTES from "../../../../utils/routes"
import useUser from "../../../../hooks/useUser"
import { BsFillPeopleFill, BsPeople } from "react-icons/bs"
import { BiHeart } from "react-icons/bi"

const HeaderIcons = () => (
  <div className="header-center">
    <NavLink to={ROUTES.HOME} className="icon-btn" title="Trang chủ">
      Trang chủ
    </NavLink>
    <NavLink to={ROUTES.FORUM} className="icon-btn" title="Diễn đàn">
      Diễn đàn
    </NavLink>
    <NavLink to={ROUTES.FEEDBACK} className="icon-btn" title="Tâm sự">
      Đóng góp
    </NavLink>
  </div>
)

const ProfileDropdown = ({ onLogout, onProfile, onFavoriteTour }) => (
  <div className="profile-dropdown">
    <div className="dropdown-arrow" />
    <button className="dropdown-item" onClick={onProfile}>
      <FiMenu size={18} />
      <span>Menu Profile</span>
    </button>
    <button className="dropdown-item" onClick={onFavoriteTour}>
      <BiHeart size={18} />
      <span>Tour yêu thích</span>
    </button>
    <div className="dropdown-divider" />
    <button className="dropdown-item" onClick={onLogout}>
      <FiLogOut size={18} />
      <span>Đăng xuất</span>
    </button>
  </div>
)

const UserProfile = ({ user, isDropdownOpen, onToggleDropdown, onLogout, onProfile, onFavoriteTour }) => (
  <div className={`profile-section${isDropdownOpen ? ' active' : ''}`} onClick={onToggleDropdown}>
    <div className="profile-avatar-header">  
      {user?.raw.avatarUrl ? (
        <img src={user.raw.avatarUrl} alt="avatar" />
      ) : (
        <span className="avatar-placeholder">{user?.name?.[0]?.toUpperCase() || "U"}</span>
      )}
    </div>
    <div className="profile-info-header">
      <div className="profile-name-header">{user?.name}</div>
      <div className="profile-username">Khách hàng</div>
    </div>
  </div>
)

const Header = () => {
    const user = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
      userService.logout();
      navigate(ROUTES.LOGIN)
    }

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const handleProfile = (e) => {
      navigate(ROUTES.PROFILE);
    };

    const handleFavoriteTour = () => {
      navigate(ROUTES.FAVORITES);
    };

    return (
        <div className="main-header">
            <div className="header-left">
              <img className="logo-img"
                alt="Vector"
                src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png"
              />

              <div className="text-wrapper gradient-text">Audivia</div>
 
            </div>
            <div className="header-center">
              <HeaderIcons />
            </div>
            <div className="header-right">
                <NavLink to={ROUTES.NOTIFICATION} className="icon-btn" title="Thông báo">
                  <FiBell/>
                </NavLink>
                <NavLink to={ROUTES.MESSAGE} className="icon-btn" title="Tin nhắn">
                  <FiMessageCircle />
                </NavLink>
                <div style={{position: 'relative'}}>
                  <UserProfile 
                      user={user}
                      isDropdownOpen={isDropdownOpen}
                      onToggleDropdown={toggleDropdown}
                      onLogout={handleLogout}
                      onProfile={handleProfile}
                      onFavoriteTour={handleFavoriteTour}
                  />
                  {isDropdownOpen && <ProfileDropdown onLogout={handleLogout} onProfile={handleProfile} onFavoriteTour={handleFavoriteTour}/>} 
                </div>
            </div>

        </div>
    )
}

export default Header