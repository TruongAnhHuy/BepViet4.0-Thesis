import React, { useState } from 'react';
import AuthLayout from '../layout_user/AuthLayout';
import { FaUser, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    password_confirmation: '' 
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await axiosClient.post('/register', formData);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');

    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 422 && error.response.data.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat().join('\n');
            setErrorMessage(validationErrors);
        } else {
            setErrorMessage(error.response.data.message || 'Đăng ký thất bại.');
        }
      } else {
        setErrorMessage('Lỗi kết nối server, vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- STYLE GIỐNG FILE LOGIN ---
  const inputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '30px', 
    padding: '10px 15px',
    border: '1px solid #ddd',
    width: '100%',         // Ép chiều rộng 100%
    marginBottom: '15px',
    boxSizing: 'border-box'
  };

  const inputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',        // Input chiếm hết chỗ trống
    background: 'transparent',
    fontSize: '16px',
    color: '#333'
  };

  const labelStyle = {
    display: 'block', 
    marginBottom: '5px', 
    fontWeight: 'bold', 
    fontSize: '14px'
  };

  return (
    <AuthLayout title="ĐĂNG KÝ TÀI KHOẢN">
      <form onSubmit={handleRegister} style={{ width: '100%' }}>
        
        {/* Hiển thị lỗi */}
        {errorMessage && (
          <div className="alert alert-danger text-center p-2 mb-3" style={{ fontSize: '0.9rem', color: '#721c24', backgroundColor: '#f8d7da', borderRadius: '5px', border: '1px solid #f5c6cb', whiteSpace: 'pre-line' }}>
            {errorMessage}
          </div>
        )}

        {/* INPUT 1: EMAIL */}
        <div className="input-group" style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Email</label>
          <div style={inputWrapperStyle}>
            <input 
              name="email" 
              type="email" 
              placeholder="example@gmail.com" 
              onChange={handleChange} 
              required 
              disabled={loading}
              style={inputStyle}
            />
            <FaUser style={{ color: '#888' }} />
          </div>
        </div>

        {/* INPUT 2: USERNAME */}
        <div className="input-group" style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Tên đăng nhập</label>
          <div style={inputWrapperStyle}>
            <input 
              name="username" 
              placeholder="Nhập tên tài khoản (không dấu)" 
              onChange={handleChange} 
              required 
              disabled={loading}
              style={inputStyle}
            />
            <FaUser style={{ color: '#888' }} />
          </div>
        </div>

        {/* INPUT 3: PASSWORD */}
        <div className="input-group" style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Mật khẩu</label>
          <div style={inputWrapperStyle}>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="****************" 
              onChange={handleChange} 
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

        {/* INPUT 4: CONFIRM PASSWORD */}
        <div className="input-group" style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Xác nhận mật khẩu</label>
          <div style={inputWrapperStyle}>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password_confirmation" 
              placeholder="****************" 
              onChange={handleChange} 
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

        {/* NÚT ĐĂNG KÝ */}
        <button 
            type="submit" 
            disabled={loading}
            style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '30px',
                border: 'none',
                backgroundColor: '#87CEEB', // Màu xanh nhạt đồng bộ Login
                color: '#000',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
            }}
        >
          {loading ? (
            <>
              <FaSpinner className="fa-spin" /> Đang xử lý...
            </>
          ) : (
            'ĐĂNG KÝ NGAY'
          )}
        </button>

        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
          <span style={{color: '#888'}}>Bạn có tài khoản? </span>
          <Link to="/login" style={{ color: '#E91E63', textDecoration: 'none', fontWeight: 'bold' }}>Đăng nhập tại đây</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;