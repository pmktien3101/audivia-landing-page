import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import AudioHeader from "../../../components/AudioPlayer/AudioHeader";
import AudioImage from "../../../components/AudioPlayer/AudioImage";
import PlayerControls from "../../../components/AudioPlayer/PlayerControls";
import Transcript from "../../../components/AudioPlayer/Transcript";
import tourService from "../../../services/tour"
import tourCheckpointService from "../../../services/tourCheckpoint"
import progressService from "../../../services/progress"

import useUser from "../../../hooks/useUser";

/**
 * @typedef {object} AudioPlayerData
 * @property {string} id
 * @property {string} fileUrl
 * @property {string} [image]
 * @property {string} transcript
 * @property {string} [videoUrl]
 */

/**
 * AudioPlayer component for playing audio tours.
 * @param {object} props
 * @param {string | null} props.checkpointId - The ID of the current checkpoint.
 * @param {string | null} props.characterId - The ID of the selected character.
 * @param {string | null} props.tourProgressId - The ID of the user's tour progress.
 * @param {string | null} props.tourId - The ID of the tour.
 * @param {any} ref - Forwarded ref to the internal <audio> element.
 */
const AudioPlayer = forwardRef((props, ref) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const checkpointId = queryParams.get("checkpointId");
    const characterId = queryParams.get("characterId");
    const tourProgressId = queryParams.get("tourProgressId");
    const tourId = queryParams.get("tourId");

    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const audioRef = useRef(null); // Internal ref for the <audio> element

    // Expose internal audio element methods via the forwarded ref
    useImperativeHandle(ref, () => ({
        play: () => {
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.error("Error playing audio via imperative handle:", e));
            }
        },
        pause: () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        },
        // You can expose other audio properties/methods if needed
        get currentSrc() {
            return audioRef.current ? audioRef.current.src : null;
        },
        get currentTime() {
            return audioRef.current ? audioRef.current.currentTime : 0;
        },
        set currentTime(time) {
            if (audioRef.current) audioRef.current.currentTime = time;
        }
    }));

    const [audioData, setAudioData] = useState(null); // AudioPlayerData or null
    const [checkpointImage, setCheckpointImage] = useState(undefined);
    const user = useUser();
    const [currentProgress, setCurrentProgress] = useState(0);

    useEffect(() => {
        const fetchCheckpointImage = async () => {
            setCheckpointImage(undefined);
            if (checkpointId) {
                try {
                    const checkpointDetails = await tourCheckpointService.getTourCheckpointById(checkpointId);
                    if (checkpointDetails && checkpointDetails.images && checkpointDetails.images.length > 0) {
                        setCheckpointImage(checkpointDetails.images[0].imageUrl);
                    }
                } catch (error) {
                    console.error("Failed to fetch checkpoint image:", error);
                }
            }
        };

        fetchCheckpointImage();
    }, [checkpointId]);

    useEffect(() => {
        console.log("current checkpoint: ", checkpointId);
    }, []);

    useEffect(() => {
        const fetchAndSetAudioData = async () => {
            if (checkpointId && characterId) {
                const response = await tourService.getTourAudioByCheckpointId(checkpointId, characterId);
                // Based on new console output, the data is directly in the response object from tourService.
                if (response) {
                    setAudioData(response);
                } else {
                    setAudioData(null);
                    console.log("No audio data found.");
                }
            }
        };
        fetchAndSetAudioData();
    }, [checkpointId, characterId]);

    const saveTrackProgress = useCallback(async (progressSecs, trackData) => {
        if (!user?.id || !checkpointId || !trackData.id || !tourProgressId) {
            console.log("SaveTrackProgress: Missing critical IDs.", {
                userId: user?.id, checkpointId: checkpointId, audioId: trackData.id, tourProgressId: tourProgressId
            });
            return;
        }
        try {
            const existingCheckpointData = await progressService.getByTourProgressAndCheckpoint(tourProgressId, checkpointId);
            const existingCheckpointProgress = existingCheckpointData.response;

            const audioEl = audioRef.current;
            const totalDurationSecs = audioEl ? Math.ceil(audioEl.duration) : 0;
            const isCompleted = totalDurationSecs > 0 && progressSecs >= totalDurationSecs - 2;

            if (existingCheckpointProgress) {
                if (progressSecs > existingCheckpointProgress.progressSeconds || (isCompleted && !existingCheckpointProgress.isCompleted)) {
                    const progressDataToUpdate = {
                        progressSeconds: progressSecs,
                        isCompleted: existingCheckpointProgress.isCompleted || isCompleted,
                        lastListenedTime: new Date().toISOString()
                    };
                    await progressService.updateCheckpointProgress(existingCheckpointProgress.id, progressDataToUpdate);
                }
            } else {
                const progressDataToCreate = {
                    userTourProgressId: tourProgressId,
                    tourCheckpointId: checkpointId,
                    checkpointAudioId: trackData.id,
                    progressSeconds: progressSecs,
                    isCompleted: isCompleted,
                    lastListenedTime: new Date().toISOString()
                };
                await progressService.createCheckpointProgress(progressDataToCreate);
            }
        } catch (error) {
            console.error("Error in saveTrackProgress:", error);
        }
    }, [user?.id, checkpointId, tourProgressId]);

    useEffect(() => {
        const audioEl = audioRef.current;

        if (!audioEl) return; // Ensure audio element exists

        const handleCanPlay = () => {
            setIsBuffering(false);
        };

        const handlePlaying = () => {
            setIsPlaying(true);
            setIsBuffering(false);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handleTimeUpdate = () => {
            if (audioEl) {
                setCurrentProgress(Math.ceil(audioEl.currentTime));
            }
        };

        const handleEnded = async () => {
            if (user?.id && checkpointId && audioData?.id && tourProgressId) {
                const totalDuration = audioEl ? Math.ceil(audioEl.duration) : 0;
                await saveTrackProgress(totalDuration, audioData);
            }
            setIsPlaying(false);
            setCurrentProgress(0);
        };

        const handleError = (e) => {
            console.error("Error loading audio:", e);
            setIsPlaying(false);
            setIsBuffering(false);
        };

        // Add event listeners
        audioEl.addEventListener("canplay", handleCanPlay);
        audioEl.addEventListener("playing", handlePlaying);
        audioEl.addEventListener("pause", handlePause);
        audioEl.addEventListener("timeupdate", handleTimeUpdate);
        audioEl.addEventListener("ended", handleEnded);
        audioEl.addEventListener("error", handleError);

        // Clean up function
        return () => {
            audioEl.removeEventListener("canplay", handleCanPlay);
            audioEl.removeEventListener("playing", handlePlaying);
            audioEl.removeEventListener("pause", handlePause);
            audioEl.removeEventListener("timeupdate", handleTimeUpdate);
            audioEl.removeEventListener("ended", handleEnded);
            audioEl.removeEventListener("error", handleError);
        };
    }, [audioData, user?.id, checkpointId, tourProgressId, saveTrackProgress]); // Dependencies for useEffect

    useEffect(() => {
        const audioEl = audioRef.current;
        if (audioEl && audioData?.fileUrl) {
            audioEl.src = audioData.fileUrl;
            audioEl.load();
            setIsBuffering(true);
        } else if (audioEl) {
            audioEl.removeAttribute("src");
            setIsBuffering(false);
        }
    }, [audioData?.fileUrl]); // Only re-run when fileUrl changes

    const prepareForTrackChangeOrExit = useCallback(async () => {
        const audioEl = audioRef.current;
        if (audioEl) {
            if (currentProgress > 0 && audioData) {
                await saveTrackProgress(currentProgress, audioData);
            }
            audioEl.pause();
            audioEl.currentTime = 0;
            navigate(
                `/audio-player?checkpointId=${checkpointId}&characterId=${characterId}&tourProgressId=${tourProgressId}&tourId=${tourId}`,
            )
        }
        setCurrentProgress(0);
        setIsPlaying(false);
    }, [currentProgress, audioData, saveTrackProgress, checkpointId, characterId, tourProgressId, tourId, navigate]);

    const togglePlayPause = async () => {
        const audioEl = audioRef.current;
        if (!audioEl || isBuffering) return;
        if (isPlaying) {
            audioEl.pause();
        } else {
            // Attempt to play only if not already playing due to user interaction
            try {
                await audioEl.play();
            } catch (error) {
                console.error("Error attempting to play audio:", error);
                // Handle autoplay policy issues: prompt user for interaction if needed
                alert("Vui lòng tương tác để phát audio. (Trình duyệt chặn tự động phát)");
                setIsPlaying(false);
            }
        }
    };

    const handleNextAudio = async () => {
        await prepareForTrackChangeOrExit();
        const res = await tourService.getNextAudioByCheckpointId(checkpointId);
        if (res.response?.id) {
            const newParams = new URLSearchParams();
            newParams.set("checkpointId", res.response.tourCheckpointId);
            if (characterId) newParams.set("characterId", characterId);
            if (tourProgressId) newParams.set("tourProgressId", tourProgressId);
            if (tourId) newParams.set("tourId", tourId);
            window.location.search = newParams.toString();
        } else {
            console.log("No next audio found or no ID in response.");
        }
    };

    const handlePrevAudio = async () => {
        await prepareForTrackChangeOrExit();
        const res = await tourService.getPrevAudioByCheckpointId(checkpointId);
        if (res.response?.id) {
            const newParams = new URLSearchParams();
            newParams.set("checkpointId", res.response.tourCheckpointId);
            if (characterId) newParams.set("characterId", characterId);
            if (tourProgressId) newParams.set("tourProgressId", tourProgressId);
            if (tourId) newParams.set("tourId", tourId);
            window.location.search = newParams.toString();
        } else {
            console.log("No previous audio found or no ID in response.");
        }
    };

    const handleBack = async () => {
        await prepareForTrackChangeOrExit();
        window.history.back();
    };

    return (
        <div className="audio-player-container">
            <AudioHeader checkpointId={checkpointId} onBackPress={handleBack} onMenuPress={() => {
                if (checkpointId) {
                    const newParams = new URLSearchParams();
                    newParams.set("checkpointId", checkpointId);
                    window.location.href = `/tour_checkpoint_detail?${newParams.toString()}`;
                }
            }} />
            {audioData?.fileUrl && <audio ref={audioRef} src={audioData.fileUrl} />}
            {!audioData ? (
                <div className="loading-audio-message">Loading Audio...</div>
            ) : (
                <div className="audio-player-content">
                    <AudioImage
                        videoUrl={audioData?.videoUrl || ""}
                        imageUrl={audioData?.image || checkpointImage || ""}
                        isPlaying={isPlaying}
                    />
                    <PlayerControls
                        isPlaying={isPlaying}
                        isBuffering={isBuffering}
                        onPlayPause={togglePlayPause}
                        onPrevious={handlePrevAudio}
                        onNext={handleNextAudio}
                    />
                    <Transcript text={audioData?.transcript || ""} />
                </div>
            )}
            {isBuffering && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
});

export default AudioPlayer; // Export the wrapped component