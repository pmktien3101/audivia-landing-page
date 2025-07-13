import './style.css';
import "../../../layouts/AdminLayout/style.css"
import React, { useState, useEffect, useRef } from 'react';
import AdminHeader from "../components/AdminHeader";
import RevenueCharts from './components/RevenueCharts';
import TourCharts from './components/TourCharts';
import UserCharts from './components/UserCharts';
import SocialMediaCharts from './components/SocialMediaCharts';
import TopPurchasedTours from './components/TopPurchasedTours';
import statisticsService from '../../../services/statistics';
import { FaUsers, FaBoxOpen, FaChartLine, FaClipboardList } from 'react-icons/fa';
import ExportReport from '../components/ExportReport/ExportReport'
import html2canvas from 'html2canvas';

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
    const [topPurchasedToursData, setTopPurchasedToursData] = useState([]);
    const [avgRatingData, setAvgRatingData] = useState([]);
    const [tourCategoryData, setTourCategoryData] = useState([]);
    const [ageDistributionData, setAgeDistributionData] = useState([]);
    const [newUsersOverTimeData, setNewUsersOverTimeData] = useState([]);
    const [postsOverTimeData, setPostsOverTimeData] = useState([]);
    const [postsByAgeGroupData, setPostsByAgeGroupData] = useState([]);

    // Chart refs
    const revenueLineChartRef = useRef();
    const revenueBarChartRef = useRef();
    const tourBarChartRef = useRef();
    const tourPieChartRef = useRef();
    const userLineChartRef = useRef();
    const socialLineChartRef = useRef();

    // Chart images state
    const [chartImages, setChartImages] = useState([]);

    // Tự động click export khi chartImages thay đổi
    useEffect(() => {
        if (chartImages.length > 0) {
            document.getElementById('real-export-btn')?.click();
        }
    }, [chartImages]);

    useEffect(() => {
        const fetchData = async () => {
            if (!startDate || !endDate) return;

            // Chart data
            const revenueData = await statisticsService.revenueStat(startDate, endDate, groupBy);
            setRevenueOverTimeData(revenueData.items);
            setTotalRevenue(revenueData.totalRevenue);
            setTotalBookings(revenueData.totalBookings);

            const topTours = await statisticsService.revenueStat(startDate, endDate, 'tour', 10);
            setTopToursData(topTours.items);

            const topPurchasedTours = await statisticsService.topPurchasedTours(10, startDate, endDate);
            setTopPurchasedToursData(topPurchasedTours);

            const avgRating = await statisticsService.tourStat('rating_group', startDate, endDate);
            setAvgRatingData(avgRating.items);

            const tourCategory = await statisticsService.tourStat('tour_type', startDate, endDate);
            setTourCategoryData(tourCategory.items);
            setTotalTours(tourCategory.totalTours);

            const ageDistribution = await statisticsService.userStat('total_by_age', startDate, endDate, 'user_age_group');
            setAgeDistributionData(ageDistribution.items);

            const newUsersOverTime = await statisticsService.userStat('new_users', startDate, endDate, groupBy);
            setNewUsersOverTimeData(newUsersOverTime.items);
            setTotalUsers(newUsersOverTime.totalUsers);

            const postsOverTime = await statisticsService.postStat(startDate, endDate, groupBy);
            setPostsOverTimeData(postsOverTime.items);

            const postsByAgeGroup = await statisticsService.postStat(startDate, endDate, 'user_age_group');
            setPostsByAgeGroupData(postsByAgeGroup.items);
        };

        fetchData();
    }, [startDate, endDate, groupBy]);

    // Export handler
    const handleExport = async () => {
        const chartImagesArr = [];
        if (revenueLineChartRef.current) {
            const canvas = await html2canvas(revenueLineChartRef.current);
            chartImagesArr.push({
                sheetName: 'Doanh thu theo thời gian',
                image: canvas.toDataURL('image/png'),
                title: 'Biểu đồ Doanh thu theo thời gian'
            });
        }
        if (revenueBarChartRef.current) {
            const canvas = await html2canvas(revenueBarChartRef.current);
            chartImagesArr.push({
                sheetName: 'Top tour doanh thu',
                image: canvas.toDataURL('image/png'),
                title: 'Biểu đồ Top tour doanh thu'
            });
        }
        if (tourBarChartRef.current) {
            const canvas = await html2canvas(tourBarChartRef.current);
            chartImagesArr.push({
                sheetName: 'Rating trung bình của tour',
                image: canvas.toDataURL('image/png'),
                title: 'Biểu đồ Rating trung bình của tour'
            });
        }
        if (tourPieChartRef.current) {
            const canvas = await html2canvas(tourPieChartRef.current);
            chartImagesArr.push({
                sheetName: 'Phân loại tour',
                image: canvas.toDataURL('image/png'),
                title: 'Biểu đồ Phân loại tour'
            });
        }
        if (userLineChartRef.current) {
            const canvas = await html2canvas(userLineChartRef.current);
            chartImagesArr.push({
                sheetName: 'Người dùng mới theo thời gian',
                image: canvas.toDataURL('image/png'),
                title: 'Biểu đồ Người dùng mới theo thời gian'
            });
        }
        if (socialLineChartRef.current) {
            const canvas = await html2canvas(socialLineChartRef.current);
            chartImagesArr.push({
                sheetName: 'Bài đăng/ảnh theo thời gian',
                image: canvas.toDataURL('image/png'),
                title: 'Biểu đồ Bài đăng/ảnh theo thời gian'
            });
        }
        setChartImages(chartImagesArr);
    };

    return (
        <>
            <AdminHeader />
            <div className="header-contain">
                <h1 className="main-title"><span className="overview-text">Tổng Quan</span></h1>
                <div className="date-pickers">
                    <div className="filter-group">
                        <label htmlFor="start-date">Từ ngày</label>
                        <input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="end-date">Đến ngày</label>
                        <input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <div className="filter-group select-wrapper">
                        <label htmlFor="group-by">Nhóm theo</label>
                        <select id="group-by" value={groupBy} onChange={e => setGroupBy(e.target.value)}>
                            <option value="day">Ngày</option>
                            <option value="month">Tháng</option>
                            <option value="year">Năm</option>
                        </select>
                    </div>
                </div>
                <button className="table-btn export-btn hehe" onClick={handleExport} style={{ marginRight: 8 }}>
                    <span className="btn-icon"><FaClipboardList /></span>
                    <span className="btn-text">Xuất dữ liệu</span>
                </button>
                <ExportReport
                    overviewData={{
                        'Tổng số tour': totalTours,
                        'Tổng hoá đơn': totalBookings,
                        'Tổng doanh thu': totalRevenue,
                        'Tổng số người dùng': totalUsers
                    }}
                    sheetsData={[
                        { sheetName: "Doanh Thu Theo Thời Gian", data: revenueOverTimeData },
                        { sheetName: "Tour Hàng Đầu", data: topToursData },
                        { sheetName: "Tour Được Mua Nhiều Nhất", data: topPurchasedToursData },
                        { sheetName: "Đánh Giá Trung Bình Tour", data: avgRatingData },
                        { sheetName: "Tour Theo Thể Loại", data: tourCategoryData },
                        // { sheetName: "Phân Bố Tuổi", data: ageDistributionData },
                        { sheetName: "Người Dùng Mới Theo Thời Gian", data: newUsersOverTimeData },
                        { sheetName: "Bài Đăng Theo Thời Gian", data: postsOverTimeData },
                        // { sheetName: "Bài Đăng Theo Nhóm Tuổi", data: postsByAgeGroupData },
                    ]}
                    chartImages={chartImages}
                    fileName="BaoCaoQuanLy"
                    buttonProps={{ id: 'real-export-btn', style: { display: 'none' } }}
                />
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
                        <div className="card-title">Tổng số lượt mua</div>
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
                    ref={{ lineChartRef: revenueLineChartRef, barChartRef: revenueBarChartRef }}
                    revenueOverTimeData={revenueOverTimeData}
                    topToursData={topToursData}
                />
                <TourCharts
                    ref={{ barChartRef: tourBarChartRef, pieChartRef: tourPieChartRef }}
                    avgRatingData={avgRatingData}
                    tourCategoryData={tourCategoryData}
                />
                <UserCharts
                    ref={{ lineChartRef: userLineChartRef }}
                    newUsersOverTimeData={newUsersOverTimeData}
                />
                <SocialMediaCharts
                    ref={{ lineChartRef: socialLineChartRef }}
                    postsOverTimeData={postsOverTimeData}
                />
            </div>
            
            <TopPurchasedTours topPurchasedToursData={topPurchasedToursData} />
        </>
    )
}

export default AdminDashboard;
