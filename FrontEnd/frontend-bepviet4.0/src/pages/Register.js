import React, { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  // SỬA 1: Đổi 'name' thành 'username' để khớp với database và Laravel Controller
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    password_confirmation: '' 
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Gọi API Laravel
      // Đảm bảo Laravel đang chạy ở port 8000 (php artisan serve)
      const response = await axios.post('http://localhost:8000/api/register', formData);
      
      console.log(response.data); // Log để kiểm tra kết quả
      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      // Hiển thị lỗi chi tiết từ Backend nếu có (ví dụ: Email trùng, password ngắn...)
      if (error.response && error.response.data) {
        alert('Lỗi: ' + JSON.stringify(error.response.data));
      } else {
        alert('Đăng ký thất bại, vui lòng kiểm tra lại thông tin.');
      }
    }
  };

  return (
    <AuthLayout title="Đăng ký tài khoản">
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label className="input-label">Email</label>
          <div className="input-wrapper">
            <input 
              name="email" 
              type="email" 
              className="custom-input" 
              placeholder="example@gmail.com" 
              onChange={handleChange} 
              required 
            />
            <FaUser className="input-icon" />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Tên đăng nhập</label>
          <div className="input-wrapper">
             {/* SỬA 2: name="username" để khớp với formData và API */}
            <input 
              name="username" 
              className="custom-input" 
              placeholder="Nhập tên tài khoản (không dấu)" 
              onChange={handleChange} 
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
              placeholder="****************" 
              onChange={handleChange} 
              required
            />
            <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Xác nhận mật khẩu</label>
          <div className="input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password_confirmation" 
              className="custom-input" 
              placeholder="****************" 
              onChange={handleChange} 
              required
            />
            <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="auth-btn">Đăng ký ngay</button>

        <div className="auth-link">
          Bạn có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;