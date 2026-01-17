import React, { useState } from 'react';
import TopBar from '../layout_admin/TopBar'; // Đảm bảo đường dẫn đúng
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import '../App.css'; // Import file CSS vừa tạo

const SystemSettings = () => {
  // State quản lý dữ liệu form
  const [settings, setSettings] = useState({
    siteName: 'Bếp Việt 4.0',
    postsPerPage: 10,
    notificationEmail: 'admin@bepviet.vn',
    contactPhone: '0901234567',
    copyrightText: '© 2024 Bếp Việt. All rights reserved.',
    maintenanceMode: false,
  });

  // Xử lý thay đổi input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  // Xử lý toggle bảo trì
  const toggleMaintenance = () => {
    setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode });
  };

  // Xử lý lưu
  const handleSave = () => {
    console.log("Dữ liệu cần lưu:", settings);
    alert("Đã lưu cài đặt thành công!");
    // Gọi API lưu xuống DB ở đây
  };

  return (
    <div className="main-content-wrapper" style={{ marginLeft: 0, width: '100%' }}>
      <TopBar title="Cài đặt hệ thống" />

      <div className="page-content" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <div className="settings-container">
            
            {/* --- SECTION 1: THÔNG TIN WEBSITE --- */}
            <div className="settings-section-header">Thông tin website</div>

            {/* Tên Website */}
            <div className="settings-row">
                <div className="settings-label">Tên Website</div>
                <div className="settings-input-col" style={{flex: 1}}>
                    <input 
                        type="text" 
                        name="siteName"
                        className="settings-input"
                        value={settings.siteName} 
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Logo Web */}
            <div className="settings-row">
                <div className="settings-label" style={{height: '100px'}}>LogoWeb</div>
                <div className="settings-input-col">
                    <div className="upload-box">
                        <div className="logo-preview">Logo</div>
                        <button type="button" className="btn-upload">Thay đổi Logo</button>
                    </div>
                </div>
            </div>

            {/* Số bài viết */}
            <div className="settings-row">
                <div className="settings-label">Số bài viết trên mỗi trang</div>
                <div className="settings-input-col">
                    {/* Thêm class w-small để thu nhỏ input */}
                    <input 
                        type="number" 
                        name="postsPerPage"
                        className="settings-input w-small"
value={settings.postsPerPage} 
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Email nhận thông báo */}
            <div className="settings-row">
                <div className="settings-label">Email nhận thông báo</div>
                <div className="settings-input-col" style={{flex: 1}}>
                    <input 
                        type="email" 
                        name="notificationEmail"
                        className="settings-input"
                        value={settings.notificationEmail} 
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* --- SECTION 2: THÔNG TIN FOOTER --- */}
            <div className="settings-section-header" style={{marginTop: '30px'}}>Thông tin Footer</div>

            {/* Số điện thoại */}
            <div className="settings-row">
                <div className="settings-label">Số điện thoại liên hệ</div>
                <div className="settings-input-col" style={{flex: 1}}>
                    {/* Thêm class w-medium để input rộng 50% */}
                    <input 
                        type="text" 
                        name="contactPhone"
                        className="settings-input w-medium"
                        value={settings.contactPhone} 
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Copyright */}
            <div className="settings-row">
                <div className="settings-label">Copyright Text</div>
                <div className="settings-input-col" style={{flex: 1}}>
                    <input 
                        type="text" 
                        name="copyrightText"
                        className="settings-input"
                        value={settings.copyrightText} 
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* --- SECTION 3: BẢO TRÌ --- */}
            <div className="settings-row">
                <div className="settings-label">Chế độ bảo trì</div>
                <div className="settings-input-col">
                    <div className="toggle-icon" onClick={toggleMaintenance}>
                        {settings.maintenanceMode ? 
                            <FaToggleOn color="#333" /> : 
                            <FaToggleOff color="#ccc" />
                        }
                    </div>
                </div>
            </div>

            {/* BUTTON LƯU */}
            <div className="save-btn-wrapper">
                <button className="save-btn" onClick={handleSave}>
                    Lưu cài đặt
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SystemSettings;