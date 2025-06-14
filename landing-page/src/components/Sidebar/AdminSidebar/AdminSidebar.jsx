import React from 'react';
import {
    MdOutlineDashboard, MdOutlineDescription, MdOutlineCreditCard,
    MdGroup
} from "react-icons/md";
import './styles.css';
import ROUTES from '../../../utils/routes';

const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: MdOutlineDashboard,
        path: ROUTES.ADMIN.DASHBOARD,
        isActive: true
    },
    {
        id: 2,
        title: 'Member Management',
        icon: MdGroup,
        path: ROUTES.ADMIN.MEMBER,
        isActive: false
    },
    {
        id: 3,
        title: 'Invoice',
        icon: MdOutlineDescription,
        path: '#',
        isActive: false
    },
    {
        id: 4,
        title: 'Card',
        icon: MdOutlineCreditCard,
        path: '#',
        isActive: false
    }
];

const AdminSidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <div className="logo-icon"><img src='https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png'/></div>
                <div className="logo-text">Audivia</div>
            </div>

            <nav>
                <ul className="nav-menu">
                    {menuItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <a href={item.path} className={`nav-link ${item.isActive ? 'active' : ''}`}>
                                <div className="nav-icon">
                                    <item.icon size={20} />
                                </div>
                                <div className="title-item">
                                {item.title}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;