import './style.css';
import "../../../layouts/AdminLayout/style.css"
import React, { useState, useEffect } from 'react';
import AdminHeader from "../components/AdminHeader";
import { MdDownload } from 'react-icons/md';
import RevenueCharts from './components/RevenueCharts';
import TourCharts from './components/TourCharts';
import UserCharts from './components/UserCharts';
import SocialMediaCharts from './components/SocialMediaCharts';
import statisticsService from '../../../services/statistics';
import { FaUsers, FaBoxOpen, FaChartLine, FaClipboardList } from 'react-icons/fa';

const AdminDashboard = () => {
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [groupBy, setGroupBy] = useState('day');

    // Summary data
    const [totalTours, setTotalTours] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);


    // Chart data
    const [revenueOverTimeData, setRevenueOverTimeData] = useState([]);
    const [topToursData, setTopToursData] = useState([]);
    const [avgRatingData, setAvgRatingData] = useState([]);
    const [tourCategoryData, setTourCategoryData] = useState([]);
    const [ageDistributionData, setAgeDistributionData] = useState([]);
    const [newUsersOverTimeData, setNewUsersOverTimeData] = useState([]);
    const [postsOverTimeData, setPostsOverTimeData] = useState([]);
    const [postsByAgeGroupData, setPostsByAgeGroupData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!startDate || !endDate) return;

            // Chart data
            const revenueData = await statisticsService.revenueStat(startDate, endDate, groupBy);
            console.log(revenueData);
            setRevenueOverTimeData(revenueData.items);

            const topTours = await statisticsService.revenueStat(startDate, endDate, 'tour', 10);
            setTopToursData(topTours.items);

            const avgRating = await statisticsService.tourStat('rating_group', startDate, endDate);
            setAvgRatingData(avgRating.items);

            const tourCategory = await statisticsService.tourStat('tour_type', startDate, endDate);
            setTourCategoryData(tourCategory.items);

            const ageDistribution = await statisticsService.userStat('total_by_age', startDate, endDate, 'user_age_group');
            setAgeDistributionData(ageDistribution.items);

            const newUsersOverTime = await statisticsService.userStat('new_users', startDate, endDate, groupBy);
            setNewUsersOverTimeData(newUsersOverTime.items);

            const postsOverTime = await statisticsService.postStat(startDate, endDate, groupBy);
            setPostsOverTimeData(postsOverTime.items);

            const postsByAgeGroup = await statisticsService.postStat(startDate, endDate, 'user_age_group');
            setPostsByAgeGroupData(postsByAgeGroup.items);
        };

        fetchData();
    }, [startDate, endDate, groupBy]);


    return (
        <>
            <AdminHeader />
            <div className="header-contain">
                <h1 className="main-title"><span className="overview-text">Tổng Quan</span></h1>
                <div className="date-pickers">
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
                        <option value="day">Ngày</option>
                        <option value="month">Tháng</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                <button className="table-btn export-btn hehe">
                    <span className="btn-icon"><MdDownload /></span>
                    <span className="btn-text">Xuất dữ liệu</span>
                </button>
            </div>
            <div className="stats-grid">
                <div className="stat-card balance-card">
                    <div className="card-icon"><FaBoxOpen /></div>
                    <div className="card-info">
                        <div className="card-title">Tổng số tour</div>
                        <div className="card-value">{totalTours}</div>
                    </div>
                </div>

                <div className="stat-card activity-card">
                    <div className="card-icon"><FaClipboardList /></div>
                    <div className="card-info">
                        <div className="card-title">Tổng hoá đơn</div>
                        <div className="card-value">{totalBookings}</div>
                    </div>
                </div>

                <div className="stat-card my-card">
                    <div className="card-icon"><FaChartLine /></div>
                    <div className="card-info">
                        <div className="card-title">Tổng doanh thu</div>
                        <div className="card-value">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}</div>
                    </div>
                </div>

                <div className="stat-card invoice-summary-card">
                    <div className="card-icon"><FaUsers /></div>
                    <div className="card-info">
                        <div className="card-title">Tổng số người dùng</div>
                        <div className="card-value">{totalUsers}</div>
                    </div>
                </div>

                <RevenueCharts
                    revenueOverTimeData={revenueOverTimeData}
                    topToursData={topToursData}
                />
                <TourCharts
                    avgRatingData={avgRatingData}
                    tourCategoryData={tourCategoryData}
                />
                <UserCharts
                    // ageDistributionData={ageDistributionData}
                    newUsersOverTimeData={newUsersOverTimeData}
                />
                <SocialMediaCharts
                    postsOverTimeData={postsOverTimeData}
                // postsByAgeGroupData={postsByAgeGroupData}
                />
            </div>
        </>
    )
}

export default AdminDashboard;
