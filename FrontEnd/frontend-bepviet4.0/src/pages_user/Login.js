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
      const response = await axiosClient.post("/login", { email, password });
      
      // --- PHẦN ĐÃ SỬA ---
      // Kiểm tra xem dữ liệu nằm ở 'response' hay 'response.data' (đề phòng interceptor)
      const data = response.data ? response.data : response;
      
      // Kiểm tra kỹ xem có token không
      const token = data.token || data.access_token; 

      if (token) {
        // Lưu token và user vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Điều hướng theo role_id
        if (data.user && data.user.role_id === 1) {
          navigate("/dashboard");
        } else {
          navigate("/dashboard_user"); // Chuyển về trang chủ hoặc profile
        }
      } else {
        // Nếu API trả về 200 nhưng không có token
        setErrorMessage("Đăng nhập thành công nhưng không tìm thấy Token xác thực.");
      }
      // -------------------

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
          <div className="alert alert-danger text-center p-2 mb-3" style={{color: 'red', background: '#ffe6e6', borderRadius: '10px'}}>
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