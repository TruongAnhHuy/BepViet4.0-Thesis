// src/pages/QuanLyUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuanLyUser = () => {
    // CẤU HÌNH API URL
    const API_URL = "http://127.0.0.1:8000/api/users";

    // 1. State lưu danh sách user
    const [users, setUsers] = useState([]);

    // 2. State cho Form nhập liệu
    const initialFormState = {
        id: '', 
        username: '', 
        password: '', 
        email: '', 
        status: 'Active', 
        created_at: ''
    };
    const [formData, setFormData] = useState(initialFormState);

    // 3. useEffect để lấy dữ liệu ngay khi vào trang
    useEffect(() => {
        fetchUsers();
    }, []);

    // --- CÁC HÀM GỌI API ---

    // Hàm lấy danh sách User (GET)
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data); 
        } catch (error) {
            console.error("Lỗi khi tải danh sách user:", error);
            // alert("Không thể tải dữ liệu!"); // Tắt alert đỡ phiền nếu chưa bật server
        }
    };

    // Hàm xử lý khi nhập liệu vào Form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // --- [QUAN TRỌNG] Hàm xử lý click vào dòng để sửa ---
    const handleRowClick = (user) => {
        setFormData({
            ...user,
            // Sửa lỗi: Nếu Database trả về số 1, chuyển thành chữ "Active" để khớp với ô Select
            status: user.status === 1 ? 'Active' : 'Banned'
        });
    };

    // Hàm Thêm mới User (POST)
    const handleAdd = async () => {
        if (!formData.username || !formData.password || !formData.email) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        try {
            const { id, created_at, ...dataToSend } = formData; 
            await axios.post(API_URL, dataToSend);
            
            alert("Thêm thành công!");
            fetchUsers(); 
            handleReset(); 
        } catch (error) {
            console.error("Lỗi khi thêm:", error);
            alert("Thêm thất bại!");
        }
    };

    // Hàm Cập nhật User (PUT)
    const handleEdit = async () => {
        if (!formData.id) {
            alert("Vui lòng chọn user cần sửa!");
            return;
        }
        try {
            await axios.put(`${API_URL}/${formData.id}`, formData);
            
            alert("Cập nhật thành công!");
            fetchUsers();
            handleReset();
        } catch (error) {
            console.error("Lỗi khi sửa:", error);
            alert("Cập nhật thất bại!");
        }
    };

    // Hàm Xóa User (DELETE)
    const handleDelete = async () => {
        if (!formData.id) {
            alert("Vui lòng chọn user cần xóa!");
            return;
        }
        if (window.confirm(`Bạn chắc chắn muốn xóa user ${formData.username}?`)) {
            try {
                await axios.delete(`${API_URL}/${formData.id}`);
                
                alert("Xóa thành công!");
                fetchUsers();
                handleReset();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
                alert("Xóa thất bại!");
            }
        }
    };

    // Hàm Reset Form
    const handleReset = () => {
        setFormData(initialFormState);
    };

    return (
        <div className="user-page-container">
            
            {/* --- PHẦN 1: BẢNG DANH SÁCH --- */}
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
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr 
                                        key={user.id} 
                                        onClick={() => handleRowClick(user)}
                                        style={{
                                            cursor: 'pointer', 
                                            backgroundColor: formData.id === user.id ? '#eef2ff' : '' // Đổi màu nhẹ khi đang chọn
                                        }}
                                    >
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        
                                        {/* --- [QUAN TRỌNG] Sửa hiển thị Status --- */}
                                        <td>
                                            <span className={`status-tag ${user.status === 1 ? 'active' : 'banned'}`}>
                                                {user.status === 1 ? 'Active' : 'Banned'}
                                            </span>
                                        </td>

                                        <td>{user.created_at}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Không có dữ liệu hoặc đang tải...</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- PHẦN 2: FORM NHẬP LIỆU --- */}
            <h3 className="section-title">Thông tin user</h3>
            
            <div className="form-section">
                {/* Cột Trái */}
                <div className="form-col">
                    <div className="form-group">
                        <label>User Name</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleInputChange} 
                            placeholder="Nhập tên đăng nhập..." 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" className="form-input read-only" value={formData.id || "Auto-generated"} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="********" 
                        />
                    </div>
                </div>

                {/* Cột Phải */}
                <div className="form-col">
                    <div className="form-group">
                        <label>Status</label>
                        <select 
                            className="form-input" 
                            name="status"
                            value={formData.status} // Value ở đây sẽ là 'Active' hoặc 'Banned' nhờ hàm handleRowClick
                            onChange={handleInputChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Banned">Banned</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="user@example.com" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Created_at</label>
                        <input 
                            type="text" 
                            className="form-input read-only" 
                            value={formData.created_at || ""} 
                            readOnly 
                        />
                    </div>
                </div>
            </div>

            {/* --- PHẦN 3: NÚT CHỨC NĂNG --- */}
            <div className="action-buttons">
                <button className="btn btn-black" onClick={handleAdd}>Thêm</button>
                <button className="btn btn-black" onClick={handleDelete}>Xóa</button>
                <button className="btn btn-black" onClick={handleReset}>Reset</button>
                <button className="btn btn-black" onClick={handleEdit}>Sửa</button>
            </div>

        </div>
    );
};

export default QuanLyUser;