import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import tourService from '../../../services/tour';
import Modal from '../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const TourManagement = () => {
    const [tours, setTours] = useState([]);
    const [allTours, setAllTours] = useState([]); // Lưu toàn bộ tours cho export
    const [modalOpen, setModalOpen] = useState(false);
    const [editTour, setEditTour] = useState(null);
    const [tourTypes, setTourTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 5,
        totalPages: 1,
        count: 0
    });

    const fetchTours = async (pageIndex = 1) => {
        setLoading(true);
        try {
            const response = await tourService.getAllToursPaginated({
                pageIndex,
                pageSize: 5
            });
            setTours(response.data);
            setPagination({
                pageIndex: response.pagination.pageIndex,
                pageSize: response.pagination.pageSize,
                totalPages: response.pagination.totalPages,
                count: response.pagination.count
            });
        } catch (error) {
            console.error('Error fetching tours:', error);
            setTours([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all tours for export
    const fetchAllTours = async () => {
        try {
            const response = await tourService.getAllToursPaginated();
            setAllTours(response.data || []);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching all tours:', error);
            setAllTours(tours);
            return tours;
        }
    };

    const fetchTourTypes = async () => {
        try {
            const response = await tourService.getTourTypes();
            if (Array.isArray(response)) {
                const types = response.map(type => {
                    if (typeof type === 'object') {
                        return type.name || type.title || type.id || JSON.stringify(type);
                    }
                    return type;
                });
                setTourTypes(types);
            }
        } catch (error) {
            console.error('Error fetching tour types:', error);
            setTourTypes([]);
        }
    };

    useEffect(() => {
        fetchTours();
        fetchTourTypes();
        // Fetch all tours for export on component mount
        fetchAllTours();
    }, []);

    const handleAdd = () => {
        setEditTour(null);
        setModalOpen(true);
    }

    const handleEdit = (id) => {
        const tour = tours.find(t => t.id === id);
        setEditTour(tour);
        setModalOpen(true);
    }

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá tour này?')) {
            try {
                await tourService.deleteTour(id);
                toast.success('Xoá tour thành công!');
                fetchTours(pagination.pageIndex);
            } catch (e) {
                toast.error('Xoá tour thất bại!');
            }
        }
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setEditTour(null);
    }

    const handleModalSave = async (tour) => {
        if (editTour) {
            // update
            try {
                await tourService.updateTour(tour.id, tour);
                toast.success('Cập nhật tour thành công!');
                fetchTours(pagination.pageIndex);
            } catch (e) {
                toast.error('Cập nhật tour thất bại!');
            }
        } else {
            // create
            // Build the payload, only including non-null fields
            const payload = {
                title: tour.title,
                description: tour.description || '',
                location: tour.location,
                startLatitude: tour.startLatitude || 0,
                startLongitude: tour.startLongitude || 0,
                price: tour.price ? Number(tour.price) : 0,
                duration: tour.duration ? Number(tour.duration) : 0,
                typeId: tour.typeId || '',
                thumbnailUrl: tour.thumbnailUrl || '',
                useCustomMap: tour.useCustomMap || false,
                customMapImages: tour.customMapImages || [],
            };
            try {
                await tourService.createTour(payload);
                toast.success('Tạo tour thành công!');
                // Refresh tour list
                fetchTours(pagination.pageIndex);
            } catch (e) {
                toast.error('Tạo tour thất bại!');
            }
        }
        setModalOpen(false);
        setEditTour(null);
    }

    const handlePageChange = (newPageIndex) => {
        fetchTours(newPageIndex);
    };

    // Prepare export data for tours
    const getExportProps = async () => {
        let toursForExport = allTours;
        if (!toursForExport || toursForExport.length === 0) {
            toursForExport = await fetchAllTours();
        }

        // Calculate statistics using all tours
        const totalTours = toursForExport.length;
        const totalValue = toursForExport.reduce((sum, tour) => sum + (tour.price || 0), 0);
        const avgPrice = totalTours > 0 ? totalValue / totalTours : 0;
        const toursByType = tourTypes.reduce((acc, type) => {
            acc[type] = toursForExport.filter(tour => tour.tourTypeName === type).length;
            return acc;
        }, {});

        const overviewData = {
            'Tổng số tour': totalTours,
            'Tổng giá trị': `${totalValue.toLocaleString('vi-VN')} VNĐ`,
            'Giá trung bình': `${Math.round(avgPrice).toLocaleString('vi-VN')} VNĐ`,
            'Ngày xuất báo cáo': new Date().toLocaleDateString('vi-VN'),
            ...Object.keys(toursByType).reduce((acc, type) => {
                acc[`Số tour ${type}`] = toursByType[type];
                return acc;
            }, {})
        };

        const sheetsData = [
            {
                sheetName: 'Danh sách Tour',
                data: toursForExport.map(tour => ({
                    'Tên Tour': tour.title || '',
                    'Địa điểm': tour.location || '',
                    'Loại Tour': tour.tourTypeName || '',
                    'Thời gian (giờ)': tour.duration || 0,
                    'Giá (VNĐ)': tour.price ? tour.price.toLocaleString('vi-VN') : '0',
                    'Mô tả': tour.description || '',
                    'URL Ảnh': tour.thumbnailUrl || '',
                    'Tọa độ bắt đầu': `${tour.startLatitude || 0}, ${tour.startLongitude || 0}`,
                    'Sử dụng bản đồ tùy chỉnh': tour.useCustomMap ? 'Có' : 'Không'
                }))
            },
            {
                sheetName: 'Thống kê theo loại',
                data: Object.keys(toursByType).map(type => ({
                    'Loại Tour': type,
                    'Số lượng': toursByType[type],
                    'Tỷ lệ': totalTours > 0 ? `${((toursByType[type] / totalTours) * 100).toFixed(1)}%` : '0%'
                }))
            }
        ];

        return {
            overviewData,
            sheetsData,
            fileName: `BaoCao_QuanLyTour_${new Date().toISOString().split('T')[0]}`,
            chartImages: []
        };
    };

    return (
        <div className="dashboard">
            <ToastContainer position="top-right" autoClose={2000} />
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
                            <p>Đang tải dữ liệu tour...</p>
                        </div>
                    ) : (
                        <>
                            <Table
                                title="Quản lý Tour"
                                data={tours || []}
                                onAdd={handleAdd}
                                exportProps={getExportProps}
                                columns={[
                                    { key: 'thumbnailUrl', label: 'Ảnh' },
                                    { key: 'title', label: 'Tên Tour' },
                                    { key: 'location', label: 'Địa điểm' },
                                    { key: 'tourTypeName', label: 'Loại Tour' },
                                    { key: 'duration', label: 'Thời gian' },
                                    { key: 'price', label: 'Giá' },
                                    { key: 'actions', label: 'Thao tác' }
                                ]}
                                filterOptions={[
                                    { value: '', label: 'Tất cả thể loại' },
                                    ...tourTypes.map(type => ({
                                        value: type,
                                        label: type
                                    }))
                                ]}
                                filterKey="tourTypeName"
                                searchField="title"
                                renderCell={(row, column) => {
                                    if (column.key === 'thumbnailUrl') {
                                        return row.thumbnailUrl ? (
                                            <img src={row.thumbnailUrl} alt={row.title} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                                        ) : (
                                            <span>No image</span>
                                        );
                                    }
                                    if (column.key === 'duration') {
                                        return `${row.duration} giờ`
                                    }
                                    if (column.key === 'price') {
                                        return `${row.price.toLocaleString('vi-VN')} VNĐ`;
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

                            {/* Pagination Controls */}
                            <div className="pagination-controls" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                marginTop: '20px',
                                padding: '10px'
                            }}>
                                <button
                                    onClick={() => handlePageChange(pagination.pageIndex - 1)}
                                    disabled={pagination.pageIndex <= 1}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        backgroundColor: pagination.pageIndex <= 1 ? '#f5f5f5' : 'white',
                                        cursor: pagination.pageIndex <= 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <MdChevronLeft size={20} />
                                </button>

                                <span style={{ fontSize: '14px' }}>
                                    Trang {pagination.pageIndex} / {pagination.totalPages}
                                    ({pagination.count} tour)
                                </span>

                                <button
                                    onClick={() => handlePageChange(pagination.pageIndex + 1)}
                                    disabled={pagination.pageIndex >= pagination.totalPages}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        backgroundColor: pagination.pageIndex >= pagination.totalPages ? '#f5f5f5' : 'white',
                                        cursor: pagination.pageIndex >= pagination.totalPages ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <MdChevronRight size={20} />
                                </button>
                            </div>

                            {modalOpen && (
                                <Modal onClose={handleModalClose} onSave={handleModalSave} tour={editTour} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TourManagement