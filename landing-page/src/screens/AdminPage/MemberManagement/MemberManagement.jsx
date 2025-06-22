import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import userService from '../../../services/user';
import DateFilter from '../components/DateFilter';
import { filterDataByDate } from '../../../utils/dateFilter/dateFilterUtils';

const MemberManagement = () => {
    const [members, setMembers] = useState();
    const [filterType, setFilterType] = useState('month');
    const [filterValue, setFilterValue] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lọc members theo filter
    useEffect(() => {
        const filtered = filterDataByDate(members, filterType, filterValue, 'createdAt');
        setFilteredMembers(filtered);
    }, [members, filterType, filterValue]);

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const response = await userService.getAllMembers();
                const normalized = (response || []).map(m => ({
                    ...m,
                    fullName: m.fullName || ""
                }));
                setMembers(normalized);
            } catch (error) {
                console.error('Error fetching members:', error);
                setMembers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    // Prepare data for export
    const prepareExportData = () => {
        const exportData = (filteredMembers || []).map(member => ({
            'Họ tên': member.fullName || '',
            'Tên đăng nhập': member.userName || '',
            'Email': member.email || '',
            'Vai trò': member.roleName || '',
            'Ngày tạo': member.createdAt ? new Date(member.createdAt).toLocaleDateString('vi-VN') : '',
            'Trạng thái': (member.isDeleted === true || member.isDeleted === 'true') ? 'Không hoạt động' : 'Hoạt động'
        }));

        return exportData;
    };

    // Prepare overview data for export
    const prepareOverviewData = () => {
        const totalMembers = filteredMembers?.length || 0;
        const activeMembers = filteredMembers?.filter(m => !(m.isDeleted === true || m.isDeleted === 'true')).length || 0;
        const inactiveMembers = totalMembers - activeMembers;

        // Count members by role
        const roleStats = {};
        filteredMembers?.forEach(member => {
            const role = member.roleName || 'Không xác định';
            roleStats[role] = (roleStats[role] || 0) + 1;
        });

        return {
            'Tổng số thành viên': totalMembers,
            'Thành viên hoạt động': activeMembers,
            'Thành viên không hoạt động': inactiveMembers,
            ...Object.fromEntries(
                Object.entries(roleStats).map(([role, count]) => [`Số ${role}`, count])
            ),
            'Ngày xuất báo cáo': new Date().toLocaleDateString('vi-VN')
        };
    };

    const handleExport = () => {
        console.log("Xuất dữ liệu - fallback function");
        // This will be used as fallback if ExportReport fails
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    // Prepare export props
    const exportProps = {
        overviewData: prepareOverviewData(),
        sheetsData: [
            {
                sheetName: 'Danh sách thành viên',
                data: prepareExportData()
            }
        ],
        fileName: `BaoCaoThanhVien_${new Date().toISOString().split('T')[0]}`,
        chartImages: [], // No charts for member management, but keeping for consistency
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
                            <p>Đang tải dữ liệu thành viên...</p>
                        </div>
                    ) : (
                        <>
                            <DateFilter
                                data={members}
                                filterType={filterType}
                                setFilterType={setFilterType}
                                filterValue={filterValue}
                                setFilterValue={setFilterValue}
                                dateField="createdAt"
                            />
                            {/* Remove the separate ExportReport and add exportProps to Table */}
                            <Table
                                title="Quản lý Thành viên"
                                data={filteredMembers || []}
                                onExport={handleExport}
                                exportProps={exportProps}
                                columns={[
                                    { key: 'avatarUrl', label: 'Ảnh' },
                                    { key: 'fullName', label: 'Họ tên' },
                                    { key: 'userName', label: 'Tên đăng nhập' },
                                    { key: 'email', label: 'Email' },
                                    { key: 'roleName', label: 'Vai trò' },
                                    { key: 'createdAt', label: 'Ngày tạo' },
                                    { key: 'isDeleted', label: 'Trạng thái' },
                                ]}
                                searchField="fullName"
                                renderCell={(row, column) => {
                                    if (column.key === 'avatarUrl') {
                                        return (
                                            <div className="avatar-container">
                                                {row.avatarUrl ? (
                                                    <img
                                                        src={row.avatarUrl}
                                                        alt={row.userName}
                                                        className="table-avatar"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <div className="avatar-initials" style={{ display: row.avatarUrl ? 'none' : 'flex' }}>
                                                    {getInitials(row.fullName)}
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (column.key === 'isDeleted') {
                                        const isInactive = row.isDeleted === true || row.isDeleted === 'true';
                                        return (
                                            <span className={`status-badge ${!isInactive ? 'active' : 'inactive'}`}>
                                                {isInactive ? 'Không hoạt động' : 'Hoạt động'}
                                            </span>
                                        );
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

export default MemberManagement