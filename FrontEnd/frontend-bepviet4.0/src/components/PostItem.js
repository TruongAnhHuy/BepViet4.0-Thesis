import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div className="post-card">
      {/* Hình ảnh bài viết */}
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>

      {/* Nội dung bài viết */}
      <div className="post-content">
        <div className="post-header">
          <h3>{post.title}</h3>
          {/* <span className="dots">...</span> */}
        </div>
        
        <p className="post-desc">{post.description}</p>
        
        <div className="post-footer">
          <div className="post-meta">
            <span>🕒 {post.time}</span>
            <span style={{marginLeft: '15px'}}>👁️ {post.views}</span>
          </div>
          
          {/* Badge trạng thái: Class thay đổi dựa theo status */}
          <span className={`status-badge ${post.status === 'ĐÃ ĐĂNG' ? 'status-green' : 'status-yellow'}`}>
            {post.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;