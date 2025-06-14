import AdminSidebar from "../../components/Sidebar/AdminSidebar"
import "./style.css"

const AdminLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <div className="sidebar-container">
                <AdminSidebar />
            </div>
            <div className='main-content'>
                <div className='content'>{children}</div>
            </div>
        </div>
    )
}

export default AdminLayout