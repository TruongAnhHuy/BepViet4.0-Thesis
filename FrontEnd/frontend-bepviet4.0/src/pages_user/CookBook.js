import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getRecipes } from "../services/api";
import "../styles/CookBook.css";

const Cookbook = () => {
  const [cook, setCookBook] = useState([]); // Dữ liệu gốc (Full)
  const [displayCook, setDisplayCook] = useState([]); // Dữ liệu để hiển thị
  const [activeTab, setActiveTab] = useState('all'); // Tab đang chọn
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRecipes();
        
        let fullData = [];
        if (Array.isArray(data)) {
           fullData = data;
        } else if (data.data && Array.isArray(data.data)) {
           fullData = data.data;
        }

        setCookBook(fullData);
        setDisplayCook(fullData); // Mặc định hiện tất cả
      } catch (err) {
        console.error("Lỗi:", err);
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- LOGIC LỌC BÀI VIẾT KHÁC NHAU ---
  const handleTabChange = (tabName) => {
      setActiveTab(tabName);

      if (tabName === 'all') {
          setDisplayCook(cook);
      } 
      else if (tabName === 'popular') {
          const popularData = cook.slice(0, 2); 
          setDisplayCook(popularData);
      } 
      else if (tabName === 'street') {
          const streetData = cook.length > 2 ? cook.slice(3,5) : cook.slice(-2);
          setDisplayCook(streetData);
      }
  };

  if (loading) return <div className="text-center p-5">⏳ Đang tải...</div>;
  if (error) return <div className="text-center p-5 text-red-500">❌ {error}</div>;

  return (
    <div className="cookbook-container">

      <section className="filter-bar">
        <h3>Xu hướng ở Sài Gòn</h3>
        <div className="filter-buttons">
          <button 
            className={activeTab === 'all' ? 'active' : ''} 
            onClick={() => handleTabChange('all')}
          >
            Tất cả
          </button>

          <button 
            className={activeTab === 'popular' ? 'active' : ''} 
            onClick={() => handleTabChange('popular')}
          >
            Phổ biến
          </button>

          <button 
            className={activeTab === 'street' ? 'active' : ''} 
            onClick={() => handleTabChange('street')}
          >
            Đường phố
          </button>
        </div>
      </section>

      <section className="cookbook-grid">
        {displayCook.length > 0 ? (
            displayCook.map((item) => (
            /* THAY ĐỔI QUAN TRỌNG Ở ĐÂY:
               1. Thêm thuộc tính state vào thẻ Link.
               2. Truyền toàn bộ thông tin món ăn (...item) để trang chi tiết hiện ngay không cần chờ load.
               3. Truyền thêm 'from: /cookbook' để nút Quay lại biết đường về.
            */
            <Link 
                to={`/recipes/${item.id}`} 
                state={{ ...item, from: '/cookbook' }} // <--- DÒNG NÀY GIÚP XỬ LÝ NÚT BACK
                key={item.id || item.recipe_id} 
                className="cookbook-card"
            >
              
              <div className="card-image">
                <img 
                  src={item.image_path ? `http://127.0.0.1:8000/storage/${item.image_path}` : "https://via.placeholder.com/300?text=No+Image"} 
                  alt={item.title}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=No+Image"; }}
                />
                <span className="heart-icon">♡</span>
              </div>

              <div className="card-info">
                <h4>{item.title}</h4>
                <p className="meta-time">
                  ⏱ {item.cooking_time ? item.cooking_time + ' phút' : '30 phút'}
                </p>
                <p className="line-clamp-2">
                    {item.description}
                </p>
              </div>

            </Link>
          ))
        ) : (
            <div style={{gridColumn: "1 / -1", textAlign: "center", padding: "40px"}}>
                <p>Không tìm thấy bài viết nào.</p>
            </div>
        )}
      </section>
    </div>
  );
};

export default Cookbook;