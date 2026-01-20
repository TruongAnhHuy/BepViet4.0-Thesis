import React, { useState, useEffect } from 'react';
import TopBar from '../layout_admin/TopBar';
import RecipeItem from '../layout_admin/RecipeItem'; 
import { FaSearch } from 'react-icons/fa';
import '../styles/QuanLyCongThuc.css';
import { getRecipes, updateRecipeStatus } from '../services/api';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes()
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,           
          name: item.title,             
          image: item.image_path ? `http://127.0.0.1:8000/storage/${item.image_path}` : "", 
          authors: ["AD"],              
          // --- SỬA DÒNG NÀY ---
      // Nếu Database trả về số (0/1) hoặc chuỗi, hãy map nó ra text hiển thị
      // Ví dụ: Database lưu 0 là đã duyệt, 1 là chờ duyệt
          status: item.status === 1 || item.status === 'approved' ? "Chờ duyệt" : "Đã duyệt"
        }));

        setRecipes(formattedData);         
        setFilteredRecipes(formattedData); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi tải công thức:", error);
        setLoading(false);
      });
  }, []);

// --- HÀM XỬ LÝ KHI ADMIN ĐỔI TRẠNG THÁI ---
  const handleStatusChange = async (id, newStatus) => {
    // 1. Cập nhật giao diện NGAY LẬP TỨC (để người dùng thấy nhanh)
    const updateLocalList = (list) => list.map(recipe => 
        recipe.id === id ? { ...recipe, status: newStatus } : recipe
    );
    setRecipes(prev => updateLocalList(prev));
    setFilteredRecipes(prev => updateLocalList(prev));

    // 2. Gửi lên Server để lưu vĩnh viễn
    try {
        await updateRecipeStatus(id, newStatus);
        console.log("Đã lưu trạng thái vào database thành công!");
    } catch (error) {
        console.error("Lỗi khi lưu trạng thái:", error);
        alert("Lỗi kết nối! Trạng thái chưa được lưu.");
        // (Tùy chọn) Revert lại trạng thái cũ nếu lỗi
    }
}

  // --- HÀM TÌM KIẾM ---
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword); 

    if (keyword === '') {
      setFilteredRecipes(recipes);
    } else {
      const results = recipes.filter((item) => {
        const nameToCheck = item.name ? item.name.toLowerCase() : "";
        const idToCheck = item.id ? item.id.toString() : "";

        return nameToCheck.includes(keyword.toLowerCase()) || 
               idToCheck.includes(keyword);
      });
      setFilteredRecipes(results); 
    }
  };

  return (
    <div className="main-content-wrapper">
        <TopBar title="Quản lý công thức" />

        <div className="page-content">
          
          <div className="search-section">
             <div className="search-container">
                <input 
                    className="search-input"
                    type="text" 
                    placeholder="Tìm kiếm công thức..." 
                    value={searchTerm}
                    onChange={handleSearch} 
                />
                <FaSearch className="search-icon" />
             </div>
          </div>

          <div className="recipe-list">
            
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : filteredRecipes.length > 0 ? (
                filteredRecipes.map((item) => (
                  <RecipeItem 
                    key={item.id} 
                    recipe={item} 
                    onStatusChange={handleStatusChange}
                   />
                ))
            ) : (
                <p className="no-results">Không tìm thấy công thức nào phù hợp.</p>
            )}
            
          </div>

        </div>
    </div>
  );
};

export default RecipeManagement;
