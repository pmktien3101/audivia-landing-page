import React, { useEffect, useState } from 'react';
import './style.css';
import SavedToursList from '../../../components/Tour/SavedToursList';
import { useNavigate } from 'react-router-dom';
import saveTourService from '../../../services/saveTour';
import userService from '../../../services/user';
import DatePickerModal from '../../../components/DatePickerModal/DatePickerModal';
import toast, { Toaster } from 'react-hot-toast';


const Favorites = () => {
  const [savedTours, setSavedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState()
  const [selectedDate, setSelectedDate] = useState()

  const [showModal, setShowModal] = useState(false)
  const [selectedSavedTour, setSelectedSavedTour] = useState(null);
  const navigate = useNavigate();

  const handleTourClick = (tourId) => {
    // Navigate to tour detail page
    navigate(`/tour/${tourId}`);
  };

  const handleScheduleClick = (savedTour) => {
    setSelectedSavedTour(savedTour)
    if (savedTour.plannedTime) {
      // Nếu tour đã có ngày lên lịch, parse nó thành Date
      const parsedDate = new Date(savedTour.plannedTime);
      setSelectedDate(parsedDate);
    } else {
      // Nếu chưa có, xóa ngày đang chọn
      setSelectedDate(null);
    }
    setShowModal(true)
  };

  const handleConfirmDate = () => {
    if (!selectedSavedTour || !selectedDate) return;
    const plannedTime = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0, 0, 0
      )
    ).toISOString();
    saveTourService.updateTourSaved(selectedSavedTour.id, plannedTime)
      .then(response => {
        toast.success("Cập nhật ngày dự định đi thành công");
        setShowModal(false);
        fetchSavedTours();
      })
      .catch(err => {
        toast.error("Có lỗi khi cập nhật ngày dự định đi");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);

    setSelectedSavedTour(null);
  };



  const fetchCurrentUser = async() => {
    try {
        const result = await userService.getCurrentUser();
        if(result){
            setUser(result);
        }
    } catch (error) {
        console.error('Lỗi lấy thông tin người dùng:', error);
    }
};


const fetchSavedTours = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await saveTourService.getSavedTours(user?.id);
      setSavedTours(response || []);
    } catch (err) {
      setError('Không thể tải danh sách tour đã lưu', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (savedTourId) => {
    try {
      await saveTourService.deleteTourSaved(savedTourId);
      setSavedTours(prev => prev.filter(tour => tour.id !== savedTourId));
      toast.success('Deleted tour yêu thích thành công')
    } catch (error) {
      console.error('Lỗi xóa tour:', error);
    }
  };

useEffect(() => {
    fetchCurrentUser();
}, []);

  useEffect(() => {
    fetchSavedTours();
  }, [user]);

  return (
    <div className="favorites-container">

      
      <SavedToursList 
        loading={loading}
        error={error}
        savedTours={savedTours}
        onTourClick={handleTourClick}
        onScheduleClick={handleScheduleClick}
        onDelete={handleDelete}
      />
      <DatePickerModal
        show={showModal}
        onClose={handleCloseModal}
        savedTour={selectedSavedTour}
        onConfirm={handleConfirmDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} 
      />
    </div>
  );
};

export default Favorites; 