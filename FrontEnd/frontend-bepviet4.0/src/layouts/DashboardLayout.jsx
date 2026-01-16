// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Đảm bảo đường dẫn đúng
import '../App.css'; // Import CSS chung nếu cần

const DashboardLayout = () => {
  return (
    <div className="app-container">
      {/* Sidebar chỉ hiển thị trong layout này */}
      <Sidebar />

      {/* Nội dung bên phải */}
      <div className="content-area" style={{ flex: 1, marginLeft: '260px' }}>
        {/* <Outlet /> là nơi các Route con (Posts, Recipes...) sẽ hiển thị */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;