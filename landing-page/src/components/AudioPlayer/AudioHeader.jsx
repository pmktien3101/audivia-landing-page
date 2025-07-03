import React from "react";
import './styles.css'
export default function AudioHeader({ checkpointId, onBackPress, onMenuPress }) {

  const handleDetail = () => {
    if (checkpointId) {
      // Simulate navigation for web
      window.location.href = `/tour_checkpoint_detail?checkpointId=${checkpointId}`;
    }
  };

  return (
    <div className="audio-header">
      <button className="back-button" onClick={onBackPress}>
        &#x2190; {/* Left arrow icon */}
      </button>
      <div className="header-title">
        <span className="header-text">Audio Player</span>
      </div>
      <button className="menu-button" onClick={handleDetail}>
        &#x22EE; {/* Vertical ellipsis icon */}
      </button>
    </div>
  );
}

