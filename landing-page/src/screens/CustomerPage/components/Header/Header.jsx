import { FiBell, FiMail, FiLogOut, FiHome, FiUser, FiSettings, FiMenu } from "react-icons/fi"
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
      <FiHome size={20} />
    </NavLink>
    <NavLink to={ROUTES.FORUM} className="icon-btn" title="Diễn đàn">
      <BsPeople size={20} />
    </NavLink>
    <NavLink to={ROUTES.FAVORITES} className="icon-btn" title="Yêu thích">
      <BiHeart size={20} />
    </NavLink>
    <NavLink to={ROUTES.NOTIFICATION} className="icon-btn" title="Thông báo">
      <FiBell size={20} />
    </NavLink>
  </div>
)

const ProfileDropdown = ({ onLogout, onProfile }) => (
  <div className="profile-dropdown">
    <button className="dropdown-item" onClick={onProfile}>
      <FiMenu size={16} />
      <span>Menu Profile</span>
    </button>
    <button className="dropdown-item" onClick={onLogout}>
      <FiLogOut size={16} />
      <span>Đăng xuất</span>
    </button>
  </div>
)

const UserProfile = ({ user, isDropdownOpen, onToggleDropdown, onLogout, onProfile }) => (
  <div className="profile-section" onClick={onToggleDropdown}>
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
    {isDropdownOpen && <ProfileDropdown onLogout={onLogout} onProfile={onProfile}/>}
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

    return (
        <div className="main-header">
            <div className="header-left">
              <img className="logo-img"
                alt="Vector"
                src="https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png"
              />

              <div className="text-wrapper">Audivia</div>
 
            </div>
            <div className="header-center">
              <HeaderIcons />

            </div>
            <div className="header-right">
                <UserProfile 
                    user={user}
                    isDropdownOpen={isDropdownOpen}
                    onToggleDropdown={toggleDropdown}
                    onLogout={handleLogout}
                    onProfile={handleProfile}
                />
            </div>

        </div>
    )
}

export default Header