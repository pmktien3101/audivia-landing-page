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

const RevenueCharts = forwardRef(({ revenueOverTimeData, topToursData }, ref) => {
  const { lineChartRef, barChartRef } = ref || {};
  // Calculate dynamic height: 40px per bar + 50px for top/bottom margins
  const barChartHeight = Math.max(350, (topToursData?.length || 0) * 40 + 50);

  return (
    <>
      <div className="stat-card chart-card">
        <div className="card-title">Doanh thu theo thời gian</div>
        <div className="chart-container" ref={lineChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="groupKey" interval={2} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} name="Doanh thu" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="stat-card chart-card">
        <div className="card-title">Top tour doanh thu</div>
        <div className="chart-container" style={{ height: `${barChartHeight}px` }} ref={barChartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={topToursData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="groupKey"
                width={150}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
});

export default RevenueCharts; 