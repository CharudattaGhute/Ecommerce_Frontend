import React from "react";
import { Modal, Button } from "react-bootstrap";

function Productdetails({ show, onHide, product }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      {" "}
      {/* Use size="lg" or size="xl" */}
      <Modal.Header closeButton>
        <Modal.Title>{product.productname}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex">
        <img
          src={
            product.image
              ? product.image
              : "http://localhost:5001/uploads/default-image.jpg"
          }
          alt={product.productname}
          style={{ width: "150px", height: "150px", marginRight: "20px" }}
        />
        <div>
          <p>{product.description}</p>
          <p>
            <span style={{ color: "blue" }}>Quantity:</span> {product.quantity}
          </p>
          <p>
            <span style={{ color: "blue" }}>Availability:</span>{" "}
            {product.availability}
          </p>
          <Button variant="outline-danger">${product.price}</Button>
        </div>
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
