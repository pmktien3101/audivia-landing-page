import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import tourService from '../../../services/tour';
import ReviewService from '../../../services/review';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../components/Review/ReviewCard/style.css';
import './style.css';
import { FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ROUTES from '../../../utils/routes';

const Review = () => {
  const user = useUser();
  const { id: tourId } = useParams()
  const [tour, setTour] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTour = async () => {
      if (!tourId) return;
      try {
        const res = await tourService.getTourById(tourId);
        console.log('RES', res)
        setTour(res || null);
      } catch (err) {
        setTour(null);
      }
    };
    fetchTour();
  }, [tourId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !rating) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    setLoading(true);
    try {
      await ReviewService.createTourReview(
        title,
        rating,
        content,
        tourId,
        user.userId
      );
      toast.success('Gửi đánh giá thành công!');
      setTitle('');
      setContent('');
      setRating(5);
      navigate(ROUTES.HISTORY_TOUR);
   } catch (err) {
      toast.error('Có lỗi xảy ra khi gửi đánh giá.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-page">
      {tour && (
        <div className="review-tour-card">
          <div className="review-tour-header">
            <img src={tour?.thumbnailUrl} alt={tour?.title} className="review-tour-img" />
            <div className="review-tour-header-content">
              <div className="review-tour-title">{tour?.title}</div>
              <div className="review-tour-desc">{tour?.description || ''}</div>
              <div className="review-tour-info">
                <div className="review-tour-info-item"><span className="label">Thời lượng:</span> <span>{tour?.duration} giờ</span></div>
                <div className="review-tour-info-item"><span className="label">Địa điểm:</span> <span>{tour?.location}</span></div>
                <div className="review-tour-info-item"><span className="label">Giá:</span> <span>{tour?.price} VNĐ</span></div>
                <div className="review-tour-info-item"><span className="label">Đánh giá:</span> <span>{tour?.avgRating} <FiStar/></span></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="review-form-card">
        <h2 className="review-form-title">Đánh giá tour</h2>
        <form onSubmit={handleSubmit}>
          <div className="review-form-group">
            <label>Tiêu đề:</label>
            <input type='text' value={title} onChange={e => setTitle(e.target.value)} className="review-input" placeholder="Nhập tiêu đề..." />
          </div>
          <div className="review-form-group">
            <label>Nội dung:</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} className="review-textarea" placeholder="Chia sẻ trải nghiệm của bạn..." />
          </div>
          <div className="review-form-group">
            <label>Đánh giá:</label>
            <div className="review-rating-row">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`review-star${idx < rating ? ' filled' : ''}`}
                  onClick={() => setRating(idx + 1)}
                >
                  {idx < rating ? '\u2605' : '\u2606'}
                </span>
              ))}
              <span className="review-rating-value">{rating}/5</span>
            </div>
          </div>
          <button type='submit' disabled={loading} className="review-submit-btn">
            {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
