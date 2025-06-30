import React from 'react'
import './style.css'
import CheckpointCard from '../CheckpointCard';
export default function CheckpointList({ checkpoints, isPurchased, onBuyNow }) {
  return (
    <div className="checkpoint-list-container">
      <div className="checkpoint-list">
        {checkpoints.map((checkpoint) => (
          <React.Fragment key={checkpoint.id}>
            <CheckpointCard checkpoint={checkpoint} isPurchased={isPurchased} onBuyNow={onBuyNow}/>
            {/* Thêm connector giữa các item (trừ item cuối) */}
            {checkpoint.order < checkpoints.length && (
              <div className="checkpoint-connector">
                <div className="connector-line"></div>
                <div className="connector-arrow">↓</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}