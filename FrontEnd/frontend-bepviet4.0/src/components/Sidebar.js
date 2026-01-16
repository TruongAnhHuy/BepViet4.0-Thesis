// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import thêm cái này
import { FaHome, FaUser, FaFileAlt, FaUtensils, FaCogs, FaExclamationTriangle, FaList, FaSignOutAlt } from 'react-icons/fa';
import '../App.css';

const Sidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Hàm kiểm tra xem menu nào đang active
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">B</div>
        <h2 className="brand-name">BẾP VIỆT 4.0</h2>
      </div>

      <div className="user-info">
        <img src="https://via.placeholder.com/50" alt="Avatar" className="avatar" />
        <div className="user-text">
          <p>Xin chào,</p>
          <strong>Quản trị viên</strong>
        </div>
      </div>

      <ul className="menu-list">
        <Link to="/" className="link-style">
            <li className={isActive('/')}><FaHome className="icon" /> Trang chủ</li>
        </Link>
        
        <Link to="/users" className="link-style">
            <li className={isActive('/users')}><FaUser className="icon" /> Quản lý User</li>
        </Link>

        <Link to="/posts" className="link-style">
            <li className={isActive('/posts')}><FaFileAlt className="icon" /> Quản lý bài viết</li>
        </Link>

        <Link to="/recipes" className="link-style">
            <li className={isActive('/recipes')}><FaUtensils className="icon" /> Quản lý công thức</li>
        </Link>

        <Link to="/settings" className="link-style">
            <li className={isActive('/settings')}><FaCogs className="icon" /> Quản lý hệ thống</li>
        </Link>
      
        <Link to="/reports" className="link-style">
            <li className={isActive('/reports')}><FaExclamationTriangle className="icon" /> Quản lý tố cáo</li>
        </Link>


        <Link to="/category" className="link-style">
            <li className={isActive('/category')}><FaList className="icon" /> Quản lý danh mục</li>
        </Link>
      </ul>

      <div className="logout-btn">
        <FaSignOutAlt className="icon" /> Đăng xuất
      </div>
    </div>
  );
};

export default Sidebar;