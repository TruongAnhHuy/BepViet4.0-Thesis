import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-warning py-3 mt-5">
      <Container>
        <Row className="text-center">
          <Col>Hỏi đáp</Col>
          <Col>Liên hệ</Col>
          <Col>Chính sách</Col>
          <Col>Điều khoản</Col>
        </Row>
      </Container>
    </footer>
  );
}
