import { FiBell, FiMail, FiSearch, FiLogOut } from "react-icons/fi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './style.css'
import userService from "../../../../services/user"
import ROUTES from "../../../../utils/routes"

const AdminHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navigate = useNavigate()
    const handleLogout = () => {
      userService.logout();
      navigate(ROUTES.LOGIN)
    }

    return (
        <div className="main-header">
            <div className="header-right">
              <div className="header-icons">
                <button className="icon-btn" title="Tin nhắn">
                  <FiMail size={20} />
                </button>
                <button className="icon-btn" title="Thông báo">
                  <FiBell size={20} />
                </button>
                <div className="profile-section" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div className="profile-avatar"></div>
                  <div className="profile-info">
                    <div className="profile-name">Tina Pham</div>
                    <div className="profile-username">Quản trị viên</div>
                  </div>
                  {isDropdownOpen && (
                    <div className="profile-dropdown">
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FiLogOut size={16} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
    )
}
export default AdminHeader