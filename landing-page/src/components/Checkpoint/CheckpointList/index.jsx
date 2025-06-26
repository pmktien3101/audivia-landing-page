import React from 'react'
import './style.css'
import CheckpointCard from '../CheckpointCard';
export default function CheckpointList({ checkpoints }) {
  return (
    <div className="checkpoint-list-container">
      <div className="checkpoint-list">
        {checkpoints.map((checkpoint, index) => (
          <React.Fragment key={checkpoint.id}>
            <CheckpointCard checkpoint={checkpoint} />
            {/* Thêm connector giữa các item (trừ item cuối) */}
            {index < checkpoints.length - 1 && (
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