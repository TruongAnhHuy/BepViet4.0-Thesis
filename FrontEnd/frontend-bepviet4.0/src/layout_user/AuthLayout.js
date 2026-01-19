import React from 'react';
import { FaUtensils } from 'react-icons/fa'; // Icon cái thìa/nĩa
import '../App.css'; // Import CSS đã viết ở trên

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo Icon */}
        <div className="auth-logo">
          <FaUtensils />
        </div>
        
        {/* Tiêu đề */}
        <h2 style={{ margin: '0 0 5px 0', textTransform: 'uppercase' }}>{title}</h2>
        {subtitle && <p style={{ fontSize: '13px', margin: '0 0 20px 0' }}>{subtitle}</p>}

        {/* Nội dung Form (Login hoặc Register) sẽ render ở đây */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;