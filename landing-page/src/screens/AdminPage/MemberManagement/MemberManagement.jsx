import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useState } from 'react';

const MemberManagement = () => {
    const [tableData] = useState([
        {
            id: 1,
            name: "Nguyễn Văn A",
            username: "nguyenvana",
            email: "nguyenvana@example.com",
            avatar: "https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png",
            address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
            status: "Hoạt động"
        },
        {
            id: 2,
            name: "Trần Thị B",
            username: "tranthib",
            email: "tranthib@example.com",
            avatar: "https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png",
            address: "456 Đường Lê Lợi, Quận 1, TP.HCM",
            status: "Hoạt động"
        },
        {
            id: 3,
            name: "Lê Văn C",
            username: "levanc",
            email: "levanc@example.com",
            avatar: "https://res.cloudinary.com/dgzn2ix8w/image/upload/v1745147401/Audivia/fxjo2mcpmqexcxkomtjd.png",
            address: "789 Đường Đồng Khởi, Quận 1, TP.HCM",
            status: "Không hoạt động"
        }
    ]);

    const handleExport = () => {
        console.log("Xuất dữ liệu");
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="dashboard">
            {/* Main Content */}
            <div className="main-content">
                <AdminHeader/>
                <div className="main-table">
                    <Table
                        title="Quản lý Thành viên"
                        data={tableData}
                        onExport={handleExport}
                        columns={[
                            {key: 'avatar', label:'Ảnh'},
                            { key: 'name', label: 'Họ tên' },
                            { key: 'username', label: 'Tên đăng nhập' },
                            { key: 'email', label: 'Email' },
                            { key: 'address', label: 'Địa chỉ' },
                            { key: 'status', label: 'Trạng thái' }
                        ]}
                        filterOptions={[
                            { value: '', label: 'Tất cả trạng thái' },
                            { value: 'Hoạt động', label: 'Hoạt động' },
                            { value: 'Không hoạt động', label: 'Không hoạt động' }
                        ]}
                        searchField="name"
                        renderCell={(row, column) => {
                            if (column.key === 'avatar') {
                                return (
                                    <div className="avatar-container">
                                        {row.avatar ? (
                                            <img 
                                                src={row.avatar} 
                                                alt={row.name} 
                                                className="table-avatar"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className="avatar-initials" style={{ display: row.avatar ? 'none' : 'flex' }}>
                                            {getInitials(row.name)}
                                        </div>
                                    </div>
                                );
                            }
                            if (column.key === 'status') {
                                return <span className={`status-badge ${row.status === 'Hoạt động' ? 'active' : 'inactive'}`}>{row.status}</span>;
                            }
                            return row[column.key];
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default MemberManagement