import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import CharacterService from '../../../services/character';
import HistoryTransaction from '../../../services/historyTransaction';
import useUser from '../../../hooks/useUser';
import ROUTES from '../../../utils/routes';
import toast from 'react-hot-toast';

const Character = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [userTourId, setUserTourId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCheckingPurchase, setIsCheckingPurchase] = useState(false);
  const currentAudioRef = useRef(null);
  const user = useUser();
  const { id: tourId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoadingData(true);
        const response = await CharacterService.getAllCharacter();
        setCharacters(response);
        if (response && response.length > 0) {
          setSelectedCharacter(response[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingData(false);
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (user?.userId && tourId) {
      checkIfUserPurchasedTour();
    }
  }, [user, tourId]);

  const checkIfUserPurchasedTour = async () => {
    if (!user?.userId) return;
    try {
      setIsCheckingPurchase(true);
      const response = await HistoryTransaction.checkUserPurchasedTour(user.userId, tourId);
      if (response) {
        setUserTourId(response.id);
      }
    } catch (error) {
      console.error('Error checking user purchased tour:', error);
    } finally {
      setIsCheckingPurchase(false);
    }
  };

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }
    };
  }, []);

  const handleCharacterSelect = (character) => {
    setIsAnimating(true);
    setSelectedCharacter(character);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const handleAudioPreview = (character, event) => {
    event.stopPropagation();

    if (playingAudio === character.id) {
      // Stop current audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }
      setPlayingAudio(null);
      return;
    }

    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    // Play new audio
    const audio = new Audio(character.audioUrl);
    currentAudioRef.current = audio;
    audio.play();
    setPlayingAudio(character.id);

    // Reset playing state when audio ends
    audio.onended = () => {
      setPlayingAudio(null);
      currentAudioRef.current = null;
    };

    audio.onerror = () => {
      setPlayingAudio(null);
      currentAudioRef.current = null;
      alert('Không thể phát audio preview. Vui lòng thử lại sau.');
    };
  };

  const handleConfirmSelection = async () => {
    if (!selectedCharacter) {
      alert('Vui lòng chọn một nhân vật!');
      return;
    }

    if (isCheckingPurchase) {
      alert('Vui lòng đợi hệ thống kiểm tra thông tin tour...');
      return;
    }

    if (tourId && userTourId) {
      try {
        setIsUpdating(true);
        await HistoryTransaction.updateAudioCharacterId(userTourId, selectedCharacter.id);
        alert(`Bạn đã chọn ${selectedCharacter.name}! 🎉`);

        navigate(ROUTES.TOUR_AUDIO.replace(':id', tourId));
      } catch (error) {
        console.error('Error updating audio character:', error);
        alert('Có lỗi xảy ra khi cập nhật nhân vật. Vui lòng thử lại sau.');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const getVoiceTypeColor = (voiceType) => {
    if (voiceType.includes('Female')) {
      return '#FFB6C1';
    } else if (voiceType.includes('Male')) {
      return '#87CEEB';
    }
  };

  if (isLoadingData) {
    return (
      <div className="character-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải danh sách nhân vật...</p>
        </div>
      </div>
    );
  }

  if (error && characters.length === 0) {
    return (
      <div className="character-container">
        <div className="error-container">
          <h2>😔 Có lỗi xảy ra</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Thử lại</button>
        </div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="character-container">
        <div className="error-container">
          <h2>😔 Không có nhân vật nào</h2>
          <p>Hiện tại không có nhân vật nào khả dụng.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="character-container">
      <div className="character-header">
        <h1 className="character-title">
          <span className="title-icon"></span>
          Chọn Nhân Vật Dẫn Chuyện
          <span className="title-icon"></span>
        </h1>
        <p className="character-subtitle">
          Hãy chọn một nhân vật và nghe thử giọng đọc để tìm người đồng hành phù hợp với bạn!
        </p>
      </div>

      <div className="character-grid">
        {characters.map((character) => (
          <div
            key={character.id}
            className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''} ${isAnimating && selectedCharacter?.id === character.id ? 'animate' : ''}`}
            onClick={() => handleCharacterSelect(character)}
            style={{ '--character-color': getVoiceTypeColor(character.voiceType) }}
          >
            <div className="character-avatar">
              <img
                src={character.avatarUrl}
                alt={character.name}
                className="avatar-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
              />
              <span className="avatar-fallback" style={{ display: 'none' }}>
                {character.name.charAt(0)}
              </span>
            </div>

            <div className="character-info">
              <h3 className="character-name">{character.name}</h3>
              <p className="character-voice-type">{character.voiceType}</p>
              <p className="character-description">{character.description}</p>

              <div className="audio-preview-section">
                <button
                  className={`audio-preview-btn ${playingAudio === character.id ? 'playing' : ''}`}
                  onClick={(e) => handleAudioPreview(character, e)}
                >
                  <span className="audio-icon">
                    {playingAudio === character.id ? '⏸️' : '🔊'}
                  </span>
                  {playingAudio === character.id ? 'Dừng' : 'Nghe thử'}
                </button>
              </div>
            </div>

            <div className="selection-indicator">
              {selectedCharacter?.id === character.id && (
                <span className="checkmark">✓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="selection-summary">
          <div className="summary-card">
            <h3>Nhân Vật Đã Chọn:</h3>
            <div className="selected-character-info">
              <img
                src={selectedCharacter.avatarUrl}
                alt={selectedCharacter.name}
                className="selected-avatar-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
              />
              <span className="selected-avatar-fallback" style={{ display: 'none' }}>
                {selectedCharacter.name.charAt(0)}
              </span>
              <div>
                <h4>{selectedCharacter.name}</h4>
                <p className="selected-voice-type">{selectedCharacter.voiceType}</p>
                <p>{selectedCharacter.description}</p>
              </div>
            </div>
            <button
              className="confirm-button"
              onClick={handleConfirmSelection}
              disabled={isUpdating || isCheckingPurchase}
            >
              <span className="button-icon">
                {isUpdating ? '⏳' : isCheckingPurchase ? '🔄' : '🎯'}
              </span>
              {isUpdating ? 'Đang cập nhật...' : isCheckingPurchase ? 'Đang kiểm tra...' : 'Xác Nhận Lựa Chọn'}
            </button>
          </div>
        </div>
      )}

      <div className="floating-elements">
        <div className="floating-star">⭐</div>
        <div className="floating-heart">💖</div>
        <div className="floating-sparkle">✨</div>
        <div className="floating-star">🌟</div>
        <div className="floating-heart">💕</div>
      </div>
    </div>
  );
};

export default Character;
