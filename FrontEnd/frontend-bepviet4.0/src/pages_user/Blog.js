import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge, ListGroup } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaUser, FaArrowRight, FaCommentDots, FaTags } from 'react-icons/fa';

const Blog = ({ onSelectPost }) => {
  // Dữ liệu Blog (Thêm ngày, tác giả, mô tả ngắn)
  const blogPosts = [
    {
      id: 1,
      title: "Bí quyết nấu Phở Bò chuẩn vị Hà Nội tại nhà",
      image: "https://i.pinimg.com/564x/78/c1/3e/78c13e64db8035dc128695d31562947a.jpg",
      category: "Món Nước",
      date: "15 Th01, 2026",
      author: "Nguyễn Bếp",
      excerpt: "Phở là linh hồn của ẩm thực Việt. Để nấu được nồi nước dùng trong veo, ngọt thanh từ xương không phải ai cũng biết...",
      comments: 12
    },
    {
      id: 2,
      title: "Cách đổ Bánh Xèo Miền Tây giòn rụm, lâu mềm",
      image: "https://i.pinimg.com/564x/27/ef/f1/27eff120f269c2776eb655743c749969.jpg",
      category: "Ăn Vặt",
      date: "14 Th01, 2026",
      author: "Út Nhỏ",
      excerpt: "Bí mật nằm ở tỉ lệ bột và cách pha nước cốt dừa. Cùng khám phá công thức gia truyền đổ bánh xèo tiếng nổ xèo xèo vui tai...",
      comments: 8
    },
    {
      id: 3,
      title: "Gỏi Cuốn - Món ăn thanh mát cho ngày hè",
      image: "https://i.pinimg.com/564x/9a/02/44/9a02441712a202d6b38488e174092289.jpg",
      category: "Khai Vị",
      date: "12 Th01, 2026",
      author: "Chef Tùng",
      excerpt: "Sự kết hợp hoàn hảo giữa tôm, thịt, bún và các loại rau thơm, chấm cùng nước mắm chua ngọt hoặc tương đen đậm đà.",
      comments: 24
    },
    {
      id: 4,
      title: "Lịch sử và nguồn gốc của Bún Bò Huế",
      image: "https://i.pinimg.com/564x/98/f5/8a/98f58a3f8589069177114674a2cc4616.jpg",
      category: "Văn Hóa",
      date: "10 Th01, 2026",
      author: "Admin",
      excerpt: "Không chỉ là một món ăn, Bún Bò Huế còn chứa đựng cả một câu chuyện lịch sử của vùng đất cố đô...",
      comments: 5
    }
  ];

  // Bài viết nổi bật (Sidebar)
  const recentPosts = [
    { title: "Top 10 món ăn đường phố Sài Gòn", date: "16 Th01" },
    { title: "Mẹo bảo quản rau củ tươi lâu", date: "15 Th01" },
    { title: "Cách làm nước chấm hải sản", date: "14 Th01" }
  ];

  const categories = ["Ẩm thực 3 miền", "Mẹo vặt nhà bếp", "Review quán ngon", "Sức khỏe & Dinh dưỡng"];

  return (
    <Container className="py-5">
      {/* Header của Blog */}
      <div className="text-center mb-5">
        <h6 className="text-warning fw-bold text-uppercase ls-2">Góc Chia Sẻ</h6>
        <h1 className="fw-bold display-5">Tạp Chí Ẩm Thực</h1>
        <p className="text-muted w-75 mx-auto">Nơi lưu giữ những câu chuyện, công thức và niềm đam mê bất tận với nền ẩm thực Việt Nam phong phú.</p>
      </div>

      <Row>
        {/* --- CỘT TRÁI: DANH SÁCH BÀI VIẾT --- */}
        <Col lg={8}>
          <Row>
            {blogPosts.map((post) => (
              <Col md={6} key={post.id} className="mb-4">
                <Card className="h-100 border-0 shadow-sm blog-card" onClick={onSelectPost}>
                  <div className="blog-img-container">
                    <Badge bg="warning" text="dark" className="blog-category-badge">{post.category}</Badge>
                    <Card.Img variant="top" src={post.image} className="blog-img" />
                  </div>
                  <Card.Body className="d-flex flex-column pt-4 px-4">
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span><FaCalendarAlt className="me-1 text-warning"/> {post.date}</span>
                      <span><FaUser className="me-1 text-warning"/> {post.author}</span>
                    </div>
                    
                    <Card.Title className="fw-bold blog-title mb-3">{post.title}</Card.Title>
                    
                    <Card.Text className="text-secondary blog-excerpt flex-grow-1">
                      {post.excerpt}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                      <span className="text-muted small"><FaCommentDots /> {post.comments} bình luận</span>
                      <span className="text-warning fw-bold read-more-link">
                        Xem chi tiết <FaArrowRight className="ms-1"/>
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Pagination giả lập */}
          <div className="text-center mt-4">
            <Button variant="outline-dark" className="px-4 rounded-pill">Xem thêm bài viết cũ hơn</Button>
          </div>
        </Col>

        {/* --- CỘT PHẢI: SIDEBAR --- */}
        <Col lg={4} className="mt-5 mt-lg-0 ps-lg-5">
          {/* Widget Tìm kiếm */}
          <div className="sidebar-widget mb-5">
            <h5 className="sidebar-title">Tìm kiếm</h5>
            <InputGroup>
              <Form.Control placeholder="Nhập từ khóa..." className="border-end-0 bg-light" />
              <Button variant="light" className="border border-start-0 text-secondary"><FaSearch /></Button>
            </InputGroup>
          </div>

          {/* Widget Danh mục */}
          <div className="sidebar-widget mb-5">
            <h5 className="sidebar-title">Chuyên mục</h5>
            <ListGroup variant="flush">
              {categories.map((cat, idx) => (
                <ListGroup.Item key={idx} action className="border-0 px-0 bg-transparent d-flex justify-content-between align-items-center text-secondary">
                  <span><FaArrowRight className="me-2 text-warning" size={12}/> {cat}</span>
                  <Badge bg="light" text="dark" className="rounded-pill border">{(idx + 1) * 5}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          {/* Widget Bài viết mới */}
          <div className="sidebar-widget mb-5">
            <h5 className="sidebar-title">Bài viết nổi bật</h5>
            <div className="recent-posts">
               {recentPosts.map((item, idx) => (
                 <div key={idx} className="d-flex mb-3 align-items-center cursor-pointer">
                    <div className="bg-secondary rounded flex-shrink-0" style={{width: '60px', height: '60px', overflow: 'hidden'}}>
                         {/* Placeholder ảnh nhỏ */}
                        <img src={`https://source.unsplash.com/random/100x100?food&sig=${idx}`} alt="" className="w-100 h-100 object-fit-cover opacity-75"/>
                    </div>
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1 fs-6 text-dark hover-warning">{item.title}</h6>
                      <small className="text-muted"><FaCalendarAlt size={10}/> {item.date}</small>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Widget Tags */}
          <div className="sidebar-widget">
            <h5 className="sidebar-title">Tags phổ biến</h5>
            <div className="d-flex flex-wrap gap-2">
              {['Món Ngon', 'Vào Bếp', 'Sức Khỏe', 'Healthy', 'Mẹo Vặt', 'Du Lịch'].map(tag => (
                <Badge key={tag} bg="white" text="secondary" className="border py-2 px-3 fw-normal shadow-sm tag-hover">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Blog;