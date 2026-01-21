import React, { useState, useRef, useEffect } from 'react';
import { FaEllipsisH } from 'react-icons/fa'; // Icon 3 chấm
import './PostItem.css';

const PostItem = ({ post, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Tự động đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (status) => {
    onStatusChange(post.id, status);
    setShowMenu(false);
  };

  return (
    <div className="post-card">
      {/* Phần ảnh và nội dung giữ nguyên */}
      <div className="post-image">
         <img src={post.image} alt={post.title} />
      </div>

      <div className="post-content">
        <div className="post-header">
           <span className="post-id">POST ID: {post.id}</span>
           <span className="dots"><FaEllipsisH /></span>
        </div>

        <h3 className="post-title">{post.title}</h3>
        <p className="post-desc">{post.description}</p>
        
        <div className="post-footer">
          <div className="post-meta">
            <span>🕒 {post.time}</span>
            <span style={{marginLeft: '15px'}}>👁️ {post.views}</span>
          </div>
          
          {/* --- PHẦN MENU TRẠNG THÁI GIỐNG HÌNH --- */}
          <div className="status-wrapper" ref={menuRef}>
            
            {/* Menu màu đen hiện ra khi showMenu = true */}
            {showMenu && (
                <div className="status-dropdown-dark">
                    <div className="dropdown-item" onClick={() => handleSelect('CHỜ DUYỆT')}>
                        ● &nbsp; CHỜ DUYỆT
                    </div>
                    <div className="dropdown-item" onClick={() => handleSelect('ĐÃ ĐĂNG')}>
                        ● &nbsp; ĐÃ ĐĂNG
                    </div>
                </div>
            )}

            {/* Nút hiển thị trạng thái hiện tại */}
            {/* NÚT BẤM ÁP DỤNG MÀU SẮC */}
            <button 
                className={`status-btn ${post.status === 'ĐÃ ĐĂNG' ? 'btn-published' : 'btn-pending'}`}
                onClick={() => setShowMenu(!showMenu)}
            >
              {/* Dấu chấm tròn nhỏ trước chữ */}
              ● &nbsp; {post.status}
            </button>
          </div>
          {/* --------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
