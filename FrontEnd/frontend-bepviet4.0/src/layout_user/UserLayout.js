// src/layout_user/UserLayout.js
import React from 'react';
import Header from "./header"; // Import từ cùng thư mục layout_user
import Footer from "./footer";
import Slide from "./slide";

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <Header />
      
      
      {/* Đây là nơi nội dung của từng trang (Home, Blog...) sẽ hiện ra */}
      <div className="user-container">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;