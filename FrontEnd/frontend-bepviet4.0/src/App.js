// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PostManagement from './pages/QuanLyBaiViet';
import RecipeManagement from './pages/QuanLyCongThuc';
import QuanLyToCao from './pages/QuanLyUserReport';
import QuanLyUser from './pages/QuanLyUser';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar nằm cố định ở đây */}
        <Sidebar />

        {/* Phần bên phải sẽ thay đổi tùy theo Link */}
        <div className="content-area" style={{ flex: 1, marginLeft: '260px' }}>
          <Routes>
            {/* Mặc định vào trang quản lý bài viết hoặc trang chủ tùy bạn */}
            
            
            <Route path="/posts" element={<PostManagement />} />
            <Route path="/recipes" element={<RecipeManagement />} />
            <Route path="/reports" element={<QuanLyToCao />} />
            <Route path="/users" element={<QuanLyUser />} />
            {/* Thêm các Route khác sau này */}
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;