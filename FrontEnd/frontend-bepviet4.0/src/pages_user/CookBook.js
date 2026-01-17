import { useEffect, useState } from "react";
import { getRecipes } from "../services/api";

const Cookbook = () => {
  // Mock data mô phỏng dữ liệu từ Laravel API trả về
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Gỏi Cuốn (Summer Rolls)', time: '30 mins', image: 'url_to_goi_cuon', type: 'recipe' },
    { id: 2, title: 'Bánh Mì Patê', time: '15 mins', image: 'url_to_banh_mi', type: 'recipe' },
    { id: 3, title: 'Bánh Xèo (Sizzling Pancake)', time: '45 mins', image: 'url_to_banh_xeo', type: 'recipe' },
    { id: 4, title: 'Câu chuyện Nước Mắm', desc: 'Nước mắm là linh hồn...', type: 'story' }, // Card đặc biệt
    { id: 5, title: 'Cà Phê Trứng', time: '10 mins', image: 'url_to_cafe', type: 'recipe' },
    { id: 6, title: 'Phở Bò', time: '2 hours', image: 'url_to_pho', type: 'recipe' },
  ]);

  return (
    <div className="cookbook-container">
      {/* 1. Hero Section: Banner nổi bật giống Bún Chả Hanoi */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="badge">CÔNG THỨC CỦA HÔM NAY</span>
          <h1>Bún Chả Hanoi</h1>
          <p>
            Bún chả là sự kết hợp hài hòa giữa thịt nướng tẩm ướp đậm đà, 
            bún tươi và nước chấm chua ngọt. Một hương vị của thủ đô.
          </p>
          <button className="btn-primary">Nấu ngay &rarr;</button>
        </div>
        <div className="hero-image">
          {/* Thay bằng thẻ <img /> thực tế của bạn */}
          <div className="img-placeholder">Ảnh Bún Chả To</div> 
        </div>
      </section>

      {/* 2. Filter Section: Thanh lọc danh mục */}
      <section className="filter-bar">
        <h3>Xu hướng ở Sài Gòn</h3>
        <div className="filter-buttons">
          <button className="active">Tất cả</button>
          <button>Phổ biến</button>
          <button>Đường phố</button>
          <button>Khai vị</button>
        </div>
      </section>

      {/* 3. Grid Section: Danh sách món ăn */}
      <section className="recipe-grid">
        {recipes.map((item) => (
          <div key={item.id} className={`recipe-card ${item.type === 'story' ? 'story-card' : ''}`}>
            
            {item.type === 'recipe' ? (
              <>
                <div className="card-image">
                  {/* <img src={item.image} alt={item.title} /> */}
                  <div className="img-placeholder-small">Ảnh Món</div>
                  <span className="heart-icon">♡</span>
                </div>
                <div className="card-info">
                  <h4>{item.title}</h4>
                  <p className="meta-time">⏱ {item.time}</p>
                </div>
              </>
            ) : (
              /* Layout cho thẻ "Story" (như thẻ Nước mắm/Phở) */
              <div className="story-content">
                <span className="icon-brand">♨</span>
                <h4>"{item.title}"</h4>
                <p>{item.desc}</p>
                <a href="#">ĐỌC CÂU CHUYỆN</a>
              </div>
            )}
            
          </div>
        ))}
      </section>
      
    </div>
  );
};

export default Cookbook;