import React, { useEffect, useState } from 'react';
import './style.css';
import SavedToursList from '../../../components/Tour/SavedToursList';
import { useNavigate } from 'react-router-dom';
import saveTourService from '../../../services/saveTour';
import userService from '../../../services/user';

const Favorites = () => {
  const navigate = useNavigate();

  const handleTourClick = (tourId) => {
    // Navigate to tour detail page
    navigate(`/tour/${tourId}`);
  };

  const handleScheduleClick = (tourId) => {
    // Navigate to schedule page
    navigate(`/schedule/${tourId}`);
  };
  const [savedTours, setSavedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState()

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
    </div>
  );
};

export default Favorites; 