import React, { useEffect, useState } from 'react'
import TourDetailCard from '../../../components/Tour/TourDetailCard/TourDetailCard'
import ReviewTourTab from '../../../components/Tour/ReviewTourTab'
import TourIntroTab from '../../../components/Tour/TourIntroTab'
import './style.css'
import useUser from '../../../hooks/useUser'
import { useParams } from 'react-router-dom';
import HistoryTransaction from '../../../services/historyTransaction'
import tourService from '../../../services/tour'
import ReviewService from '../../../services/review'

export default function TourDetail() {
  const [activeTab, setActiveTab] = useState('intro');
  const renderTabContent = () => {
    if (!tour) return <div className='loading-data'>Đang tải dữ liệu...</div>;
    switch(activeTab) {
      case 'intro':
        return <TourIntroTab tour={tour}/>;
      case 'review':
        return <ReviewTourTab reviews={reviews}/>;
      default:
        return null;
    }
  }
  const user = useUser();
  const userId = user.userId
  const { id } = useParams();
  const [tour, setTour] = useState()
  const [transaction, setTransaction] = useState()
  const [reviews, setReviews] = useState([])

  const checkUserPurchasedTour = async () => {
    const result = await HistoryTransaction.checkUserPurchasedTour(userId, id)
    if (result)
      setTransaction(result)
  }

  const fetchTourById = async () => {
    const result = await tourService.getTourById(id)
    if (result)
      setTour(result)
  }

  const fetchReviewsByTourId = async () => {
    const result = await ReviewService.getReviewsByTourId(id)
    if (result)
      setReviews(result)
  }
  useEffect(() => {
    fetchTourById()
    fetchReviewsByTourId()
    checkUserPurchasedTour()
  }, [])

  return (
    <div className='tour-detail-bg'>
      <div className='tour-detail-main-container'>
        <div className='tour-detail-main-left'>
          <TourDetailCard tour={tour} isPurchased={!!transaction}/>
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
  )
}
