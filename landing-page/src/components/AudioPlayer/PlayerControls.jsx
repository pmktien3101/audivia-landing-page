import React from "react";
import './styles.css'

export default function PlayerControls({
  isPlaying,
  isBuffering,
  onPlayPause,
  onPrevious,
  onNext,
}) {
  return (
    <div className="player-controls-container">
      {/* Control Buttons */}
      <div className="controls-container">
        <button className="control-button" onClick={onPrevious} disabled={isBuffering}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
          </svg>
        </button>

        <div className="play-pause-button">
          {isBuffering ? (
            <div className="spinner"></div> // Simple spinner
          ) : (
            <button onClick={onPlayPause}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}
        </div>

        <button className="control-button" onClick={onNext} disabled={isBuffering}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M13 18V6l8.5 6-8.5 6zm-.5-6l-8.5 6V6l8.5 6z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}