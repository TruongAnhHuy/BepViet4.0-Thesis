import React, { useState, useEffect, useRef } from 'react';
import '../styles/RecipeItem.css';

const RecipeItem = ({ recipe, onStatusChange }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    // Xử lý click ra ngoài để đóng menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectStatus = (status) => {
        // Gọi hàm từ cha (RecipeManagement) để cập nhật dữ liệu
        onStatusChange(recipe.id, status);
        setShowMenu(false); // Đóng menu sau khi chọn
    };

    return (
        <div className="recipe-card">
            <div className="recipe-header">
                <span className="recipe-id">RECIPE ID: {recipe.id}</span>
                <h3 className="recipe-title">{recipe.name}</h3>
                <div className="menu-dots">⋮</div>
            </div>

            <div className="recipe-body">
                {/* Placeholder cho ảnh giống video */}
                <div className="image-placeholder">
                    {recipe.image ? (
                        <img src={recipe.image} alt={recipe.name} />
                    ) : (
                        <span>Bản xem trước hình ảnh</span>
                    )}
                </div>
            </div>

            <div className="recipe-footer">
                <span className="author-badge">AD</span>

                {/* --- KHU VỰC NÚT TRẠNG THÁI GIỐNG VIDEO --- */}
                <div className="status-wrapper" ref={menuRef}>
                    <button 
                        className={`status-btn ${recipe.status === 'Đã duyệt' ? 'approved' : 'pending'}`}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        {recipe.status === 'Đã duyệt' ? '● ĐÃ DUYỆT' : '● CHỜ DUYỆT'}
                    </button>

                    {showMenu && (
                        <div className="status-dropdown">
                            <div 
                                className="dropdown-item" 
                                onClick={() => handleSelectStatus('Chờ duyệt')}
                            >
                                ● CHỜ DUYỆT
                            </div>
                            <div 
                                className="dropdown-item" 
                                onClick={() => handleSelectStatus('Đã duyệt')}
                            >
                                ● ĐÃ DUYỆT
                            </div>
                        </div>
                    )}
                </div>
                {/* ------------------------------------------- */}
            </div>
        </div>
    );
};

export default RecipeItem;
