import React, { useEffect, useState } from 'react'
import HistoryTourList from './HistoryTourList/HistoryTourList'
import userService from '../../../services/user'
import './style.css'
import TransactionService from '../../../services/transaction'

const HistoryTour = () => {
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    const fetchCurrentUser = async () => {
        try {
            const result = await userService.getCurrentUser()
            if (result) {
                setUser(result)
            }
        } catch (error) {
            console.error('Lỗi lấy thông tin người dùng:', error)
            setError('Không thể lấy thông tin người dùng')
            setLoading(false)
        }
    }

    const fetchHistoryTours = async () => {
        if (!user?.id) return

        try {
            setLoading(true)
            setError(null)
            const response = await TransactionService.getHistoryTransactionByUserId(user.id)
            console.log(response);
            
            if (response) {
                setTours(response)
            } else {
                setTours([])
            }
        } catch (error) {
            console.error('Lỗi lấy lịch sử tour:', error)
            setError('Không thể tải lịch sử tour. Vui lòng thử lại.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchHistoryTours()
        }
    }, [user])

    return (
        <div className="history-tour-container">
            <div className="history-tour-content">
                <HistoryTourList 
                    tours={tours}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    )
}

export default HistoryTour