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

    // Prepare export data for revenue
    const getExportProps = () => {
        // Calculate revenue statistics
        const totalTransactions = filteredRevenue.length;
        const totalRevenue = filteredRevenue.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
        const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

        // Group by status
        const statusStats = filteredRevenue.reduce((acc, transaction) => {
            const status = transaction.status || 'unknown';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        // Group by transaction type
        const typeStats = filteredRevenue.reduce((acc, transaction) => {
            const type = transaction.type || 'unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        // Group by date (monthly)
        const monthlyRevenue = filteredRevenue.reduce((acc, transaction) => {
            if (transaction.createdAt) {
                const date = new Date(transaction.createdAt);
                const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                if (!acc[monthKey]) {
                    acc[monthKey] = { count: 0, amount: 0 };
                }
                acc[monthKey].count += 1;
                acc[monthKey].amount += transaction.amount || 0;
            }
            return acc;
        }, {});

        const overviewData = {
            'Tổng số giao dịch': totalTransactions,
            'Tổng doanh thu': `${totalRevenue.toLocaleString('vi-VN')} VNĐ`,
            'Giá trị trung bình': `${Math.round(avgTransactionValue).toLocaleString('vi-VN')} VNĐ`,
            'Giao dịch thành công': statusStats['success'] || 0,
            'Giao dịch thất bại': (statusStats['failed'] || 0) + (statusStats['error'] || 0),
            'Ngày xuất báo cáo': new Date().toLocaleDateString('vi-VN'),
            'Kỳ báo cáo': `${filterType === 'month' ? 'Tháng' : filterType === 'year' ? 'Năm' : 'Tùy chỉnh'} ${filterValue || 'Tất cả'}`
        };

        const sheetsData = [
            {
                sheetName: 'Chi tiết giao dịch',
                data: filteredRevenue.map(transaction => ({
                    'Tên người dùng': transaction.userName || '',
                    'Email': transaction.email || '',
                    'Tên tour': transaction.description || '',
                    'Số tiền (VNĐ)': transaction.amount ? transaction.amount.toLocaleString('vi-VN') : '0',
                    'Loại giao dịch': transaction.type || '',
                    'Trạng thái': transaction.status || '',
                    'Ngày tạo': transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString('vi-VN') : '',
                    'Thời gian tạo': transaction.createdAt ? new Date(transaction.createdAt).toLocaleTimeString('vi-VN') : ''
                }))
            },
            {
                sheetName: 'Thống kê theo trạng thái',
                data: Object.keys(statusStats).map(status => ({
                    'Trạng thái': status,
                    'Số lượng': statusStats[status],
                    'Tỷ lệ': totalTransactions > 0 ? `${((statusStats[status] / totalTransactions) * 100).toFixed(1)}%` : '0%'
                }))
            },
            {
                sheetName: 'Thống kê theo loại',
                data: Object.keys(typeStats).map(type => ({
                    'Loại giao dịch': type,
                    'Số lượng': typeStats[type],
                    'Tỷ lệ': totalTransactions > 0 ? `${((typeStats[type] / totalTransactions) * 100).toFixed(1)}%` : '0%'
                }))
            },
            {
                sheetName: 'Doanh thu theo tháng',
                data: Object.keys(monthlyRevenue)
                    .sort()
                    .map(month => ({
                        'Tháng': month,
                        'Số giao dịch': monthlyRevenue[month].count,
                        'Doanh thu (VNĐ)': monthlyRevenue[month].amount.toLocaleString('vi-VN'),
                        'Trung bình/giao dịch': monthlyRevenue[month].count > 0
                            ? Math.round(monthlyRevenue[month].amount / monthlyRevenue[month].count).toLocaleString('vi-VN')
                            : '0'
                    }))
            }
        ];

        return {
            overviewData,
            sheetsData,
            fileName: `BaoCao_DoanhThu_${filterType}_${filterValue || 'TatCa'}_${new Date().toISOString().split('T')[0]}`,
            chartImages: [] // You can add chart images here if needed
        };
    };

    return (
        <div className="dashboard">
            {/* Main Content */}
            <div className="main-content-table">
                <AdminHeader />
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
                                exportProps={getExportProps()}
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