import React, { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook để chuyển trang

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gọi API Laravel
      const res = await axios.post('http://localhost:8000/api/login', { 
        email: email, 
        password: password 
      });

      // 1. Lưu Token và thông tin User vào LocalStorage
      // Backend trả về: { access_token, user: { user_id, username, role_id, avatar, ... } }
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Đăng nhập thành công!');

      // 2. Kiểm tra Role_ID để chuyển hướng (Dựa trên SQL: 1=Admin, 2=User)
      const roleId = res.data.user.role_id;
      
      if (roleId === 1) {
        navigate('/admin/dashboard'); // Trang dành cho Admin
      } else {
        navigate('/'); // Trang chủ dành cho User
      }

    } catch (error) {
      console.error(error);
      // Xử lý thông báo lỗi từ Backend (ví dụ: Sai pass hoặc Tài khoản bị khóa status=0)
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Đăng nhập thất bại');
      } else {
        alert('Lỗi kết nối server!');
      }
    }
  };

  return (
    <AuthLayout 
      title="Chào mừng bạn trở lại" 
      subtitle="Khám phá hương vị Việt Nam"
    >
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label className="input-label">Email</label>
          <div className="input-wrapper">
            <input 
              type="email"
              name="email"
              className="custom-input" 
              placeholder="Nhập email đăng ký" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="input-icon" />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Mật khẩu</label>
          <div className="input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              className="custom-input" 
              placeholder="Nhập mật khẩu" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="auth-btn">Đăng nhập</button>

        <div className="auth-link" style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <span>Bạn chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link></span>
          <Link to="/forgot-password" style={{color: '#666', fontStyle: 'normal'}}>Quên mật khẩu?</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;