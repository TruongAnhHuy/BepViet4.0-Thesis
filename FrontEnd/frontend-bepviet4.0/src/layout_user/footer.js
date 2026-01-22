import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Footer() {

  const footerLinkClass = ({ isActive }) =>
    `btn btn-sm fw-bold w-100 border-0 ${
      isActive
        ? "btn-dark text-warning"
        : "btn-warning text-dark"
    }`;

  return (
    <footer className="bg-warning py-2 mt-4">
      <Container>
        <Row className="text-center g-1">

          <Col md={3} sm={6}>
            <NavLink to="/faq" className={footerLinkClass}>
              Hỏi đáp
            </NavLink>
          </Col>

          <Col md={3} sm={6}>
            <NavLink to="/contact" className={footerLinkClass}>
              Liên hệ
            </NavLink>
          </Col>

          <Col md={3} sm={6}>
            <NavLink to="/policy" className={footerLinkClass}>
              Chính sách
            </NavLink>
          </Col>

          <Col md={3} sm={6}>
            <NavLink to="/terms" className={footerLinkClass}>
              Điều khoản
            </NavLink>
          </Col>

        </Row>

        <Row className="mt-2">
          <Col className="text-center text-dark small">
            © 2026 Bếp Việt 4.0
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
