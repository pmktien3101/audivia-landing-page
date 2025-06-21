/**
 * Lọc dữ liệu theo filter type và value
 * @param {Array} data - Dữ liệu cần lọc
 * @param {string} filterType - Loại filter: 'month', 'quarter', 'year'
 * @param {string} filterValue - Giá trị filter
 * @param {string} dateField - Tên field chứa ngày tháng (mặc định: 'createdAt')
 * @returns {Array} - Dữ liệu đã được lọc
 */
export const filterDataByDate = (data, filterType, filterValue, dateField = 'createdAt') => {
    if (!data || data.length === 0) return [];
    if (!filterValue) return data;

    let filtered = data;
    
    if (filterType === 'month') {
        filtered = data.filter(item => {
            if (!item[dateField]) return false;
            const d = new Date(item[dateField]);
            const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            return val === filterValue;
        });
    } else if (filterType === 'quarter') {
        filtered = data.filter(item => {
            if (!item[dateField]) return false;
            const d = new Date(item[dateField]);
            const month = d.getMonth() + 1;
            let q = '';
            if (month >= 1 && month <= 4) q = 'Q1';
            else if (month >= 5 && month <= 8) q = 'Q2';
            else q = 'Q3';
            const val = `${d.getFullYear()}-${q}`;
            return val === filterValue;
        });
    } else if (filterType === 'year') {
        filtered = data.filter(item => {
            if (!item[dateField]) return false;
            const d = new Date(item[dateField]);
            return String(d.getFullYear()) === filterValue;
        });
    }
    
    return filtered;
}; 