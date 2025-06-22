import React, { forwardRef } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const UserCharts = forwardRef(({ ageDistributionData, newUsersOverTimeData }, ref) => {
  const { lineChartRef } = ref || {};
  return (
    <>
      {/* <div className="stat-card chart-card">
        <div className="card-title">Phân bố độ tuổi người dùng</div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="groupKey" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Số lượng" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}
      <div className="stat-card chart-card">
        <div className="card-title">Người dùng mới theo thời gian</div>
        <div className="chart-container" ref={lineChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={newUsersOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="groupKey" interval={2} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" name="Người dùng mới" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
});

export default UserCharts; 