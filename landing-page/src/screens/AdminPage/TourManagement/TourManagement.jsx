import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useState } from 'react';

const TourManagement = () => {
    const [tableData] = useState([
        {
            id: 1,
            name: 'Tour Dinh Độc Lập',
            location: 'Hồ Chí Minh',
            checkpoints: 5,
            duration: '2 giờ',
            price: 250000,
            status: 'Hoạt động'
        },
        {
            id: 2,
            name: 'Tour Đà Nẵng',
            location: 'Đà Nẵng',
            checkpoints: 4,
            duration: '4 giờ',
            price: 180000,
            status: 'Hoạt động'
        },
        {
            id: 3,
            name: 'Tour Hồ Chí Minh',
            location: 'Hồ Chí Minh',
            checkpoints: 6,
            duration: '3 giờ',
            price: 0,
            status: 'Tạm dừng'
        }
    ]);

    const handleAdd = () => {
        console.log("Thêm tour mới");
    }

    const handleEdit = (id) => {
        console.log("Sửa tour", id);
    }

    const handleDelete = (id) => {
        console.log("Xóa tour", id);
    }

    const handleExport = () => {
        console.log("Xuất dữ liệu");
    };

    return (
        <div className="dashboard">
            <div className="main-content">
                <AdminHeader/>
                <div className="main-table">
                    <Table
                        title="Quản lý Tour"
                        data={tableData}
                        onAdd={handleAdd}
                        onExport={handleExport}
                        columns={[
                            { key: 'name', label: 'Tên Tour' },
                            { key: 'location', label: 'Địa điểm' },
                            { key: 'checkpoints', label: 'Số Checkpoint' },
                            { key: 'duration', label: 'Thời gian' },
                            { key: 'price', label: 'Giá' },
                            { key: 'status', label: 'Trạng thái' },
                            { key: 'actions', label: 'Thao tác' }
                        ]}
                        filterOptions={[
                            { value: '', label: 'Tất cả trạng thái' },
                            { value: 'Hoạt động', label: 'Hoạt động' },
                            { value: 'Tạm dừng', label: 'Tạm dừng' }
                        ]}
                        searchField="name"
                        renderCell={(row, column) => {
                            if (column.key === 'price') {
                                return `${row.price.toLocaleString('vi-VN')} VNĐ`;
                            }
                            if (column.key === 'status') {
                                return <span className={`status-badge ${row.status === 'Hoạt động' ? 'active' : 'inactive'}`}>{row.status}</span>;
                            }
                            if (column.key === 'actions') {
                                return (
                                    <div className="action-buttons">
                                        <button onClick={() => handleEdit(row.id)} className="edit-btn">Sửa</button>
                                        <button onClick={() => handleDelete(row.id)} className="delete-btn">Xóa</button>
                                    </div>
                                );
                            }
                            return row[column.key];
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default TourManagement