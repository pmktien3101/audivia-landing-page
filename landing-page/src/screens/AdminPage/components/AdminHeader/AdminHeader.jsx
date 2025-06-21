import { FiBell, FiMail, FiLogOut } from "react-icons/fi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './style.css'
import userService from "../../../../services/user"
import ROUTES from "../../../../utils/routes"
import useUser from "../../../../hooks/useUser"

const HeaderIcons = () => (
  <>
    <button className="admin-icon-btn" title="Tin nhắn">
      <FiMail size={20} />
    </button>
    <button className="admin-icon-btn" title="Thông báo">
      <FiBell size={20} />
    </button>
  </>
)

const ProfileDropdown = ({ onLogout }) => (
  <div className="admin-profile-dropdown">
    <button className="admin-dropdown-item" onClick={onLogout}>
      <FiLogOut size={16} />
      <span>Đăng xuất</span>
    </button>
  </div>
)

const UserProfile = ({ user, isDropdownOpen, onToggleDropdown, onLogout }) => (
  <div className="admin-profile-section" onClick={onToggleDropdown}>
    <div className="admin-profile-avatar"></div>
    <div className="admin-profile-info">
      <div className="admin-profile-name">{user?.name}</div>
      <div className="admin-profile-username">Quản trị viên</div>
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
        <div className="admin-main-header">
            <div className="admin-header-right">
              <div className="admin-header-icons">
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