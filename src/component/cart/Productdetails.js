import React from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";

function Productdetails({ show, onHide, product }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.productname}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              <img
                src={
                  product.image
                    ? product.image
                    : "http://localhost:5001/uploads/default-image.jpg"
                }
                alt={product.productname}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </Col>
            <Col md={8}>
              <div>
                <p>{product.description}</p>
                <p>
                  <span style={{ color: "blue" }}>Quantity:</span>{" "}
                  {product.quantity}
                </p>
                <p>
                  <span style={{ color: "blue" }}>Availability:</span>{" "}
                  {product.availability}
                </p>
                <p>
                  <span style={{ color: "blue" }}>Product Added:</span>{" "}
                  {new Date(product.updatedAt).toDateString()}
                </p>
                <Button variant="outline-danger">${product.price}</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Productdetails;
