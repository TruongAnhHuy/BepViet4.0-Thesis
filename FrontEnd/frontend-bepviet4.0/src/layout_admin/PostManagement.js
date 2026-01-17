import React from 'react';
import Sidebar from '../layout_admin/Sidebar';
import PostItem from '../layout_admin/PostItem';
import { FaSearch } from 'react-icons/fa';

// Dữ liệu giả lập (Mock Data)
const posts = [
  {
    id: 1,
    title: "Bí quyết nấu phở truyền thống",
    description: "Khám phá những bí mật đằng sau nước dùng trong vắt và thơm lừng từ các đầu bếp nổi tiếng tại Hà Nội...",
    image: "https://via.placeholder.com/150", // Thay bằng link ảnh thật
    time: "2 giờ trước",
    views: "1.2k",
    status: "ĐÃ ĐĂNG"
  },
  {
    id: 2,
    title: "10 loại gia vị không thể thiếu",
    description: "Gia vị là linh hồn của món ăn. Cùng điểm qua danh sách 10 loại gia vị cơ bản mà mọi gian bếp hiện đại cần có...",
    image: "https://via.placeholder.com/150",
    time: "Hôm qua",
    views: "850",
    status: "CHỜ DUYỆT"
  },
  {
    id: 3,
    title: "Chế độ ăn Clean Eating",
    description: "Làm thế nào để bắt đầu lối sống lành mạnh với Clean Eating? Những nguyên tắc vàng và gợi ý thực đơn...",
    image: "https://via.placeholder.com/150",
    time: "3 ngày trước",
    views: "2.4k",
    status: "CHỜ DUYỆT"
  }
];

const PostManagement = () => {
  return (
    <div className="app-container">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung chính bên phải */}
      <div className="main-content">
        
        {/* Thanh tìm kiếm */}
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Tìm kiếm bài viết..." className="search-input" />
        </div>

        <h2 className="page-title">Danh sách bài viết</h2>

        {/* Danh sách bài viết */}
        <div className="post-list">
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostManagement;