import React, { useState } from 'react';
import Sidebar from '../layout_admin/Sidebar'; 
import TopBar from '../layout_admin/TopBar';
import axiosClient from '../api/axiosClient'; 
import { FaUser, FaSearch } from 'react-icons/fa';

const QuanLyToCao = () => {
    // Dữ liệu giả lập
    const [reports, setReports] = useState([
        { id: 101, user_id: 2, name: "Kukulele", reason: "Spam bình luận quảng cáo sai quy định.", status: "Chờ xử lý" },
        { id: 102, user_id: 3, name: "Ngoc", reason: "Sử dụng ngôn từ đả kích, không phù hợp.", status: "Chờ xử lý" },
    ]);

    // 1. THÊM STATE TÌM KIẾM
    const [searchTerm, setSearchTerm] = useState('');

    const handleBan = async (reportId, userId) => {
        if (!window.confirm("Bạn có chắc chắn muốn KHÓA tài khoản này không?")) return;
        try {
            await axiosClient.put(`/users/${userId}/status`, { status: 0 });
            alert("Đã khóa tài khoản thành công!");
            setReports(reports.filter(item => item.id !== reportId));
        } catch (error) {
            console.error("Lỗi khi khóa user:", error);
            alert("Lỗi kết nối server (hoặc User ID không tồn tại trong DB thật).");
        }
    };

    const handleReject = (reportId) => {
        if (!window.confirm("Bạn muốn từ chối tố cáo này?")) return;
        setReports(reports.filter(item => item.id !== reportId));
    };

    // 2. LOGIC LỌC DỮ LIỆU (SEARCH)
    // Nếu searchTerm rỗng -> lấy hết. Nếu có chữ -> lọc theo tên (không phân biệt hoa thường)
    const filteredReports = reports.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="report-page-container">
            {/* Thanh tìm kiếm */}
            <div className="search-section">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm người dùng..." 
                        // 3. GẮN SỰ KIỆN NHẬP LIỆU
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Danh sách tố cáo */}
            <div className="report-list">
                {/* 4. SỬA 'reports.map' THÀNH 'filteredReports.map' */}
                {filteredReports.length > 0 ? (
                    filteredReports.map((item) => (
                        <div key={item.id} className="report-card">
                            
                            <div className="card-header">
                                <div className="user-info-group">
                                    <FaUser className="user-avatar-icon" />
                                    <div className="user-name-box">
                                        <span className="label">Người bị tố cáo</span>
                                        <div className="value">{item.name}</div>
                                    </div>
                                </div>
                                <div className="status-badge">{item.status}</div>
                            </div>

                            <div className="card-body">
                                <div className="reason-box">
                                    <span className="label-reason">Lý do tố cáo</span>
                                    <div className="reason-content">{item.reason}</div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button 
                                    className="btn btn-ban"
                                    onClick={() => handleBan(item.id, item.user_id)}
                                >
                                    Cấm (Khóa User)
                                </button>
                                
                                <button 
                                    className="btn btn-reject"
                                    onClick={() => handleReject(item.id)}
                                >
                                    Từ chối
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center', marginTop: '20px', color: '#999'}}>
                        Không tìm thấy kết quả nào phù hợp.
                    </p>
                )}
            </div>
        </div>
    );
};

export default QuanLyToCao;