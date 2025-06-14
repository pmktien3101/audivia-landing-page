import React from 'react';
import {
    MdOutlineDashboard, MdOutlineDescription, MdOutlineCreditCard,
    MdGroup,
    MdMoney,
    MdMap,
    MdSettings
} from "react-icons/md";
import './styles.css';
import ROUTES from '../../../utils/routes';
import { FaDollarSign } from 'react-icons/fa';

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
        title: 'Revenue',
        icon: FaDollarSign,
        path: ROUTES.ADMIN.REVENUE,
        isActive: false
    },
    {
        id: 4,
        title: 'Invoice',
        icon: MdOutlineDescription,
        path: ROUTES.ADMIN.REVENUE,
        isActive: false
    },
    {
        id: 5,
        title: 'Tour Management',
        icon: MdMap,
        path: ROUTES.ADMIN.REVENUE,
        isActive: false
    },
    {
        id: 6,
        title: 'FAQ',
        icon: MdSettings,
        path: ROUTES.ADMIN.FAQ,
        isActive: false
    },
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