import React, { useState } from 'react';
import AuthLayout from '../layout_user/AuthLayout';
import { FaUser, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // --- SỬA LẦN 1: Điền thẳng link server để tránh lỗi gọi nhầm cổng 3000 ---
      const res = await axiosClient.post('http://127.0.0.1:8000/api/login', { email, password });
      
      // --- SỬA LẦN 2: Bỏ ".data" thừa (Vì axiosClient đã xử lý rồi) ---
      // Code cũ: res.data.access_token -> Code mới: res.access_token
      if (res && res.access_token) {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user));

          // Kiểm tra quyền và chuyển hướng
          if (res.user && res.user.role_id === 1) {
            navigate('/dashboard');
          } else {
            navigate('/dashboard_user'); // Hoặc trang chủ
          }
      } else {
          setErrorMessage('Phản hồi từ server không hợp lệ.');
      }

    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Đăng nhập thất bại.');
      } else {
        setErrorMessage('Lỗi kết nối server (Kiểm tra lại Laravel đang chạy chưa).');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Style (Giữ nguyên như cũ) ---
  const inputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '30px', 
    padding: '10px 15px',
    border: '1px solid #ddd',
    width: '100%', 
    marginBottom: '15px',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    background: 'transparent',
    fontSize: '16px',
    color: '#333'
  };

  return (
    <AuthLayout title="CHÀO MỪNG BẠN TRỞ LẠI" subtitle="Khám phá hương vị Việt Nam">
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        
        {errorMessage && (
          <div className="alert alert-danger text-center p-2 mb-3">
            {errorMessage}
          </div>
        )}

        {/* --- Ô EMAIL --- */}
        <div className="input-group" style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Email</label>
          
          <div style={inputWrapperStyle}>
            <input 
              type="email"
              placeholder="Nhập email đăng ký" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />
            <FaUser style={{ color: '#888' }} />
          </div>
        </div>

        {/* --- Ô MẬT KHẨU --- */}
        <div className="input-group" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Mật khẩu</label>
          
          <div style={inputWrapperStyle}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Nhập mật khẩu" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />
            <span 
              style={{ cursor: 'pointer', color: '#888', display: 'flex' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* --- NÚT ĐĂNG NHẬP --- */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
              width: '100%',
              padding: '12px',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: '#87CEEB', 
              color: '#000',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
          }}
        >
          {loading ? <FaSpinner className="fa-spin" /> : 'ĐĂNG NHẬP'}
        </button>

        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
          <span style={{color: '#888'}}>Bạn chưa có tài khoản? </span>
          <Link to="/register" style={{ color: '#E91E63', textDecoration: 'none', fontWeight: 'bold' }}>Đăng ký tại đây</Link>
          <div style={{ marginTop: '5px' }}>
             <Link to="/forgot-password" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>Quên mật khẩu?</Link>
          </div>
        </div>

      </form>
    </AuthLayout>
  );
};

export default Login;