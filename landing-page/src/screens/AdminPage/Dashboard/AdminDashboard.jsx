  import './style.css';
  import "../../../layouts/AdminLayout/style.css"
  import AdminHeader from "../components/AdminHeader";
  import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

  const AdminDashboard = () => {
   
    // Sample data for pie chart (tour distribution)
    const tourData = [
      { name: 'Tour A', value: 400 },
      { name: 'Tour B', value: 300 },
      { name: 'Tour C', value: 300 },
      { name: 'Tour D', value: 200 },
    ];

    // Sample data for bar chart (monthly registrations)
    const monthlyData = [
      { month: 'Jan', users: 65 },
      { month: 'Feb', users: 59 },
      { month: 'Mar', users: 80 },
      { month: 'Apr', users: 81 },
      { month: 'May', users: 56 },
      { month: 'Jun', users: 55 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <div className="dashboard">
  
        {/* Main Content */}
        <div className="main-content">

          <AdminHeader/>
  
          <h1 className="main-title"><span className="overview-text">Tổng Quan</span></h1>
  
          <div className="stats-grid">
            <div className="stat-card balance-card">
              <div className="card-title">Tổng số tour</div>
            </div>
  
            <div className="stat-card activity-card">
              <div className="card-title">Tổng hoá đơn</div>
             
            </div>
  
            <div className="stat-card my-card">
              <div className="card-title">Tổng doanh thu</div>
            </div>
  
            <div className="stat-card invoice-summary-card">
              <div className="card-title">Tổng số người dùng</div>
            </div>
  

            <div className="stat-card chart-card">
              <div className="card-title">Phân bố người dùng theo tour</div>
              <div className="chart-container">
                <PieChart width={350} height={350}>
                  <Pie
                    data={tourData}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {tourData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>

            <div className="stat-card chart-card">
              <div className="card-title">Đăng ký người dùng hàng tháng</div>
              <div className="chart-container">
                <BarChart width={300} height={300} data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#6366f1" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default AdminDashboard
  