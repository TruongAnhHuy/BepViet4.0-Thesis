// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout'; // Import layout vừa tạo
import PostManagement from './pages/QuanLyBaiViet';
import RecipeManagement from './pages/QuanLyCongThuc';
import Login from './pages/Login';
import Register from './pages/Register';
import SystemSettings from './pages/SystemSettings';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- NHÓM 1: CÁC TRANG KHÔNG CÓ SIDEBAR (Auth) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- NHÓM 2: CÁC TRANG CÓ SIDEBAR (Dashboard) --- */}
        {/* Dùng DashboardLayout làm cha, các trang con sẽ hiện vào vị trí <Outlet /> */}
        <Route element={<DashboardLayout />}>
          {/* Khi vào đường dẫn gốc "/", chuyển hướng ngay vào /posts hoặc /login tùy bạn */}
          <Route path="/" element={<Navigate to="/posts" />} />
          
          <Route path="/posts" element={<PostManagement />} />
          <Route path="/recipes" element={<RecipeManagement />} />
          <Route path="/settings" element={<SystemSettings />} />
          {/* Trang 404 cho phần admin */}
          <Route path="*" element={<h2>Trang chưa phát triển</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;