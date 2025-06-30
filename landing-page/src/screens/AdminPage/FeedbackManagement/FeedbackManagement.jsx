import React, { useEffect, useState } from 'react';
import Table from '../components/Table/Table';
import ReviewService from '../../../services/review';
import tourService from '../../../services/tour';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './style.css';
import AdminHeader from '../components/AdminHeader';

export default function FeedbackManagement() {
  const [reviews, setReviews] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ReviewService.getAllTourReviews();
        // Lấy tất cả tour, lấy nhiều hơn mặc định để đủ dữ liệu
        const allTours = await tourService.getAllTours(1, 1000);
        setTours(allTours || []);
        // Map lại review để luôn có tourTitle đúng
        const reviewsWithTour = (res || []).map(r => {
          let tour = r.tour || allTours?.find(t => t.id === r.tourId || t.id === r.tour_id);
          return {
            ...r,
            tourId: r.tourId || r.tour_id || tour?.id,
            tourTitle: r.tourTitle || r.tour?.title || r.tour_name || tour?.title || 'Không rõ',
          };
        });
        setReviews(reviewsWithTour);
      } catch (e) {
        setReviews([]);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Tổng số feedback
  const totalFeedback = reviews.length;

  // Gom nhóm feedback theo tourId
  const feedbackByTour = React.useMemo(() => {
    const map = {};
    reviews.forEach(r => {
      if (!r.tourId) return;
      const tourName = r.tourTitle || 'Không rõ';
      if (!map[r.tourId]) map[r.tourId] = { name: tourName, value: 0 };
      map[r.tourId].value += 1;
    });
    return Object.values(map);
  }, [reviews]);

  // Cột cho bảng feedback
  const columns = [
    { key: 'tourTitle', label: 'Tên tour' },
    { key: 'rating', label: 'Số sao' },
    { key: 'content', label: 'Nội dung' },
    { key: 'createdAt', label: 'Ngày tạo' },
  ];

  // Render cell tuỳ chỉnh cho avatar, rating, ngày tạo
  const renderCell = (row, column) => {
    if (column.key === 'rating') {
      return (
        <span>
          {Array.from({ length: 5 }).map((_, idx) => (
            <span key={idx}>{idx < row.rating ? '★' : '☆'}</span>
          ))}
        </span>
      );
    }
    if (column.key === 'createdAt') {
      return row.createdAt ? new Date(row.createdAt).toLocaleDateString('vi-VN') : '';
    }
    if (column.key === 'tourTitle') {
      return row.tourTitle || row.tour?.title || row.tour_name || 'Không rõ';
    }
    return row[column.key];
  };

  return (
    <div className="admin-feedback-page">
       <AdminHeader />
      <div className="admin-feedback-summary">
        <div className="feedback-total-card">
          <div className="feedback-total-icon">
            <svg width="40" height="40" fill="#fff"><path d="M20 2C10.6 2 3 9.6 3 19c0 6.6 4.1 12.2 10 14.6V38c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-4.4c5.9-2.4 10-8 10-14.6C37 9.6 29.4 2 20 2z" /></svg>
          </div>
          <div className="feedback-total-value">{totalFeedback}</div>
          <div className="feedback-total-label">Tổng số phản hồi nhận được</div>
        </div>
        <div className="feedback-bar-chart">
          <ResponsiveContainer width={1000} height={260}>
            <BarChart data={feedbackByTour} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Số đánh giá" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="admin-feedback-table">
        <Table
          title="Danh sách Đánh giá"
          data={reviews}
          columns={columns}
          renderCell={renderCell}
          searchField="content"
          exportProps={{
            overviewData: {
              'Tổng số phản hồi': totalFeedback,
              'Ngày xuất báo cáo': new Date().toLocaleDateString('vi-VN')
            },
            sheetsData: [
              {
                sheetName: 'Feedback',
                data: reviews.map(r => ({
                  'Tên tour': r.tourTitle || r.tour?.title || r.tour_name || 'Không rõ',
                  'Số sao': r.rating,
                  'Nội dung': r.content,
                  'Ngày tạo': r.createdAt ? new Date(r.createdAt).toLocaleDateString('vi-VN') : ''
                }))
              }
            ],
            fileName: `Feedback_Report_${new Date().toISOString().split('T')[0]}`,
            chartImages: []
          }}
        />
      </div>
    </div>
  );
}
