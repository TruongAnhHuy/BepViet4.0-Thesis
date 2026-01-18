import React from 'react';
import Sidebar from '../components/Sidebar'; // Lưu ý đường dẫn import
import TopBar from '../components/TopBar';
import RecipeItem from '../components/RecipeItem';
import { FaSearch } from 'react-icons/fa';

// --- BẠN ĐANG THIẾU ĐOẠN DỮ LIỆU NÀY ---
const recipes = [
  {
    id: "001",
    name: "Phở Bò Truyền Thống",
    image: "https://via.placeholder.com/600x200", 
    authors: ["AD", "CH"],
    status: "Đã duyệt"
  },
  {
    id: "002",
    name: "Bánh Mì Hội An",
    image: "https://via.placeholder.com/600x200",
    authors: ["US"],
    status: "Đang chờ"
  },
  {
    id: "003",
    name: "Bún Chả Hà Nội",
    image: "https://via.placeholder.com/600x200",
    authors: ["?"],
    status: "Đang chờ"
  }
];
// ----------------------------------------

const RecipeManagement = () => {
  return (
    <div className="main-content-wrapper" style={{marginLeft: 0, width: '100%'}}>
        {/* Top Bar */}
        <TopBar title="Quản lý công thức" />

        {/* Nội dung chính */}
        <div className="page-content">
          
          {/* Search Bar */}
          <div className="search-container-center">
            <input type="text" placeholder="Tìm kiếm công thức..." />
            <FaSearch className="search-icon-right" />
          </div>

          {/* Danh sách Recipe */}
          <div className="recipe-list">
            {/* Lỗi xảy ra ở đây do biến recipes chưa được khai báo bên trên */}
            {recipes.map((item, index) => (
              <RecipeItem key={index} recipe={item} />
            ))}
          </div>

        </div>
    </div>
  );
};

export default RecipeManagement;