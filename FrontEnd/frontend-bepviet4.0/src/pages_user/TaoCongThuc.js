import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/TaoCongThuc.css";

const TaoCongThuc = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cooking_time: ''
    // Không cần set status ở đây, ta sẽ xử lý lúc submit
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.cooking_time) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    setIsLoading(true);

    try {
      // --- CHỈNH SỬA QUAN TRỌNG DỰA TRÊN DATABASE CỦA BẠN ---
      
      // Giả sử người dùng đang đăng nhập có ID là 1.
      // Sau này bạn cần thay số 1 này bằng ID lấy từ localStorage hoặc Context
      const currentUserId = 1; 

      const payload = {
        title: formData.title,
        description: formData.description,
        cooking_time: parseInt(formData.cooking_time, 10), // Chuyển sang số nguyên
        user_id: currentUserId, // Bắt buộc phải có vì Database yêu cầu
        status: 0, // Database dùng số 0 cho trạng thái chờ duyệt (thay vì 'pending')
        image_path: null // Hiện tại chưa có ảnh, gửi null
      };

      // Gọi API (Đảm bảo backend của bạn map đúng các trường này vào câu lệnh INSERT SQL)
      const response = await axios.post('http://localhost:8000/api/recipes', payload);

      if (response.status === 200 || response.status === 201) {
        alert("🎉 Đã lưu công thức thành công!");
        navigate('/create_recipes'); 
      }
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("❌ Có lỗi xảy ra. Kiểm tra lại Backend hoặc Database.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-recipe-container">
      <h2>Tạo Công Thức Mới</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label>Tên món ăn:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Thời gian nấu (phút):</label>
          <input type="number" name="cooking_time" value={formData.cooking_time} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mô tả:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required ></textarea>
        </div>

        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? "Đang lưu..." : "Lưu Công Thức"}
        </button>
      </form>
    </div>
  );
}

export default TaoCongThuc;