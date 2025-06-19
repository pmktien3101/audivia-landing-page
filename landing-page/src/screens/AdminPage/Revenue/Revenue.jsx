import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useState } from 'react';

const Revenue = () => {
    const [tableData] = useState([
        {
            id: 1,
            date: '2024-03-20',
            name: 'Tour Hồ Chí Minh',
            amount: 0,
            type: 'Miễn phí',
            status: 'Hoàn thành',
            customer: 'Nguyễn Văn A'
        },
        {
            id: 2,
            date: '2024-03-19',
            name: 'Tour Dinh Độc Lập',
            amount: 250000,
            type: 'Trả tiền',
            status: 'Đang xử lý',
            customer: 'Trần Thị B'
        },
        {
            id: 3,
            date: '2024-03-18',
            name: 'Tour Hồ Chí Minh',
            amount: 0,
            type: 'Miễn phí',
            status: 'Hoàn thành',
            customer: 'Lê Văn C'
        }
    ]);

    const handleExport = () => {
        console.log("Xuất dữ liệu");
    };

    return (
        <div className="dashboard">
            {/* Main Content */}
            <div className="main-content-table">
                <AdminHeader/>
                <div className="main-table">
                    <Table
                        title="Quản lý Doanh thu"
                        data={tableData}
                        onExport={handleExport}
                        columns={[
                            { key: 'date', label: 'Ngày' },
                            { key: 'customer', label: 'Khách hàng' },
                            { key: 'name', label: 'Tên tour' },
                            { key: 'amount', label: 'Số tiền' },
                            { key: 'type', label: 'Loại' },
                            { key: 'status', label: 'Trạng thái' }
                        ]}
                        filterOptions={[
                            { value: '', label: 'Tất cả loại' },
                            { value: 'Miễn phí', label: 'Miễn phí' },
                            { value: 'Trả tiền', label: 'Trả tiền' }
                        ]}
                        renderCell={(row, column) => {
                            if (column.key === 'amount') {
                                return `${row.amount.toLocaleString('vi-VN')} VNĐ`;
                            }
                            if (column.key === 'status') {
                                return <span className={`status-badge ${row.status === 'Hoàn thành' ? 'active' : 'inactive'}`}>{row.status}</span>;
                            }
                            return row[column.key];
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Revenue