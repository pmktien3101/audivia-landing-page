import React, { useState, useRef, useEffect } from "react";

export default function AudioImage({ videoUrl, imageUrl, isPlaying }) {
  const [isBuffering, setIsBuffering] = useState(true);
  const [bufferingTimedOut, setBufferingTimedOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      if (isPlaying) {
        videoEl.play().catch(e => console.error("Error playing video:", e));
      } else {
        videoEl.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    // Reset states for new video
    setIsBuffering(true);
    setBufferingTimedOut(false);

    // Set a timeout to hide the buffering indicator
    const timer = setTimeout(() => {
      setBufferingTimedOut(true);
    }, 5000); // 5-second timeout

    return () => clearTimeout(timer);
  }, [videoUrl]);

  return (
    <div className="audio-image-container">
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={imageUrl}
          className="audio-video"
          loop
          muted
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onCanPlay={() => setIsBuffering(false)}
          onError={(e) => {
            console.error("Video Error:", e);
            setIsBuffering(false);
          }}
        />
      ) : imageUrl ? (
        <img src={imageUrl} alt="Audio Visual" className="audio-image" />
      ) : (
        <div className="audio-image-placeholder">No visual available</div>
      )}

      {isBuffering && !bufferingTimedOut && (
        <div className="buffering-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="image-gradient"></div>
    </div>
  );
}
