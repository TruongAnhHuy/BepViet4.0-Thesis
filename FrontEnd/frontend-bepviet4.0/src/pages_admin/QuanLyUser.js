// src/pages/QuanLyUser.js
import React, { useState } from 'react';
import Sidebar from '../layout_admin/Sidebar'; // Lưu ý đường dẫn import
import TopBar from '../layout_admin/TopBar';
const QuanLyUser = () => {
    // 1. Dữ liệu giả lập cho bảng danh sách
    const [users] = useState([
        { id: 1, username: "NguyenVanA", email: "a@gmail.com", status: "Active", created_at: "12/01/2026" },
        { id: 2, username: "TranThiB", email: "b@gmail.com", status: "Banned", created_at: "10/01/2026" },
        { id: 3, username: "LeVanC", email: "c@gmail.com", status: "Active", created_at: "05/01/2026" },
    ]);

    // 2. State cho Form nhập liệu
    const [formData, setFormData] = useState({
        id: '', username: '', password: '', email: '', status: 'Active', created_at: ''
    });

    return (
        
            <div className="user-page-container">
                
                {/* --- PHẦN 1: BẢNG DANH SÁCH (KHUNG XÁM TRÊN) --- */}
                <div className="table-section">
                    <div className="table-wrapper">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`status-tag ${user.status.toLowerCase()}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>{user.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- PHẦN 2: FORM NHẬP LIỆU (KHUNG DƯỚI) --- */}
                <h3 className="section-title">Thông tin user</h3>
                
                <div className="form-section">
                    {/* Cột Trái */}
                    <div className="form-col">
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" className="form-input" placeholder="Nhập tên đăng nhập..." />
                        </div>
                        
                        <div className="form-group">
                            <label>ID</label>
                            <input type="text" className="form-input read-only" value="Auto-generated" readOnly />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-input" placeholder="********" />
                        </div>
                    </div>

                    {/* Cột Phải */}
                    <div className="form-col">
                        <div className="form-group">
                            <label>Status</label>
                            <select className="form-input">
                                <option value="Active">Active</option>
                                <option value="Banned">Banned</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-input" placeholder="user@example.com" />
                        </div>

                        <div className="form-group">
                            <label>Created_at</label>
                            <input type="text" className="form-input read-only" value="16/01/2026" readOnly />
                        </div>
                    </div>
                </div>

                {/* --- PHẦN 3: NÚT CHỨC NĂNG --- */}
                <div className="action-buttons">
                    <button className="btn btn-black">Thêm</button>
                    <button className="btn btn-black">Xóa</button>
                    <button className="btn btn-black">Reset</button>
                    <button className="btn btn-black">Sửa</button>
                </div>

            </div>
    );
};

export default QuanLyUser;