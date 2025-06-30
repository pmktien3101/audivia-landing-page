import React, { useEffect, useState } from 'react';
import tourService from '../../../services/tour';
import { TourList } from '../../../components/Tour/TourList';
import '../Trial/style.css';

const TrialFree = () => {
  const [freeTours, setFreeTours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllFreeTours = async () => {
      setLoading(true);
      try {
        const result = await tourService.getAllToursPaginated({ pageIndex: 1, pageSize: 10 });
        const allTours = result.data || [];
        const free = allTours.filter(tour => tour.price === 0);
        setFreeTours(free);
      } catch (error) {
        setFreeTours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFreeTours();
  }, []);

  return (
    <div className="trial-free-bg">
      <div className="trial-free-container">
        <h2 className="trial-free-title">Trải nghiệm miễn phí các Audio Tour!</h2>
        <div className="trial-free-subtitle">
          Khám phá thử các tour nổi bật hoàn toàn miễn phí. Chỉ cần chọn tour bạn thích và bắt đầu hành trình trải nghiệm ngay!
        </div>
        {loading ? (
          <div className="trial-free-loading">Đang tải...</div>
        ) : freeTours.length === 0 ? (
          <div className="trial-free-empty">Không có tour miễn phí nào.</div>
        ) : (
          <TourList tours={freeTours} />
        )}
      </div>
    </div>
  );
};

export default TrialFree;
