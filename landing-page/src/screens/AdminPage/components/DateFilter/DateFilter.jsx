import React, { useMemo } from 'react';
import './style.css';

const DateFilter = ({ 
    data, 
    filterType, 
    setFilterType, 
    filterValue, 
    setFilterValue,
    dateField = 'createdAt' // Field name chứa ngày tháng
}) => {
    // Helper: lấy năm nhỏ nhất và lớn nhất từ data
    const years = useMemo(() => {
        if (!data || data.length === 0) return [];
        const allYears = data.map(item => {
            const dateValue = item[dateField];
            return dateValue && new Date(dateValue).getFullYear();
        }).filter(Boolean);
        
        if (allYears.length === 0) return [];
        const minYear = Math.min(...allYears);
        const maxYear = Math.max(...allYears);
        return { min: minYear, max: maxYear };
    }, [data, dateField]);

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

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setFilterValue(''); // Reset filter value khi đổi loại filter
    };

    return (
        <div className="date-filter-container">
            <div className="filter-group">
                <label className="filter-label">Lọc</label>
                <select 
                    value={filterType} 
                    onChange={handleFilterTypeChange}
                    className="filter-select"
                >
                    <option value="month">Theo tháng</option>
                    <option value="quarter">Theo cụm 4 tháng</option>
                    <option value="year">Theo 5 năm đổ lại</option>
                </select>
            </div>
            <div className="filter-group">
                <label className="filter-label">Giá trị</label>
                <select 
                    value={filterValue} 
                    onChange={e => setFilterValue(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Tất cả</option>
                    {filterType === 'month' && monthOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                    {filterType === 'quarter' && quarterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                    {filterType === 'year' && yearOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DateFilter; 