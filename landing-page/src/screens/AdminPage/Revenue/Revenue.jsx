import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import TransactionService from '../../../services/transaction';
import DateFilter from '../components/DateFilter';
import { filterDataByDate } from '../../../utils/dateFilter/dateFilterUtils';

const Revenue = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [filterType, setFilterType] = useState('month');
    const [filterValue, setFilterValue] = useState('');
    const [filteredRevenue, setFilteredRevenue] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lọc revenue theo filter
    useEffect(() => {
        const filtered = filterDataByDate(revenueData, filterType, filterValue, 'createdAt');
        setFilteredRevenue(filtered);
    }, [revenueData, filterType, filterValue]);

    useEffect(() => {
        const fetchRevenue = async () => {
            setLoading(true);
            try {
                const response = await TransactionService.getRevenueAdmin();
                console.log('Revenue API response:', response);
                setRevenueData(response || []);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
                setRevenueData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRevenue();
    }, []);

    const handleExport = () => {
        console.log("Xuất dữ liệu");
    };

    const getInitials = (name) => {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return '?';
        }
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="dashboard">
            {/* Main Content */}
            <div className="main-content-table">
                <AdminHeader/>
                <div className="main-table">
                    {loading ? (
                        <div className="loading">
                            <img 
                                src="https://i.pinimg.com/originals/93/dd/8a/93dd8a26a1706b30a2e8f314e096d129.gif" 
                                alt="Loading..." 
                                style={{ width: '200px', height: '200px' }}
                            />
                            <p>Đang tải dữ liệu doanh thu...</p>
                        </div>
                    ) : (
                        <>
                            <DateFilter
                                data={revenueData}
                                filterType={filterType}
                                setFilterType={setFilterType}
                                filterValue={filterValue}
                                setFilterValue={setFilterValue}
                                dateField="createdAt"
                            />
                            <Table
                                title="Quản lý Doanh thu"
                                data={filteredRevenue}
                                onExport={handleExport}
                                columns={[
                                    { key: 'avatarUrl', label: 'Ảnh' },
                                    { key: 'userName', label: 'Tên' },
                                    { key: 'email', label: 'Email' },
                                    { key: 'description', label: 'Tên tour' },
                                    { key: 'amount', label: 'Số tiền' },
                                    { key: 'type', label: 'Loại' },
                                    { key: 'createdAt', label: 'Ngày' },
                                    { key: 'status', label: 'Trạng thái' }
                                ]}
                                renderCell={(row, column) => {
                                    if (column.key === 'amount') {
                                        return `${row.amount.toLocaleString('vi-VN')} VNĐ`;
                                    }
                                    if (column.key === 'avatarUrl') {
                                        const userName = row.userName || '';
                                        return (
                                            <div className="avatar-container">
                                                {row.avatarUrl && row.avatarUrl.trim() !== '' ? (
                                                    <img 
                                                        src={row.avatarUrl}                                                
                                                        alt={userName} 
                                                        className="table-avatar"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <div className="avatar-initials" style={{ display: (row.avatarUrl && row.avatarUrl.trim() !== '') ? 'none' : 'flex' }}>
                                                    {getInitials(userName)}
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (column.key === 'status') {
                                        return <span className={`status-badge ${row.status === 'success' ? 'active' : 'inactive'}`}>{row.status}</span>;
                                    }
                                    if (column.key === 'createdAt') {
                                        return row.createdAt ? new Date(row.createdAt).toLocaleDateString('vi-VN') : '';
                                    }
                                    return row[column.key];
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Revenue