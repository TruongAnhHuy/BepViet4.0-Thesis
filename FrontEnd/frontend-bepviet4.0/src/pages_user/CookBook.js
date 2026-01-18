import { useEffect, useState } from "react";
import { getCookBook } from "../services/api";
import { getRecipes } from "../services/api";
import "../styles/CookBook.css";

const Cookbook = () => {
  const [cook, setCookBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 2. Gọi hàm getRecipes thay vì getCookBook
        const data = await getRecipes(); 
        
        // Kiểm tra dữ liệu trả về để set state cho đúng
        if (Array.isArray(data)) {
           setCookBook(data);
        } else if (data.data && Array.isArray(data.data)) {
           setCookBook(data.data);
        } else {
           setCookBook([]);
        }
      } catch (err) {
        console.error("Lỗi:", err);
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-5">⏳ Đang tải...</div>;
  if (error) return <div className="text-center p-5 text-red-500">❌ {error}</div>;

  return (
    <div className="cookbook-container">
      {/* --- Phần Hero và Filter giữ nguyên --- */}
      
      <section className="filter-bar">
        <h3>Xu hướng ở Sài Gòn</h3>
        <div className="filter-buttons">
          <button className="active">Tất cả</button>
          <button>Phổ biến</button>
          {/* <button>Đường phố</button> */}
        </div>
      </section>

      {/* --- Phần Hiển thị Danh sách (Đã sửa logic) --- */}
      <section className="cookbook-grid">
        {cook.length > 0 ? (
          cook.map((item) => (
            // 3. Sửa Key: Dùng recipe_id thay vì id
            <div key={item.recipe_id} className="cookbook-card">
              
              {/* Lưu ý: Tạm thời bỏ qua logic 'type' === story nếu DB chưa có cột type.
                  Mặc định hiển thị dạng Recipe cho tất cả. */}
              
              <div className="card-image">
                {/* 4. Sửa đường dẫn ảnh: Copy y hệt từ trang Recipe sang */}
                <img 
                  src={`http://127.0.0.1:8000/storage/${item.image_path}`} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300?text=No+Image"; // Ảnh thay thế nếu lỗi
                  }}
                />
                <span className="heart-icon">♡</span>
              </div>

              <div className="card-info">
                {/* 5. Tên món ăn */}
                <h4>{item.title}</h4>
                
                {/* 6. Thời gian nấu: Dùng cooking_time thay vì time */}
                <p className="meta-time">
                  ⏱ {item.cooking_time ? item.cooking_time + ' phút' : '---'}
                </p>
                
                {/* Thêm mô tả nếu muốn giống trang Recipe */}
                <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                </p>
              </div>

            </div>
          ))
        ) : (
            <p>Chưa có công thức nào.</p>
        )}
      </section>
    </div>
  );
};

export default Cookbook;