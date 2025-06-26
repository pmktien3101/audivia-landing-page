import React from 'react'
import './style.css'
export default function CheckpointCard({checkpoint}) {
    return (
        <div className='checkpoint-card'>
          <div className='card-order-indicator'>
            <span className='order-number'>{checkpoint?.order}</span>
          </div>
    
          <div className='card-content'>
            <div className='card-image-wrapper'>
              <img 
                src={checkpoint?.images?.[0]?.imageUrl || 'https://via.placeholder.com/150x100?text=No+Image'} 
                alt={checkpoint?.title}
                className='card-image'
              />
            </div>
    
            <div className='card-text-content'>
              <h3 className='card-title'>{checkpoint?.title}</h3>
              <p className='card-description'>{checkpoint?.description}</p>
            </div>
          </div>
        </div>
      );
    }