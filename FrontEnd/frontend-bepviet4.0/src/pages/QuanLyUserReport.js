import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Lưu ý đường dẫn import
import TopBar from '../components/TopBar';
import { FaUser, FaSearch } from 'react-icons/fa'; // Dùng icon cho giống hình


const QuanLyToCao = () => {
    // Giả lập dữ liệu (Sau này gọi API thay vào đây)
    const [reports] = useState([
        { id: 1, name: "Nguyễn Văn A", reason: "Spam bình luận quảng cáo sai quy định.", status: "Trạng thái tố cáo" },
        { id: 2, name: "Trần Thị B", reason: "Sử dụng ngôn từ đả kích, không phù hợp.", status: "Trạng thái tố cáo" },
    ]);

    return (
        
            <div className="report-page-container">
                
                {/* 1. Thanh tìm kiếm */}
                <div className="search-section">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Tìm kiếm người dùng..." />
                    </div>
                </div>

                {/* 2. Danh sách các card tố cáo */}
                <div className="report-list">
                    {reports.map((item) => (
                        <div key={item.id} className="report-card">
                            
                            {/* Header của Card: Icon + Tên + Badge trạng thái */}
                            <div className="card-header">
                                <div className="user-info-group">
                                    <FaUser className="user-avatar-icon" />
                                    <div className="user-name-box">
                                        <span className="label">Tên người dùng</span>
                                        <div className="value">{item.name}</div>
                                    </div>
                                </div>
                                <div className="status-badge">{item.status}</div>
                            </div>

                            {/* Body của Card: Lý do */}
                            <div className="card-body">
                                <div className="reason-box">
                                    <span className="label-reason">Lý do tố cáo</span>
                                    <div className="reason-content">{item.reason}</div>
                                </div>
                            </div>

                            {/* Footer của Card: Nút bấm */}
                            <div className="card-footer">
                                <button className="btn btn-ban">Cấm</button>
                                <button className="btn btn-reject">Từ chối</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        
    );
};

export default QuanLyToCao;