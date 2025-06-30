import React, { useEffect, useState } from "react";
import { TourCard } from "../TourCard";
import tourService from "../../../services/tour";
import useUser from "../../../hooks/useUser";
import "./style.css";
import SavedTourCard from "../SavedTourCard";

const DEFAULT_RADIUS = 10; // km

const SuggestedTourList = () => {
  const user = useUser();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    if (!user?.userId) {
      setError("Bạn cần đăng nhập để xem gợi ý tour.");
      setLoading(false);
      return;
    }
    if (!navigator.geolocation) {
      setError("Trình duyệt không hỗ trợ lấy vị trí.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setError("Không thể truy cập vị trí của bạn. Vui lòng bật quyền vị trí.");
        setLoading(false);
      }
    );
  }, [user]);

  useEffect(() => {
    const fetchSuggested = async () => {
      if (!user?.userId || !location) return;
      setLoading(true);
      setError(null);
      try {
        const result = await tourService.getSuggestedTours(
          user.userId,
          location.lng,
          location.lat,
          DEFAULT_RADIUS
        );
        console.log("Suggested Tours:", result)
        setTours(result || []);
      } catch (e) {
        console.log("Error: ", e);
        setError("Không thể tải danh sách tour gợi ý.");
      } finally {
        setLoading(false);
      }
    };
    fetchSuggested();
  }, [user, location]);

  if (loading) return <div className="suggested-tour-loading">Đang tải gợi ý...</div>;
  if (error) return <div className="suggested-tour-error">{error}</div>;
  if (!tours.length) return null;

  return (
    <div className="suggested-tour-list-container">
      <div className="suggested-tour-list-header">Địa điểm được đề xuất</div>
      <div className="suggested-tour-list-sub">Dựa trên sở thích và vị trí của bạn</div>
      <div className="suggested-tour-list">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            imageUrl={tour.thumbnailUrl}
            country={tour.location}
            title={tour.title}
            price={tour.price}
            rating={tour.avgRating}
            ratingCount={tour.ratingCount}
            tourId={tour.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedTourList; 