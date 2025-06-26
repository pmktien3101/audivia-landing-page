import React from 'react';
import './style.css'
import CheckpointList from '../../Checkpoint/CheckpointList';
import { FaClock } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
export default function TourIntroTab({ tour }) {
    return (
      <div className='tour-intro-container'>
        {/* General Info Section */}
        <div className='info-card general-info'>
          <h3 className='section-title'>Thông tin chung</h3>
          <div className='info-grid'>
            <div className='info-item'>
              <span className='info-label'><FaClock style={{color: '#00A5CF'}}/> Tổng thời lượng</span>
              <span className='info-value'>{tour?.duration || '--'} giờ</span>
            </div>
            <div className='info-item'>
              <span className='info-label'><MdLocationOn style={{ marginRight: '6px', color: '#ff5722'}} /> Tổng điểm đến</span>
              <span className='info-value'>{tour?.checkpoints?.length || 0} điểm</span>
            </div>
          </div>
        </div>
  
        {/* Description Section */}
        <div className='info-card description-section'>
          <h3 className='section-title'>Mô tả tour</h3>
          <div className='description-content'>
            {tour?.description || 'Chưa có mô tả chi tiết'}
          </div>
        </div>
  
        {/* Checkpoints Section */}
        <div className='info-card checkpoints-section'>
          <div className='section-header'>
            <h3 className='section-title'>Lộ trình tham quan</h3>
            <span className='checkpoint-count'>{tour?.checkpoints?.length || 0} điểm dừng chân</span>
          </div>
          <CheckpointList checkpoints={tour?.checkpoints} />
        </div>
      </div>
    );
  }