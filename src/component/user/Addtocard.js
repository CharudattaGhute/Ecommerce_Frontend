import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  Container,
  FormControl,
  InputGroup,
  Card,
  Badge,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

function AddToCart({ cart = [], handleRemove }) {
  // Calculate subtotal, tax, and total amount
  const subtotal = cart
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  const tax = (subtotal * 0.2).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🛒 Shopping Cart</h2>

      <Row>
        {/* Left side: Cart items */}
        <Col md={8}>
          <ListGroup variant="flush">
            {cart.map((product) => (
              <ListGroupItem
                key={product._id}
                className="d-flex align-items-center justify-content-between shadow-sm p-3 mb-2 bg-white rounded"
              >
                <Row className="w-100 align-items-center">
                  <Col xs={2}>
                    <img
                      src={product.image}
                      alt={product.productname}
                      className="img-fluid rounded"
                    />
                  </Col>

                  <Col xs={4}>
                    <h5 className="mb-0">{product.productname}</h5>
                  </Col>

                  <Col xs={2}>
                    <h6 className="text-success mb-0">
                      ${product.price.toFixed(2)}
                    </h6>
                  </Col>

                  <Col xs={2}>
                    <InputGroup className="quantity-control">
                      <FormControl
                        type="number"
                        value={product.quantity}
                        min={1}
                        className="text-center"
                        onChange={(e) =>
                          console.log("Update quantity", e.target.value)
                        }
                      />
                    </InputGroup>
                  </Col>

                  <Col xs={2}>
                    <h6 className="text-info mb-0">
                      ${(product.price * product.quantity).toFixed(2)}
                    </h6>
                  </Col>

                  <Col xs={1}>
                    <FaTrash
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleRemove(product._id)}
                    />
                  </Col>
                </Row>
              </ListGroupItem>
            ))}

            {cart.length === 0 && (
              <p className="text-center mt-3 text-muted">Your cart is empty.</p>
            )}
          </ListGroup>
        </Col>

        {/* Right side: Summary */}
        <Col md={4}>
          <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <Card.Body>
              <Card.Title className="text-center">
                <strong>Order Summary</strong>
              </Card.Title>
              <hr />
              <Row className="mb-2">
                <Col>Subtotal (Excl. Tax):</Col>
                <Col className="text-end">${subtotal}</Col>
              </Row>
              <Row className="mb-2">
                <Col>Tax (20%):</Col>
                <Col className="text-end">${tax}</Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <h5>
                    <strong>Total:</strong>
                  </h5>
                </Col>
                <Col className="text-end">
                  <h5 className="text-primary">
                    <strong>${totalAmount}</strong>
                  </h5>
                </Col>
              </Row>
              <Button variant="primary" className="w-100 mt-3">
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddToCart;
