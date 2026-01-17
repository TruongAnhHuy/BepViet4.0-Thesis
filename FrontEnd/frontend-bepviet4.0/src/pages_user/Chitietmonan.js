import React from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { FaClock, FaUser, FaFire } from 'react-icons/fa'; 

const RecipeDetail = () => {
  // Dữ liệu giả lập
  const recipe = {
    title: "Phở Bò Truyền Thống",
    image: "https://i.pinimg.com/564x/78/c1/3e/78c13e64db8035dc128695d31562947a.jpg",
    author: "Bếp Trưởng",
    time: "45 phút",
    calories: "500 kcal",
    description: "Món phở bò tái chín thơm ngon, đậm đà hương vị truyền thống Việt Nam.",
    ingredients: [
      "500g Bánh phở", "300g Thịt bò tái", "Xương ống hầm nước dùng",
      "Hành tây, hành tím, gừng", "Thảo quả, quế, hồi", "Rau sống ăn kèm"
    ],
    steps: [
      "Bước 1: Rửa sạch xương ống, chần qua nước sôi rồi hầm lấy nước dùng.",
      "Bước 2: Nướng gừng, hành tím, hành tây cho thơm rồi thả vào nồi nước dùng cùng gói gia vị phở.",
      "Bước 3: Thái thịt bò mỏng. Chần bánh phở qua nước sôi rồi cho vào bát.",
      "Bước 4: Xếp thịt bò lên bát, chan nước dùng nóng hổi và thưởng thức."
    ]
  };

  // Dữ liệu bình luận mẫu
  const comments = [
      { user: "Nguyễn Văn A", avatar: "https://via.placeholder.com/50", text: "Công thức rất chuẩn, mình nấu thử ai cũng khen!" },
      { user: "Trần Thị B", avatar: "https://via.placeholder.com/50", text: "Nước dùng rất thơm, cảm ơn ad đã chia sẻ." }
  ];

  return (
    <Container className="py-5">
      {/* --- PHẦN TRÊN: CHIA 2 CỘT --- */}
      <Row className="mb-4">
        
        {/* CỘT TRÁI */}
        <Col md={4}>
          <Card className="mb-3 shadow-sm border-0">
            <div style={{ height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
                <Image src={recipe.image} alt={recipe.title} fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Card>

          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">{recipe.title}</h2>
            <div className="text-muted fst-italic">Đăng bởi: {recipe.author}</div>
          </div>

          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-warning text-dark fw-bold text-center">
              NGUYÊN LIỆU
            </Card.Header>
            <ListGroup variant="flush">
              {recipe.ingredients.map((item, index) => (
                <ListGroup.Item key={index} className="border-bottom-0">
                  • {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* CỘT PHẢI */}
        <Col md={8}>
          <Card className="mb-4 shadow-sm border-0 bg-light">
            <Card.Body className="d-flex justify-content-around align-items-center text-center">
              <div><FaClock className="text-warning mb-2" size={24} /><h6 className="fw-bold">Thời gian</h6><span>{recipe.time}</span></div>
              <div><FaFire className="text-danger mb-2" size={24} /><h6 className="fw-bold">Calories</h6><span>{recipe.calories}</span></div>
              <div><FaUser className="text-primary mb-2" size={24} /><h6 className="fw-bold">Khẩu phần</h6><span>4 người</span></div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0" style={{ minHeight: '400px' }}>
            <Card.Header className="bg-white border-bottom-0">
               <h4 className="fw-bold text-warning border-start border-4 border-warning ps-3">
                 CÁCH LÀM CHI TIẾT
               </h4>
            </Card.Header>
            <Card.Body>
              <div className="recipe-steps">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="mb-3">
                    <h6 className="fw-bold">Bước {index + 1}:</h6>
                    <p className="text-secondary" style={{ lineHeight: '1.6' }}>{step}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- PHẦN DƯỚI: KHU VỰC BÌNH LUẬN --- */}
      <Row>
        <Col md={12}>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 border-bottom pb-2">KHU VỰC BÌNH LUẬN</h5>
              
              <Form className="mb-4">
                <Form.Group className="mb-3" controlId="commentForm">
                  <Form.Control as="textarea" rows={3} placeholder="Chia sẻ cảm nghĩ của bạn về món ăn này..." />
                </Form.Group>
                <div className="text-end">
                    <Button variant="warning" className="fw-bold text-white px-4">Gửi bình luận</Button>
                </div>
              </Form>

              {/* === PHẦN MỚI THÊM VÀO ĐÂY === */}
              <div className="comment-list">
                {comments.map((comment, index) => (
                    <div key={index} className="d-flex mb-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <img 
                                className="rounded-circle border border-2 border-white" 
                                src={comment.avatar} 
                                alt="User" 
                                width="50" 
                                height="50"
                            />
                        </div>
                        {/* Nội dung comment */}
                        <div className="flex-grow-1 ms-3 bg-white p-3 rounded shadow-sm">
                            <h6 className="fw-bold mb-1">{comment.user}</h6>
                            <p className="mb-0 text-muted small">{comment.text}</p>
                        </div>
                    </div>
                ))}
              </div>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetail;