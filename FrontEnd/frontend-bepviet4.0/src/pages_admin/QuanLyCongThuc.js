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
    fetchData();
  }, []);

  const fetchData = () => {
    getRecipes()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.data || []);

        const formattedData = list.map((item) => ({
          id: item.id,          
          name: item.title,             
          image: item.image_path ? `http://127.0.0.1:8000/storage/${item.image_path}` : "", 
          authors: [item.user?.username || "Admin"], 
          
          // Logic hiển thị: 1 là Đã duyệt, 0 là Chờ duyệt
          status: (item.status === 0 || item.status === 'approved') ? "Chờ duyệt" : "Đã duyệt"
        }));

        formattedData.sort((a, b) => a.id - b.id);

        setRecipes(formattedData);         
        setFilteredRecipes(formattedData); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi tải công thức:", error);
        setLoading(false);
      });
  };

  // --- SỬA LẠI HÀM NÀY (QUAN TRỌNG) ---
  const handleStatusChange = async (id, inputStatus) => {
    console.log("Dữ liệu nhận được từ nút bấm:", inputStatus);

    // 1. Xác định chính xác trạng thái số (dbStatus) để lưu vào DB
    // Chấp nhận: số 1, chuỗi "1", chữ "Đã duyệt", chữ "approved" => Đều là 1 (Đã duyệt)
    // Còn lại => 0 (Chờ duyệt)
    let dbStatus = 0;
    if (
        inputStatus === 1 || 
        inputStatus === "1" || 
        inputStatus === "Đã duyệt" || 
        inputStatus === "approved"
    ) {
        dbStatus = 1;
    }

    // 2. Xác định chữ hiển thị trên giao diện (displayStatus)
    const displayStatus = dbStatus === 0 ? "Chờ duyệt" : "Đã duyệt";

    // 3. Cập nhật giao diện NGAY LẬP TỨC
    const updateLocalList = (list) => list.map(recipe => 
        recipe.id === id ? { ...recipe, status: displayStatus } : recipe
    );
    setRecipes(prev => updateLocalList(prev));
    setFilteredRecipes(prev => updateLocalList(prev));

    // 4. Gửi số (0 hoặc 1) lên Server
    try {
        await updateRecipeStatus(id, dbStatus);
        console.log(`✅ Đã lưu vào DB: ID ${id} -> Status ${dbStatus}`);
    } catch (error) {
        console.error("❌ Lỗi lưu DB:", error);
        alert("Lỗi kết nối! Không thể lưu trạng thái.");
        fetchData(); // Load lại dữ liệu gốc nếu lỗi
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