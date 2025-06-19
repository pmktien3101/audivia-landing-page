import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useEffect, useState, useMemo } from 'react';
import userService from '../../../services/user';

const MemberManagement = () => {
    const [members, setMembers] = useState();
    const [filterType, setFilterType] = useState('month');
    const [filterValue, setFilterValue] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);

    // Helper: lấy năm nhỏ nhất và lớn nhất từ members
    const years = useMemo(() => {
        if (!members || members.length === 0) return [];
        const allYears = members.map(m => m.createdAt && new Date(m.createdAt).getFullYear()).filter(Boolean);
        const minYear = Math.min(...allYears);
        const maxYear = Math.max(...allYears);
        return { min: minYear, max: maxYear };
    }, [members]);

    // Sinh options cho filter
    const monthOptions = useMemo(() => {
        if (!years.min || !years.max) return [];
        const opts = [];
        for (let y = years.max; y >= years.min; y--) {
            for (let m = 12; m >= 1; m--) {
                opts.push({ value: `${y}-${String(m).padStart(2, '0')}`, label: `Tháng ${m}/${y}` });
            }
        }
        return opts;
    }, [years]);

    const quarterOptions = useMemo(() => {
        if (!years.min || !years.max) return [];
        const opts = [];
        for (let y = years.max; y >= years.min; y--) {
            opts.push({ value: `${y}-Q1`, label: `Tháng 1-4/${y}` });
            opts.push({ value: `${y}-Q2`, label: `Tháng 5-8/${y}` });
            opts.push({ value: `${y}-Q3`, label: `Tháng 9-12/${y}` });
        }
        return opts;
    }, [years]);

    const yearOptions = useMemo(() => {
        if (!years.max) return [];
        const opts = [];
        for (let y = years.max; y >= years.max - 4; y--) {
            opts.push({ value: `${y}`, label: `${y}` });
        }
        return opts;
    }, [years]);

    // Lọc members theo filter
    useEffect(() => {
        if (!members) {
            setFilteredMembers([]);
            return;
        }
        if (!filterValue) {
            setFilteredMembers(members);
            return;
        }
        let filtered = members;
        if (filterType === 'month') {
            filtered = members.filter(m => {
                if (!m.createdAt) return false;
                const d = new Date(m.createdAt);
                const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                return val === filterValue;
            });
        } else if (filterType === 'quarter') {
            filtered = members.filter(m => {
                if (!m.createdAt) return false;
                const d = new Date(m.createdAt);
                const month = d.getMonth() + 1;
                let q = '';
                if (month >= 1 && month <= 4) q = 'Q1';
                else if (month >= 5 && month <= 8) q = 'Q2';
                else q = 'Q3';
                const val = `${d.getFullYear()}-${q}`;
                return val === filterValue;
            });
        } else if (filterType === 'year') {
            filtered = members.filter(m => {
                if (!m.createdAt) return false;
                const d = new Date(m.createdAt);
                return String(d.getFullYear()) === filterValue;
            });
        }
        setFilteredMembers(filtered);
    }, [members, filterType, filterValue]);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await userService.getAllMembers();
            const normalized = (response || []).map(m => ({
                ...m,
                fullName: m.fullName || ""
            }));
            setMembers(normalized);
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
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginBottom: 24, background: '#f8fafc', borderRadius: 16, padding: '20px 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                            <label style={{ fontWeight: 500, color: '#d6a4ff', marginLeft: 4 }}>Lọc</label>
                            <select value={filterType} onChange={e => { setFilterType(e.target.value); setFilterValue(''); }}
                                style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #d1d5db', background: '#fff', fontSize: 15, minWidth: 140, boxShadow: '0 1px 4px #0001', transition: 'border 0.2s' }}
                                onFocus={e => e.target.style.border = '1.5px solid #00A5CF'}
                                onBlur={e => e.target.style.border = '1px solid #d1d5db'}
                            >
                                <option value="month">Theo tháng</option>
                                <option value="quarter">Theo cụm 4 tháng</option>
                                <option value="year">Theo 5 năm đổ lại</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                            <label style={{ fontWeight: 500, color: '#d6a4ff', marginLeft: 4 }}>Giá trị</label>
                            <select value={filterValue} onChange={e => setFilterValue(e.target.value)}
                                style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #d1d5db', background: '#fff', fontSize: 15, minWidth: 180, boxShadow: '0 1px 4px #0001', transition: 'border 0.2s' }}
                                onFocus={e => e.target.style.border = '1.5px solid #00A5CF'}
                                onBlur={e => e.target.style.border = '1px solid #d1d5db'}
                            >
                                <option value="">Tất cả</option>
                                {filterType === 'month' && monthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                {filterType === 'quarter' && quarterOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                {filterType === 'year' && yearOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default MemberManagement