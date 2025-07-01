"use client"

import { useEffect, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import tourService from "../../../services/tour"
import useUser from "../../../hooks/useUser"
import progressService from "../../../services/progress"
import HistoryTransaction from "../../../services/historyTransaction"
import "./style.css"

const COLORS = {
    primary: "#6366f1",
    purpleGradient: "#8b5cf6",
    green: "#10b981",
    grey: "#6b7280",
    background: "#f8fafc",
    white: "#ffffff",
    text: "#1f2937",
    textSecondary: "#6b7280",
}

export default function TourAudio() {
    const navigate = useNavigate()
    const { id: tourId } = useParams()

    const [tour, setTour] = useState(null)
    const user = useUser()
    const [characterId, setCharacterId] = useState(null)
    const [tourProgress, setTourProgress] = useState(null)
    const [audioDurations, setAudioDurations] = useState({})

    const fetchTourDetails = useCallback(async () => {
        if (tourId) {
            try {
                const response = await tourService.getTourById(tourId)
                setTour(response)
            } catch (error) {
                console.error("Error fetching tour details:", error)
            }
        }
    }, [tourId])

    const fetchUserPurchaseInfo = useCallback(async () => {
        if (user?.userId && tourId) {
            try {
                const response = await HistoryTransaction.checkUserPurchasedTour(user.userId, tourId)
                console.log("user purchased tour: ", response)
                setCharacterId(response.audioCharacterId)
            } catch (error) {
                console.error("Error fetching purchase info:", error)
            }
        }
    }, [user?.userId, tourId])

    const fetchCurrentTourProgress = useCallback(async () => {
        if (!user?.userId || !tourId) return
        try {
            const progress = await progressService.getTourProgress(user.userId, tourId)
            console.log("Current progress: ", progress)
            setTourProgress(progress.response)
        } catch (error) {
            console.error("Error fetching tour progress:", error)
        }
    }, [user?.userId, tourId])

    useEffect(() => {
        fetchTourDetails()
    }, [tourId])

    useEffect(() => {
        if (user?.userId) {
            fetchUserPurchaseInfo()
            fetchCurrentTourProgress()
        }
    }, [user?.userId])

    // Fetch audio durations from file metadata
    useEffect(() => {
        const fetchAudioDurationsFromFile = async () => {
            if (!tour?.checkpoints || !characterId || tour.checkpoints.length === 0) {
                setAudioDurations({})
                return
            }

            const newDurations = {}
            for (const checkpoint of tour.checkpoints) {
                try {
                    const audioInfoResponse = await tourService.getTourAudioByCheckpointId(checkpoint.id, characterId)
                    if (audioInfoResponse.response?.fileUrl) {
                        const audio = new Audio(audioInfoResponse.response.fileUrl)
                        audio.crossOrigin = "anonymous"

                        await new Promise((resolve) => {
                            audio.addEventListener("loadedmetadata", () => {
                                if (audio.duration && !isNaN(audio.duration)) {
                                    newDurations[checkpoint.id] = Math.round(audio.duration)
                                } else {
                                    newDurations[checkpoint.id] = 0
                                }
                                resolve()
                            })
                            audio.addEventListener("error", () => {
                                newDurations[checkpoint.id] = 0
                                resolve()
                            })
                            audio.load()
                        })
                    } else {
                        newDurations[checkpoint.id] = 0
                    }
                } catch (error) {
                    console.error(`Error fetching or processing audio for checkpoint ${checkpoint.id}:`, error)
                    newDurations[checkpoint.id] = 0
                }
            }
            setAudioDurations(newDurations)
        }

        if (tour?.checkpoints && characterId) {
            fetchAudioDurationsFromFile()
        }
    }, [tour, characterId])

    const handleBack = () => {
        navigate(-1)
    }

    const handleViewMap = () => {
        if (tour?.id) {
            if (tour.useCustomMap) {
                navigate(`/tour-custom-map?tourId=${tour.id}`)
            } else {
                navigate(`/tour-map?tourId=${tour.id}`)
            }
        }
    }

    const handleAudioPlay = async (checkpointId) => {
        if (!characterId) {
            console.error("No character ID found. Please select a character first.")
            alert("Vui lòng chọn nhân vật trước khi nghe audio.")
            return
        }
        if (!tourProgress?.id) {
            console.error("No tour progress found.")
            alert("Không tìm thấy tiến trình tour.")
            return
        }

        try {
            await progressService.updateTourProgress(tourProgress.id, {
                currentCheckpointId: checkpointId,
            })
            await fetchCurrentTourProgress()
            navigate(
                `/audio-player?checkpointId=${checkpointId}&characterId=${characterId}&tourProgressId=${tourProgress.id}`,
            )
        } catch (error) {
            console.error("Error updating tour progress:", error)
            alert("Có lỗi xảy ra khi cập nhật tiến trình.")
        }
    }

    const handleEndTour = () => {
        navigate(`/review/${tourId}`)
    }

    const getCheckpointStatus = (checkpointId) => {
        const totalDuration = audioDurations[checkpointId] || 0
        if (!tourProgress) return { status: "pending", progress: 0, total: totalDuration }

        const checkpointProgress = tourProgress.checkpointProgress?.find((cp) => cp.tourCheckpointId === checkpointId)

        if (checkpointProgress?.isCompleted) {
            return {
                status: "completed",
                progress: checkpointProgress.progressSeconds,
                total: totalDuration || checkpointProgress.progressSeconds,
            }
        }

        if (tourProgress.currentCheckpointId === checkpointId) {
            return {
                status: "current",
                progress: checkpointProgress?.progressSeconds || 0,
                total: totalDuration,
            }
        }

        return {
            status: "pending",
            progress: checkpointProgress?.progressSeconds || 0,
            total: totalDuration,
        }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    const checkAndUpdateTourCompletion = useCallback(async () => {
        if (!tourProgress || !tour?.checkpoints || !tour.checkpoints.length) return

        const allCheckpointsCompleted = tour.checkpoints.every((checkpoint) => {
            const cpProgress = tourProgress.checkpointProgress?.find((cp) => cp.tourCheckpointId === checkpoint.id)
            return cpProgress?.isCompleted
        })

        if (allCheckpointsCompleted && !tourProgress.isCompleted) {
            try {
                console.log("All checkpoints completed. Marking tour as completed.")
                await progressService.updateTourProgress(tourProgress.id, {
                    isCompleted: true,
                    finishedAt: new Date().toISOString(),
                })
                await fetchCurrentTourProgress()
            } catch (error) {
                console.error("Error updating tour completion status:", error)
            }
        }
    }, [tourProgress, tour?.checkpoints, fetchCurrentTourProgress])

    useEffect(() => {
        if (tourProgress && tour?.checkpoints && tour.checkpoints.length > 0) {
            checkAndUpdateTourCompletion()
        }
    }, [tourProgress, tour?.checkpoints, checkAndUpdateTourCompletion])

    if (!tour) {
        return (
            <div className="tour-audio-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Đang tải thông tin tour...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="tour-audio-container">
            {/* Header */}
            <div className="header-container">
                {tour?.thumbnailUrl && (
                    <img
                        src={tour.thumbnailUrl || "/placeholder.svg"}
                        alt={tour.title || "Tour image"}
                        className="header-image"
                    />
                )}
                <div className="header-overlay" />
            </div>

            {/* Back Button */}
            <button className="back-button" onClick={handleBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="scroll-content">
                {/* Tour Title */}
                <div className="title-container">
                    <h1 className="title">{tour?.title}</h1>
                    {tourProgress?.isCompleted && (
                        <div className="completed-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22,4 12,14.01 9,11.01" />
                            </svg>
                            <span className="completed-text">Đã hoàn thành</span>
                        </div>
                    )}
                </div>

                {/* Tour Stops */}
                <div className="stops-container">
                    <div className="section-header">
                        <h2 className="section-title">Các trạm</h2>
                        <button className="view-all-button" onClick={handleViewMap}>
                            <span className="view-all-text">Xem bản đồ</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                <line x1="8" y1="2" x2="8" y2="18" />
                                <line x1="16" y1="6" x2="16" y2="22" />
                            </svg>
                        </button>
                    </div>

                    {tour?.checkpoints
                        ?.sort((a, b) => a.order - b.order)
                        .map((stop) => {
                            const { status, progress, total } = getCheckpointStatus(stop.id)
                            return (
                                <button key={stop.id} className="stop-item" onClick={() => handleAudioPlay(stop.id)}>
                                    <div className={`stop-number stop-${status}`}>
                                        {status === "completed" && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20,6 9,17 4,12" />
                                            </svg>
                                        )}
                                        {status === "current" && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                        {status === "pending" && <span className="stop-order">{stop.order}</span>}
                                    </div>
                                    <div className="stop-info">
                                        <h3 className="stop-title">{stop.title}</h3>
                                        {(status !== "pending" || progress > 0) && total > 0 && (
                                            <p className="progress-text">
                                                {status === "completed"
                                                    ? "Đã hoàn thành"
                                                    : `Đã nghe: ${formatTime(progress)} / ${formatTime(total)}`}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            )
                        })}
                </div>

                <button className="end-tour-button" onClick={handleEndTour}>
                    <span>Kết thúc</span>
                </button>

                {/* Bottom spacing for fixed details panel */}
                <div className="bottom-spacing" />
            </div>

            {/* Fixed Experience Details */}
            <div className="fixed-details-container">
                <div className="details-header">
                    <h3 className="details-title">Kinh nghiệm thực tế</h3>
                </div>

                <div className="details-grid">
                    <div className="detail-item">
                        <svg
                            className="detail-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                        </svg>
                        <div>
                            <p className="detail-label">Tổng thời gian</p>
                            <p className="detail-value">{tour?.duration} giờ</p>
                        </div>
                    </div>

                    <div className="detail-item">
                        <svg
                            className="detail-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                        <div>
                            <p className="detail-label">Thời gian tuyệt nhất</p>
                            <p className="detail-value">Buổi sáng</p>
                        </div>
                    </div>

                    <div className="detail-item">
                        <svg
                            className="detail-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <div>
                            <p className="detail-label">Độ khó</p>
                            <p className="detail-value">Dễ</p>
                        </div>
                    </div>

                    <div className="detail-item">
                        <svg
                            className="detail-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <div>
                            <p className="detail-label">Giá</p>
                            <p className="detail-value">{tour?.price?.toLocaleString("vi-VN")} VND</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
