import React, { useRef, useState, useEffect } from 'react'
import './style.css'
import CheckpointService from '../../../services/checkpoint';
export default function CheckpointCard({checkpoint, isPurchased, onBuyNow}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileUrl, setFileUrl] = useState();

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        const res = await CheckpointService.getCheckpointById(checkpoint?.id);
        if (res) {
           setFileUrl(res.audios[0].fileUrl);
        }
      } catch {
        // Có thể log lỗi hoặc bỏ qua
      }
    };
    if ((checkpoint?.order === 1 || checkpoint?.order === 2) && !fileUrl) {
      fetchFileUrl();
    }
    // eslint-disable-next-line
  }, [checkpoint?.id]);

  const handlePlayAudio = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const handlePauseAudio = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow) 
      onBuyNow(checkpoint)
  };

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
          {!isPurchased && (
            <div className='card-audio-action'>
              {(checkpoint?.order === 1 || checkpoint?.order === 2) ? (
                fileUrl ? (
                  <>
                    {isPlaying ? (
                      <button onClick={handlePauseAudio} className='audio-btn'>
                        {'⏸ Dừng lại'}
                      </button>
                    ) : (
                      <button onClick={handlePlayAudio} className='audio-btn'>
                        {'🔊 Nghe thử'}
                      </button>
                    )}
                    <audio ref={audioRef} src={fileUrl} style={{ display: 'none' }} />
                  </>
                ) : (
                  <span className='audio-unavailable'>Không có audio</span>
                )
              ) : (
                <button onClick={handleBuyNow} className='lock-btn' title='Mua ngay'>
                  <span role='img' aria-label='lock'>🔒</span> Mua ngay
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}