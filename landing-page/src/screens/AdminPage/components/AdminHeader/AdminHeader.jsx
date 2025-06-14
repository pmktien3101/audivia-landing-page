import { FiBell, FiMail, FiSearch } from "react-icons/fi"
import './style.css'
const AdminHeader = () => {
    return (
        <div className="main-header">
            <div className="search-box">
              <input type="text" className="search-input" placeholder="Search" />
              <FiSearch className="search-icon" size={18} />
            </div>
            <div className="header-right">
              <div className="header-icons">
                <button className="icon-btn">
                  <FiMail size={20} />
                </button>
                <button className="icon-btn">
                  <FiBell size={20} />
                </button>
                <div className="profile-section">
                  <div className="profile-avatar"></div>
                  <div className="profile-info">
                    <div className="profile-name">Robert Downey</div>
                    <div className="profile-username">@robert564</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}
export default AdminHeader