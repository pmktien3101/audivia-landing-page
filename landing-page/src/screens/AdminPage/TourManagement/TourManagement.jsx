import './style.css';
import "../../../layouts/AdminLayout/style.css"
import AdminHeader from "../components/AdminHeader";
import Table from '../components/Table';
import { useEffect, useState } from 'react';
import tourService from '../../../services/tour';
import Modal from '../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TourManagement = () => {
    const [tours, setTours] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [editTour, setEditTour] = useState(null);
    const [tourTypes, setTourTypes] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            const response = await tourService.getAllTours();
            setTours(response);
            // Lấy danh sách thể loại duy nhất từ dữ liệu trả về
            if (Array.isArray(response)) {
                const types = Array.from(new Set(response.map(t => t.tourTypeName).filter(Boolean)));
                setTourTypes(types);
            }
        };
        fetchTours();
    },[])
    
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
        if(window.confirm('Bạn có chắc chắn muốn xoá tour này?')){
            try {
                await tourService.deleteTour(id);
                toast.success('Xoá tour thành công!');
                const response = await tourService.getAllTours();
                setTours(response);
            } catch (e) {
                toast.error('Xoá tour thất bại!');
            }
        }
    }

    const handleExport = () => {
        console.log("Xuất dữ liệu");
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setEditTour(null);
    }

    const handleModalSave = async (tour) => {
        if(editTour){
            // update
            try {
                await tourService.updateTour(tour.id, tour);
                toast.success('Cập nhật tour thành công!');
                const response = await tourService.getAllTours();
                setTours(response);
            } catch (e) {
                toast.error('Cập nhật tour thất bại!');
            }
        }else{
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
                const response = await tourService.getAllTours();
                setTours(response);
            } catch (e) {
                toast.error('Tạo tour thất bại!');
            }
        }
        setModalOpen(false);
        setEditTour(null);
    }

    return (
        <div className="dashboard">
            <ToastContainer position="top-right" autoClose={2000} />
            <div className="main-content-table">
                <AdminHeader/>
                <div className="main-table">
                    <Table
                        title="Quản lý Tour"
                        data={tours || []}
                        onAdd={handleAdd}
                        onExport={handleExport}
                        columns={[
                            {key: 'thumbnailUrl', label: 'Ảnh'},
                            { key: 'title', label: 'Tên Tour' },
                            { key: 'location', label: 'Địa điểm' },
                            { key: 'tourTypeName', label: 'Loại Tour' },
                            { key: 'duration', label: 'Thời gian' },
                            { key: 'price', label: 'Giá' },
                            { key: 'actions', label: 'Thao tác' }
                        ]}
                        filterOptions={[
                            { value: '', label: 'Tất cả thể loại' },
                            ...tourTypes.map(type => ({ value: type, label: type }))
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
                            if(column.key === 'duration'){
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
                    {modalOpen && (
                        <Modal onClose={handleModalClose} onSave={handleModalSave} tour={editTour} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TourManagement