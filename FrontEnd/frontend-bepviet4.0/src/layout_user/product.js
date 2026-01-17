import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getProducts } from "../services/api";

export default function Product() {
  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Bún bò Huế</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Phở bò</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Bánh xèo</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Cơm tấm</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Bún bò Huế</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Phở bò</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Bánh xèo</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center border-0">
            <div style={{ height: 180, background: "#9b8b8b" }}></div>
            <Card.Body>
              <Card.Title>Cơm tấm</Card.Title>
              <Button variant="outline-danger" size="sm">
                XEM CHI TIẾT
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
