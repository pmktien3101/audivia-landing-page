import {
    FiSearch,
    FiCheck,
  } from "react-icons/fi"

  import { IoTrendingUp } from "react-icons/io5"
  import './style.css';
  import "../../../layouts/AdminLayout/style.css"
  import AdminHeader from "../components/AdminHeader";
  
  const AdminDashboard = () => {
    const balanceBars = [
      { height: "40%", color: "#6366f1" },
      { height: "70%", color: "#6366f1" },
      { height: "50%", color: "#6366f1" },
      { height: "80%", color: "#6366f1" },
    ]
  
    const activityChartPoints = "M0 60 L20 40 L40 50 L60 20 L80 30 L100 10 L120 45 L140 30 L160 55 L180 25" // Example SVG path data
  
    return (
      <div className="dashboard">
  
        {/* Main Content */}
        <div className="main-content">

          <AdminHeader/>
  
          <h1 className="main-title">Hi Robert, <span className="overview-text">Overview</span></h1>
  
          <div className="stats-grid">
            <div className="stat-card balance-card">
              <div className="card-title">Balance</div>
              <div className="balance-amount">$ 54321.65</div>
              <div className="balance-change">
                <IoTrendingUp size={16} />
                +15%
              </div>
              <div className="balance-chart">
                {balanceBars.map((bar, index) => (
                  <div key={index} className="balance-bar" style={{ height: bar.height, backgroundColor: bar.color }}></div>
                ))}
              </div>
            </div>
  
            <div className="stat-card activity-card">
              <div className="card-title">Latest Activity</div>
              <div className="activity-chart">
                <svg viewBox="0 0 200 80">
                  <path d={activityChartPoints} fill="none" stroke="#6366f1" strokeWidth="3" />
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${activityChartPoints} L180 80 L0 80 Z`} fill="url(#chartGradient)" />
                </svg>
              </div>
              <div className="activity-info">
                <span>75%</span>
              </div>
              <div className="search-box-bottom">
                <input type="text" className="search-input-bottom" placeholder="Search" />
                <FiSearch className="search-icon-bottom" size={18} />
              </div>
            </div>
  
            <div className="stat-card my-card">
              <div className="card-title">My Card</div>
              <div className="card-number">1234 5678 9101 1123</div>
              <div className="card-holder">Robert Downey</div>
            </div>
  
            <div className="stat-card invoice-summary-card">
              <div className="card-title">Total Invoice</div>
              <div className="invoice-value">520 <span className="invoice-change-positive">+12%</span></div>
            </div>
  
            <div className="stat-card invoice-summary-card">
              <div className="card-title">Paid Invoice</div>
              <div className="invoice-value">210 <span className="invoice-badge blue">85% <IoTrendingUp size={12} /></span></div>
            </div>
  
            <div className="stat-card invoice-summary-card">
              <div className="card-title">Unpaid Invoice</div>
              <div className="invoice-value">65 <span className="invoice-badge red">15% <IoTrendingUp size={12} /></span></div>
            </div>
  
            <div className="stat-card invoice-summary-card">
              <div className="card-title">Invoice Sent</div>
              <div className="invoice-value">120 <span className="invoice-badge yellow"><FiCheck size={12} /></span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default AdminDashboard
  