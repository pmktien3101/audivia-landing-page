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
                            <Table
                                title="Quản lý Thành viên"
                                data={filteredMembers || []}
                                onExport={handleExport}
                                columns={[
                                    {key: 'avatarUrl', label:'Ảnh'},
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