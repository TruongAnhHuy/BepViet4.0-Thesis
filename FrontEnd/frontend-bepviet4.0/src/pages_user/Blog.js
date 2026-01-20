import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge, ListGroup, Spinner } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaUser, FaArrowRight, FaCommentDots } from 'react-icons/fa';
import axiosClient from '../api/axiosClient';

const Blog = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Danh mục mẫu
  const categories = ["Ẩm thực 3 miền", "Mẹo vặt nhà bếp", "Review quán ngon", "Sức khỏe & Dinh dưỡng"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Gọi API
        const response = await axiosClient.get('/posts');
        
        // Log dữ liệu ra console để kiểm tra
        console.log("Dữ liệu API trả về:", response.data);

        const fetchedPosts = response.data.data || response.data;
        
        if (Array.isArray(fetchedPosts)) {
            setPosts(fetchedPosts);
            setRecentPosts(fetchedPosts.slice(0, 3));
        } else {
            setPosts([]);
        }
      } catch (error) {
        console.error("Lỗi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x250?text=BepViet";
    return path.startsWith('http') ? path : `http://localhost:8000/storage/${path}`;
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h6 className="text-warning fw-bold text-uppercase ls-2">Góc Chia Sẻ</h6>
        <h1 className="fw-bold display-5">Tạp Chí Ẩm Thực</h1>
        <p className="text-muted w-75 mx-auto">Nơi lưu giữ những câu chuyện, công thức và niềm đam mê bất tận.</p>
      </div>

      <Row>
        {/* --- CỘT TRÁI --- */}
        <Col lg={8}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="warning" />
              <p className="mt-2 text-muted">Đang tải bài viết...</p>
            </div>
          ) : posts.length > 0 ? (
            <Row>
              {posts.map((post) => (
                <Col md={6} key={post.id} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm blog-card" onClick={() => onSelectPost && onSelectPost(post)} style={{cursor: 'pointer'}}>
                    <div className="blog-img-container" style={{height: '200px', overflow: 'hidden', position: 'relative'}}>
                      <Badge bg="warning" text="dark" className="blog-category-badge" style={{position: 'absolute', top: '10px', left: '10px', zIndex: 1}}>
                        Món Ngon
                      </Badge>
                      <Card.Img 
                        variant="top" 
                        src={getImageUrl(post.image_path)} 
                        className="blog-img h-100 object-fit-cover"
                        onError={(e) => {e.target.src = "https://via.placeholder.com/400x250?text=NoImage"}}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column pt-4 px-4">
                      <div className="d-flex justify-content-between text-muted small mb-2">
                        <span><FaCalendarAlt className="me-1 text-warning"/> {formatDate(post.created_at)}</span>
                        <span><FaUser className="me-1 text-warning"/> {post.user ? (post.user.username || post.user.name) : 'Admin'}</span>
                      </div>
                      <Card.Title className="fw-bold blog-title mb-3 text-truncate">{post.title}</Card.Title>
                      <Card.Text className="text-secondary blog-excerpt flex-grow-1" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                        {post.excerpt}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                        <span className="text-muted small"><FaCommentDots /> 0 bình luận</span>
                        <span className="text-warning fw-bold read-more-link">Xem chi tiết <FaArrowRight className="ms-1"/></span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5 bg-light rounded">
                <h5>Chưa có bài viết nào được đăng.</h5>
                <p className="text-muted">Hãy kiểm tra Database bảng <b>blog_posts</b> đã có dữ liệu chưa.</p>
            </div>
          )}
        </Col>

        {/* --- CỘT PHẢI (SIDEBAR) --- */}
        <Col lg={4} className="mt-5 mt-lg-0 ps-lg-5">
          <div className="sidebar-widget mb-5">
            <h5 className="sidebar-title">Tìm kiếm</h5>
            <InputGroup>
              <Form.Control placeholder="Nhập từ khóa..." className="border-end-0 bg-light" />
              <Button variant="light" className="border border-start-0 text-secondary"><FaSearch /></Button>
            </InputGroup>
          </div>

          <div className="sidebar-widget mb-5">
            <h5 className="sidebar-title">Chuyên mục</h5>
            <ListGroup variant="flush">
              {categories.map((cat, idx) => (
                <ListGroup.Item key={idx} action className="border-0 px-0 bg-transparent d-flex justify-content-between align-items-center text-secondary">
                  <span><FaArrowRight className="me-2 text-warning" size={12}/> {cat}</span>
                  <Badge bg="light" text="dark" className="rounded-pill border">{(idx + 1) * 2}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <div className="sidebar-widget mb-5">
            <h5 className="sidebar-title">Bài viết nổi bật</h5>
            <div className="recent-posts">
              {recentPosts.map((item) => (
                <div key={item.id} className="d-flex mb-3 align-items-center cursor-pointer" onClick={() => onSelectPost && onSelectPost(item)} style={{cursor: 'pointer'}}>
                  <div className="bg-secondary rounded flex-shrink-0" style={{width: '60px', height: '60px', overflow: 'hidden'}}>
                    <img src={getImageUrl(item.image_path)} className="w-100 h-100 object-fit-cover opacity-75" alt=""/>
                  </div>
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1 fs-6 text-dark hover-warning" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                        {item.title}
                    </h6>
                    <small className="text-muted"><FaCalendarAlt size={10}/> {formatDate(item.created_at)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;