import React, { forwardRef } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SocialMediaCharts = forwardRef(({ postsOverTimeData, postsByAgeGroupData }, ref) => {
  const { lineChartRef } = ref || {};
  return (
    <>
      <div className="stat-card chart-card">
        <div className="card-title">Bài đăng/ảnh theo thời gian</div>
        <div className="chart-container" ref={lineChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={postsOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="groupKey" angle={0} interval={2} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#ffc658" name="Số lượng" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* <div className="stat-card chart-card">
        <div className="card-title">Bài đăng/ảnh theo nhóm tuổi</div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postsByAgeGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="groupKey" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Số lượng" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}
    </>
  );
});

export default SocialMediaCharts; 