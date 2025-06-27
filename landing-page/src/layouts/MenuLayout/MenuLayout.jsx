import CustomerSidebar from "../../components/Sidebar/CustomerSidebar"
import "./style.css"

const MenuLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <div className="sidebar-container">
                <CustomerSidebar />
            </div>
            <div className='main-content-wrapper'>
                <div className='main-content'>
                    <div className='content'>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default MenuLayout