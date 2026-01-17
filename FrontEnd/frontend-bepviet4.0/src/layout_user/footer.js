import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // 1. Import Link

export default function Footer() {
  return (
    <footer className="bg-warning py-3 mt-5">
      <Container>
        <Row className="text-center">
          
          <Col>
            {/* 2. Dùng thẻ Link thay vì để chữ trơ trọi */}
            {/* className giúp bỏ gạch chân và chỉnh màu chữ */}
            <Link to="/faq" className="text-dark text-decoration-none fw-bold">
              Hỏi đáp
            </Link>
          </Col>

          <Col>
            <Link to="/contact" className="text-dark text-decoration-none fw-bold">
              Liên hệ
            </Link>
          </Col>

          <Col>
            <Link to="/policy" className="text-dark text-decoration-none fw-bold">
              Chính sách
            </Link>
          </Col>

          <Col>
            <Link to="/terms" className="text-dark text-decoration-none fw-bold">
              Điều khoản
            </Link>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}