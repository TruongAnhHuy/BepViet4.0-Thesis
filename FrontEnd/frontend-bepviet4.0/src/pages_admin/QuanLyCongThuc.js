import React, { useState, useEffect } from 'react';
import TopBar from '../layout_admin/TopBar';
import RecipeItem from '../layout_admin/RecipeItem'; 
import { FaSearch } from 'react-icons/fa';
import { getRecipes } from '../services/api'; 

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes()
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.recipe_id,           
          name: item.title,             
          image: item.image_path ? `http://127.0.0.1:8000/storage/${item.image_path}` : "", 
          authors: ["AD"],              
          status: "Đã duyệt"            
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
  const handleStatusChange = (id, newStatus) => {
    console.log(`Đổi trạng thái món ID: ${id} sang ${newStatus}`);
    
    // 1. Cập nhật trong danh sách gốc (recipes)
    const updatedRecipes = recipes.map(recipe => {
        if (recipe.id === id) {
            return { ...recipe, status: newStatus }; // Thay đổi status
        }
        return recipe;
    });
    setRecipes(updatedRecipes);
    // 2. Cập nhật trong danh sách đang hiển thị (filteredRecipes)
    // Để giao diện người dùng thay đổi màu ngay lập tức
    const updatedFiltered = filteredRecipes.map(recipe => {
        if (recipe.id === id) {
            return { ...recipe, status: newStatus };
        }
        return recipe;
    });
    setFilteredRecipes(updatedFiltered);


  }

  // --- HÀM TÌM KIẾM ĐÃ SỬA LỖI CRASH ---
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword); 

    if (keyword === '') {
      setFilteredRecipes(recipes);
    } else {
      const results = recipes.filter((item) => {
        // Kiểm tra an toàn: Nếu item.name hoặc item.id bị null thì thay bằng chuỗi rỗng ""
        const nameToCheck = item.name ? item.name.toLowerCase() : "";
        const idToCheck = item.id ? item.id.toString() : "";

        return nameToCheck.includes(keyword.toLowerCase()) || 
               idToCheck.includes(keyword);
      });
      setFilteredRecipes(results); 
    }
  };

  return (
    <div className="main-content-wrapper" style={{marginLeft: 0, width: '100%', backgroundColor: '#f5f7fa', minHeight: '100vh'}}>
        <TopBar title="Quản lý công thức" />

        <div className="page-content" style={{padding: '20px 40px'}}>
          
          <div className="search-section" style={{display: 'flex', justifyContent: 'center', marginBottom: '30px'}}>
             <div className="search-container" style={{
                 background: 'white', width: '100%', maxWidth: '800px', 
                 padding: '12px 20px', borderRadius: '50px', display: 'flex', 
                 alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
             }}>
                <input 
                    type="text" 
                    placeholder="Tìm kiếm công thức..." 
                    style={{border: 'none', flex: 1, outline: 'none', fontSize: '14px', color: '#555'}}
                    value={searchTerm}
                    onChange={handleSearch} 
                />
                <FaSearch style={{color: '#999', cursor: 'pointer'}} />
             </div>
          </div>

          <div className="recipe-list" style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
            
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
                <p style={{color: '#888'}}>Không tìm thấy công thức nào phù hợp.</p>
            )}
            
          </div>

        </div>
    </div>
  );
};

export default RecipeManagement;