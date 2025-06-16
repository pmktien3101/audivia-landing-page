import { FiBell, FiMail, FiLogOut } from "react-icons/fi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './style.css'
import userService from "../../../../services/user"
import ROUTES from "../../../../utils/routes"
import useUser from "../../../../hooks/useUser"

const HeaderIcons = () => (
  <>
    <button className="icon-btn" title="Tin nhắn">
      <FiMail size={20} />
    </button>
    <button className="icon-btn" title="Thông báo">
      <FiBell size={20} />
    </button>
  </>
)

const ProfileDropdown = ({ onLogout }) => (
  <div className="profile-dropdown">
    <button className="dropdown-item" onClick={onLogout}>
      <FiLogOut size={16} />
      <span>Đăng xuất</span>
    </button>
  </div>
)

const UserProfile = ({ user, isDropdownOpen, onToggleDropdown, onLogout }) => (
  <div className="profile-section" onClick={onToggleDropdown}>
    <div className="profile-avatar"></div>
    <div className="profile-info">
      <div className="profile-name">{user?.name}</div>
      <div className="profile-username">Quản trị viên</div>
    </div>
    {isDropdownOpen && <ProfileDropdown onLogout={onLogout} />}
  </div>
)

const AdminHeader = () => {
    const user = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
      userService.logout();
      navigate(ROUTES.LOGIN)
    }

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    return (
        <div className="main-header">
            <div className="header-right">
              <div className="header-icons">
                <HeaderIcons />
                  <UserProfile 
                    user={user}
                    isDropdownOpen={isDropdownOpen}
                    onToggleDropdown={toggleDropdown}
                    onLogout={handleLogout}
                  />
              </div>
            </div>
          </div>
    )
}

export default AdminHeader