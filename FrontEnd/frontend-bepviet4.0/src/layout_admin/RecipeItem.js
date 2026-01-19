import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';

// Thêm prop: onStatusChange để gửi dữ liệu về trang cha
const RecipeItem = ({ recipe, onStatusChange }) => {
  
  // Xác định màu sắc dựa trên trạng thái hiện tại
  // status: 1 (Đã duyệt), 0 (Chưa duyệt)
  const isApproved = recipe.status === 1; 
  const currentColor = isApproved ? "#00c07f" : "#fca130"; 
  
  return (
    <div className="recipe-card" style={{
        background: 'white', width: '100%', maxWidth: '800px', 
        borderRadius: '8px', padding: '20px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative'
    }}>
      
      {/* Header */}
      <div className="card-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px'}}>
        <div className="header-info">
            <span style={{fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginBottom: '4px'}}>
                RECIPE ID: {recipe.id}
            </span>
            <h3 style={{margin: 0, fontSize: '18px', color: '#333'}}>{recipe.name}</h3>
        </div>
        <button style={{background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '16px'}}>
            <FaEllipsisV />
        </button>
      </div>

      {/* Hình ảnh */}
      <div className="card-image-area" style={{
          width: '100%', height: '180px', borderRadius: '6px', 
          backgroundColor: '#6c757d', overflow: 'hidden', marginBottom: '15px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
      }}>
        {recipe.image ? (
            <img 
                src={recipe.image} 
                alt={recipe.name} 
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                onError={(e) => {
                    e.target.style.display='none'; 
                    if(e.target.nextSibling) e.target.nextSibling.style.display = 'block'; 
                }} 
            />
        ) : null}
        <span className="fallback-text" style={{
            display: recipe.image ? 'none' : 'block', 
            color: 'rgba(255,255,255,0.7)', fontSize: '14px', position: 'absolute'
        }}>
            Bản xem trước hình ảnh
        </span>
      </div>

      {/* Footer */}
      <div className="card-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className="author-group" style={{display: 'flex', gap: '5px'}}>
            {recipe.authors && recipe.authors.map((auth, idx) => (
                <div key={idx} style={{
                    width: '30px', height: '30px', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '10px', fontWeight: 'bold', color: '#166534', 
                    backgroundColor: '#dcfce7'
                }}>
                    {auth}
                </div>
            ))}
        </div>
        
        {/* --- PHẦN SELECT CHỌN TRẠNG THÁI --- */}
        <div className="status-selector">
            <select 
                value={recipe.status} // Giá trị hiện tại (0 hoặc 1)
                onChange={(e) => onStatusChange(recipe.id, parseInt(e.target.value))} // Gửi ID và Status mới về cha
                style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: currentColor, // Màu nền đổi theo trạng thái
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    appearance: 'none', // Ẩn mũi tên mặc định của trình duyệt để đẹp hơn (tùy chọn)
                    textAlign: 'center'
                }}
            >
                <option value={0} style={{color: 'black', background: 'white'}}>• Chờ duyệt</option>
                <option value={1} style={{color: 'black', background: 'white'}}>• Đã duyệt</option>
            </select>
        </div>

      </div>
    </div>
  );
};

export default RecipeItem;