import React, { useEffect, useState } from 'react';
import TourDetailCard from '../../../components/Tour/TourDetailCard/TourDetailCard';
import ReviewTourTab from '../../../components/Tour/ReviewTourTab';
import TourIntroTab from '../../../components/Tour/TourIntroTab';
import './style.css';

import { useParams, useNavigate } from 'react-router-dom';
import HistoryTransaction from '../../../services/historyTransaction';
import tourService from '../../../services/tour';
import ReviewService from '../../../services/review';
import userService from '../../../services/user';
import TransactionService from '../../../services/transaction';
import toast from 'react-hot-toast';
import ConfirmPaymentModal from '../../../components/Payment/ConfirmPaymentModal';
import ROUTES from '../../../utils/routes';

export default function TourDetail() {
  const [activeTab, setActiveTab] = useState('intro');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const [tour, setTour] = useState();
  const [transaction, setTransaction] = useState();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState();

  const renderTabContent = () => {
    if (!tour) return <div className='loading-data'>Đang tải dữ liệu...</div>;
    switch (activeTab) {
      case 'intro':
        return <TourIntroTab tour={tour} />;
      case 'review':
        return <ReviewTourTab reviews={reviews} />;
      default:
        return null;
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const result = await userService.getCurrentUser();
      console.log('USER o detail', result);
      if (result) {
        setUser(result);
      }
    } catch (error) {
      console.error('Lỗi lấy thông tin người dùng:', error);
    }
  };

  const checkUserPurchasedTour = async () => {
    if (!user) return;
    const result = await HistoryTransaction.checkUserPurchasedTour(user.id, id);
    console.log(result);
    if (result) setTransaction(result);
  };

  const fetchTourById = async () => {
    const result = await tourService.getTourById(id);
    if (result) setTour(result);
  };

  const fetchReviewsByTourId = async () => {
    const result = await ReviewService.getReviewsByTourId(id);
    if (result) setReviews(result);
  };

  const handleButtonClick = () => {
    if (transaction) {
      navigate(ROUTES.CHARACTER.replace(':id', tour?.id));
    } else {
      if (!user) {
        toast.error('Vui lòng đăng nhập để mua tour');
        return;
      }

      if (user.balanceWallet < tour.price) {
        navigate(ROUTES.WALLET);
      } else {
        setOpenModal(true);
      }
    }
  };

  const handleConfirmPayment = async () => {
    if (!user || !user.id) {
      toast.error('Không tìm thấy thông tin người dùng');
      return;
    }

    setLoading(true);
    try {
      await TransactionService.createNewTransactionHistory(user.id, tour);
      setOpenModal(false);
      toast.success('Thanh toán thành công!');
      await checkUserPurchasedTour(); // Cập nhật lại trạng thái đã mua
    } catch (error) {
      console.error('Lỗi thanh toán:', error);
      toast.error('Thanh toán thất bại!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchTourById();
    fetchReviewsByTourId();
  }, []);

  useEffect(() => {
    if (user) {
      checkUserPurchasedTour();
    }
  }, [user]);

  return (
    <>
      <div className='tour-detail-container'>
        <div className='tour-detail-left'>
          <TourDetailCard
            tour={tour}
            isPurchased={!!transaction}
            onButtonClick={handleButtonClick}
            loading={loading}
          />
        </div>

        <div className='tour-detail-main-right'>
          <div className='split-tab-container'>
            <button
              className={`split-tab ${activeTab === 'intro' ? 'active' : ''}`}
              onClick={() => setActiveTab('intro')}
            >
              Giới thiệu
            </button>
            <button
              className={`split-tab ${activeTab === 'review' ? 'active' : ''}`}
              onClick={() => setActiveTab('review')}
            >
              Đánh giá
            </button>
          </div>
          <div className='tour-detail-tab-content'>{renderTabContent()}</div>
        </div>
      </div>

      <ConfirmPaymentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmPayment}
        tour={tour}
      />
    </>
  );
}