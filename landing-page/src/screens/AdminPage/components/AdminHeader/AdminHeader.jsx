import { FiBell, FiMail, FiSearch } from "react-icons/fi"
import './style.css'
const AdminHeader = () => {
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
                <div className="profile-section">
                  <div className="profile-avatar"></div>
                  <div className="profile-info">
                    <div className="profile-name">Tina Pham</div>
                    <div className="profile-username">Quản trị viên</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}
export default AdminHeader