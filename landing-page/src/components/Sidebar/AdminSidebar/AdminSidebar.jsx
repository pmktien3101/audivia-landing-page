import React from 'react';
import {
    MdOutlineDashboard,
    MdGroup,
    MdMap,
} from "react-icons/md";
import './styles.css';
import ROUTES from '../../../utils/routes';
import { FaDollarSign } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: MdOutlineDashboard,
        path: ROUTES.ADMIN.DASHBOARD
    },
    {
        id: 2,
        title: 'Quản lý thành viên',
        icon: MdGroup,
        path: ROUTES.ADMIN.MEMBER
    },
    {
        id: 3,
        title: 'Doanh thu',
        icon: FaDollarSign,
        path: ROUTES.ADMIN.REVENUE
    },
    {
        id: 4,
        title: 'Quản lý tour',
        icon: MdMap,
        path: ROUTES.ADMIN.TOUR
    },
];

const AdminSidebar = () => {
    const location = useLocation();

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
                            <Link 
                                to={item.path} 
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <div className="nav-icon">
                                    <item.icon size={20} />
                                </div>
                                <div className="title-item">
                                    {item.title}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;