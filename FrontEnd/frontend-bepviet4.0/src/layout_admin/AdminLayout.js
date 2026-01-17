import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar cùng thư mục
import TopBar from './TopBar';   // Import TopBar cùng thư mục
import '../App.css'; // Import CSS chung (hoặc tạo file css riêng)

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            {/* Cột trái: Sidebar cố định */}
            <div className="admin-sidebar">
                <Sidebar />
            </div>

            {/* Cột phải: TopBar + Nội dung thay đổi */}
            <div className="admin-main">
                {/* TopBar nằm trên cùng của phần nội dung */}
                
                
                {/* Khu vực hiển thị nội dung của từng trang (Dashboard, Users,...) */}
                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;