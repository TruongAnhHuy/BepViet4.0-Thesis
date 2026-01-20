// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Bỏ useNavigate đi, chỉ cần Link
import { FaHome, FaUser, FaFileAlt, FaUtensils, FaCogs, FaExclamationTriangle, FaList, FaSignOutAlt } from 'react-icons/fa';
import '../App.css';

const Sidebar = () => {
  const location = useLocation(); 

  // Hàm kiểm tra xem menu nào đang active
  const isActive = (path) => location.pathname === path ? 'active' : '';

  // Hàm này chỉ cần làm nhiệm vụ xóa Token (việc chuyển hướng để thẻ Link lo)
  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  };

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
        <Link to="/dashboard" className="link-style">
            <li className={isActive('/dashboard')}><FaHome className="icon" /> Trang chủ</li>
        </Link>
        
        <Link to="/users" className="link-style">
            <li className={isActive('/users')}><FaUser className="icon" /> Quản lý User</li>
        </Link>

        <Link to="/posts" className="link-style">
            <li className={isActive('/posts')}><FaFileAlt className="icon" /> Quản lý bài viết</li>
        </Link>

        <Link to="/recipes_admin" className="link-style">
            <li className={isActive('/recipes_admin')}><FaUtensils className="icon" /> Quản lý công thức</li>
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

      {/* --- PHẦN ĐĂNG XUẤT (DÙNG LINK) --- */}
      <div className="logout-btn">
        <Link 
            to="/login"           // 1. Chuyển hướng về Login
            replace={true}        // 2. QUAN TRỌNG: Chặn nút Back (xóa lịch sử)
            onClick={handleLogout} // 3. Xóa Token trước khi đi
            className="logout-link" 
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <FaSignOutAlt className="icon" /> Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;