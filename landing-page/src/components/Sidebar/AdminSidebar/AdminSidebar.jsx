import { FiAlertCircle, FiHome, FiUsers } from "react-icons/fi"
import ROUTES from "../../../utils/routes"

const AdminSidebar =()=>{
    const menuItems = [
        {title: 'Dashboard', icon: <FiHome size={20}/>, path: ROUTES.ADMIN.DASHBOARD},
        {title: 'Member Management', icon: <FiUsers size={20}/>, path: ROUTES.ADMIN.MEMBER},
        {title: 'Feedback', icon: <FiAlertCircle size={20}/>, path: ROUTES.ADMIN.FEEDBACK}
    ]
    return (
        <div className="sidebarWrapper">
            {menuItems.map((item, index) => (
                <div key={index} className="menu-item">
                    {item.icon}
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    )
}
export default AdminSidebar