import React, { useState, useEffect } from 'react';
import Sidebar from '../layout_admin/Sidebar';
import PostItem from '../layout_admin/PostItem'; 
import { FaSearch } from 'react-icons/fa';
// Bạn cần đảm bảo đã viết hàm getPosts trong api.js
import { getPosts, updatePostStatus } from '../services/api';
import '../styles/QuanLyBaiViet.css';

const PostManagement = () => {
  // Thay dữ liệu giả bằng State rỗng ban đầu
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Chạy hàm này ngay khi vào trang để lấy dữ liệu thật
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      
      // --- THÊM DÒNG LOG NÀY ĐỂ DEBUG ---
      console.log("Dữ liệu API trả về:", response); 

      // --- SỬA LẠI ĐOẠN LẤY DATA CHO ĐÚNG AXIOS ---
      // Kiểm tra kỹ cấu trúc: 
      // 1. response.data: Dữ liệu body từ server
      // 2. response.data.data: Mảng bài viết (do Laravel trả về key 'data')
      const rawData = response.data?.data || response.data || [];
      
      // Nếu log ra thấy array rỗng, kiểm tra lại database
      if (!Array.isArray(rawData)) {
          console.error("Dữ liệu nhận được không phải là mảng:", rawData);
          setPosts([]);
          return;
      }

      const formattedData = rawData.map(dbItem => ({
        id: dbItem.id,
        title: dbItem.title,
        description: dbItem.content || "Chưa có mô tả...",
        image: dbItem.image_path 
            ? `http://127.0.0.1:8000/storage/${dbItem.image_path}` 
            : "https://via.placeholder.com/150", 
        time: dbItem.created_at ? new Date(dbItem.created_at).toLocaleDateString('vi-VN') : "Vừa xong",
        views: dbItem.views || 0,
        
        status: (Number(dbItem.status) === 1) ? "ĐÃ ĐĂNG" : "CHỜ DUYỆT"
      }));

      // Sắp xếp bài mới nhất lên đầu
      formattedData.sort((a, b) => a.id - b.id);

      setPosts(formattedData);
      setFilteredPosts(formattedData); // Quan trọng: Phải set cả cái này
    } catch (error) {
      console.error("Lỗi tải bài viết:", error);
    } finally {
      setLoading(false);
    }
  }

// --- HÀM TÌM KIẾM (SEARCH) ---
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword); // Cập nhật giá trị trong ô input

    if (keyword === '') {
        // Nếu ô tìm kiếm rỗng, hiển thị lại toàn bộ danh sách gốc
        setFilteredPosts(posts);
    } else {
        // Lọc dữ liệu
        const results = posts.filter(post => {
            // 1. Chuyển tiêu đề về chữ thường để tìm không phân biệt hoa/thường
            const titleMatch = post.title.toLowerCase().includes(keyword.toLowerCase());
            
            // 2. Cho phép tìm theo cả ID (Chuyển ID sang chuỗi để so sánh)
            const idMatch = post.id.toString().includes(keyword);

            // Trả về kết quả nếu trùng Tiêu đề HOẶC trùng ID
            return titleMatch || idMatch;
        });
        
        setFilteredPosts(results);
    }
  };
  
  // --- HÀM XỬ LÝ KHI ADMIN ĐỔI TRẠNG THÁI ---
  const handleStatusChange = async (id, newStatusText) => {
    // --- SỬA LOGIC TẠI ĐÂY ---
    // Yêu cầu: Đã đăng là 0, Chờ duyệt là 1
    
    // Nếu chọn "ĐÃ ĐĂNG" -> Gửi số 0
    // Ngược lại (Chọn "CHỜ DUYỆT") -> Gửi số 1
    const dbStatus = newStatusText === 'ĐÃ ĐĂNG' ? 1 : 0;

    // Cập nhật giao diện ngay lập tức (Optimistic UI)
    const updateLocalList = (list) => list.map(post => 
        post.id === id ? { ...post, status: newStatusText } : post
    );
    setPosts(prev => updateLocalList(prev));
    setFilteredPosts(prev => updateLocalList(prev));

    try {
        // Gửi số (0 hoặc 1) lên Server
        await updatePostStatus(id, dbStatus); 
        console.log(`Đã cập nhật bài ${id} thành trạng thái ${dbStatus}`);
    } catch (error) {
        console.error("Lỗi khi lưu vào DB:", error);
        alert("Cập nhật thất bại, vui lòng thử lại!");
        fetchData(); 
    }
  }

    
 return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        
        {/* Thanh tìm kiếm */}
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết..." 
            className="search-input" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <h2 className="page-title">Danh sách bài viết</h2>

        {/* Danh sách bài viết */}
        <div className="post-list">
          {loading ? (
             <p style={{textAlign: 'center', color: '#888'}}>Đang tải dữ liệu từ Database...</p>
          ) : filteredPosts.length > 0 ? (
             filteredPosts.map(post => (
                <PostItem 
                    key={post.id} 
                    post={post} 
                    onStatusChange={handleStatusChange} 
                />
             ))
          ) : (
             <p style={{textAlign: 'center', color: '#888'}}>Không tìm thấy bài viết nào.</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default PostManagement;

