import AdminSidebar from "../../components/Sidebar/AdminSidebar"

const AdminLayout = (children) => {
    return (
        <div className="layout-ontainer">
            <div className="sidebar-container">
                <AdminSidebar />
            </div>
            <div className='main-content'>
                <div className='header'>
                    <h4 className='welcome-text'>
                        Hello, <strong>{user.name}</strong>
                    </h4>
                    <div className='avatar-wrapper'>
                        <UserAvatar src={user.imageUrl} name={user.fullName} size={40} />
                    </div>
                </div>
                <div className='content'>{children}</div>
            </div>
        </div>
    )
}
export default AdminLayout