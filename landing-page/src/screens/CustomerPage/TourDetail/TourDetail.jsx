import React, { useEffect, useState } from 'react'
import TourDetailCard from '../../../components/Tour/TourDetailCard/TourDetailCard'
import ReviewTourTab from '../../../components/Tour/ReviewTourTab'
import TourIntroTab from '../../../components/Tour/TourIntroTab'
import './style.css'

import { useParams } from 'react-router-dom';
import HistoryTransaction from '../../../services/historyTransaction'
import tourService from '../../../services/tour'
import ReviewService from '../../../services/review'
import userService from '../../../services/user'
import TransactionService from '../../../services/transaction'
import toast from 'react-hot-toast'
import ConfirmPaymentModal from '../../../components/Payment/ConfirmPaymentModal'
import ROUTES from '../../../utils/routes'
import { useNavigate } from 'react-router-dom'

export default function TourDetail() {
  const [activeTab, setActiveTab] = useState('intro');
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const renderTabContent = () => {
    if (!tour) return <div className='loading-data'>Đang tải dữ liệu...</div>;
    switch(activeTab) {
      case 'intro':
        return <TourIntroTab tour={tour} isPurchased={!!transaction} onBuyNow={handleBuyNow} isDeveloping={isDeveloping}/>;
      case 'review':
        return <ReviewTourTab reviews={reviews}/>;
      default:
        return null;
    }
  }
  const [user, setUser] = useState()

  const { id } = useParams();
  const [tour, setTour] = useState()
  const [transaction, setTransaction] = useState()
  const [reviews, setReviews] = useState([])
  const [isDeveloping, setIsDeveloping] = useState(false)

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

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const checkUserPurchasedTour = async () => {
     if (!user) return;
    
    const result = await HistoryTransaction.checkUserPurchasedTour(user.id, id)
    
    if (result)
      setTransaction(result)
  }

  const fetchTourById = async () => {
    const result = await tourService.getTourById(id)
    const checkHasAudio = await tourService.hasAudioForTour(id)
    setIsDeveloping(!checkHasAudio);
    if (result)
      setTour(result)
  }

  const fetchReviewsByTourId = async () => {
    const result = await ReviewService.getReviewsByTourId(id)
    if (result)
      setReviews(result)
  }

  // Logic thanh toán
  const handleButtonClick = () => {
    if (transaction) {
      navigate(ROUTES.CHARACTER.replace(':id', tour?.id))
    } else {
      if (!user) {
        toast.error('Vui lòng đăng nhập để mua tour');
        return;
      }
      
      if (user?.balanceWallet < tour.price) {
        navigate(ROUTES.WALLET)
      } else {
        setOpenModal(true)
      }
    }
  }

  const handleConfirmPayment = async () => {
    if (!user || !user.id) {
      toast.error('Không tìm thấy thông tin người dùng');
      return;
    }

    setLoading(true)
    try {
      await TransactionService.createNewTransactionHistory(user.id, tour)
      setOpenModal(false)
      toast.success('Thanh toán thành công!')
      
      // Gọi lại API để lấy thông tin transaction mới nhất
      await checkUserPurchasedTour()
      
    } catch (error) {
      console.error('Lỗi thanh toán:', error);
      toast.error('Thanh toán thất bại!')
    } finally {
      setLoading(false)
    }
  }

  const handleBuyNow = () => {
    setOpenModal(true)
  }

  useEffect(() => {
    fetchTourById()
    fetchReviewsByTourId()
  }, [])

  useEffect(() => {
    if (user) {
      checkUserPurchasedTour()
    }
  }, [user])

  return (
    <>
    <div className='tour-detail-bg'>
      <div className='tour-detail-main-container'>
        <div className='tour-detail-main-left'>
          <TourDetailCard 
            tour={tour} 
            isPurchased={!!transaction}
            onButtonClick={handleButtonClick}
            loading={loading}
            isDeveloping={isDeveloping}
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
          <div className='tour-detail-tab-content'>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
    
    <ConfirmPaymentModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onConfirm={handleConfirmPayment}
      tour={tour}
    />
    </>
  )
}
