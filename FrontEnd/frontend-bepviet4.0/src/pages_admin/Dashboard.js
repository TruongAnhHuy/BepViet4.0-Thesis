import React from 'react';
import TopBar from '../layout_admin/TopBar'; // Đảm bảo đường dẫn đúng
import { FaUsers, FaFileAlt, FaUtensils } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- DỮ LIỆU GIẢ CHO CÁC THẺ THỐNG KÊ (Khớp với hình ảnh) ---
const statsData = [
  {
    id: 1,
    title: "Người dùng",
    count: "1,250",
    icon: <FaUsers />,
    color: "#e67e22" // Màu icon
  },
  {
    id: 2,
    title: "Bài viết",
    count: "450",
    icon: <FaFileAlt />,
    color: "#2ecc71"
  },
  {
    id: 3,
    title: "Công thức",
    count: "89",
    icon: <FaUtensils />,
    color: "#3498db"
  }
];

// --- DỮ LIỆU GIẢ CHO BIỂU ĐỒ TRÒN (5 Thành phần ẩm thực) ---
const culinaryData = [
  { name: 'Món Khai Vị', value: 15 },
  { name: 'Món Chính', value: 45 },
  { name: 'Món Tráng Miệng', value: 20 },
  { name: 'Đồ Uống', value: 10 },
  { name: 'Ăn Vặt', value: 10 },
];

// Màu sắc cho từng phần của biểu đồ
const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#8884d8'];

const Dashboard = () => {
  return (
    <div className="main-content-wrapper" style={{marginLeft: 0, width: '100%'}}>
        {/* Top Bar */}
        <TopBar title="Tổng quan hệ thống" />

        {/* Nội dung chính */}
        <div className="page-content">
          
          {/* 1. Phần Thống Kê (3 Thẻ) */}
          <div className="dashboard-stats">
            {statsData.map((item) => (
              <div key={item.id} className="stat-card">
                <div className="stat-info">
                  <span className="stat-title">{item.title}</span>
                  <h3 className="stat-count">{item.count}</h3>
                </div>
                <div className="stat-icon" style={{ color: item.color }}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* 2. Phần Biểu Đồ */}
          <div className="chart-section">
            <h3 className="chart-title">Thống kê danh mục ẩm thực</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={culinaryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {culinaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
</ResponsiveContainer>
            </div>
            <p className="chart-note">Biểu đồ phân bố tỉ lệ các loại công thức trên hệ thống</p>
          </div>

        </div>
    </div>
  );
};

export default Dashboard;