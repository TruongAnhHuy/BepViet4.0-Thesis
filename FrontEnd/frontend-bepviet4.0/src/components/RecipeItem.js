import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const RecipeItem = ({ recipe }) => {
  return (
    <div className="recipe-card">
      {/* Header: ID và Title */}
      <div className="recipe-header">
        <div className="recipe-info">
          <span className="recipe-id">RECIPE ID: {recipe.id}</span>
          <h3 className="recipe-title">{recipe.name}</h3>
        </div>
        <button className="more-btn"><FaEllipsisV /></button>
      </div>

      {/* Image Area */}
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.name} className="recipe-img" />
        <div className="overlay-text">Bản xem trước hình ảnh</div>
      </div>

      {/* Footer: Avatars và Status */}
      <div className="recipe-footer">
        <div className="avatar-group">
          {recipe.authors.map((initial, index) => (
            <div key={index} className={`mini-avatar avatar-${index}`}>
              {initial}
            </div>
          ))}
        </div>
        
        <span className={`status-badge ${recipe.status === 'Đã duyệt' ? 'status-green' : 'status-yellow'}`}>
          {recipe.status === 'Đã duyệt' ? '● Đã duyệt' : '● Đang chờ'}
        </span>
      </div>
    </div>
  );
};

export default RecipeItem;