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
} from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";

function AddToCart({ cart = [], handleRemove }) {
  // Calculate subtotal, tax, and total amount
  const subtotal = cart
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  const tax = (subtotal * 0.2).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      <Row>
        {/* Left side: Cart items */}
        <Col md={8}>
          <ListGroup>
            {cart.map((product) => (
              <ListGroupItem
                key={product._id}
                className="d-flex align-items-center"
              >
                <Row className="w-100 align-items-center">
                  <Col xs={2}>
                    <img
                      src={product.image}
                      alt={product.productname}
                      className="img-fluid"
                    />
                  </Col>

                  <Col xs={4}>
                    <h5>{product.productname}</h5>
                  </Col>

                  <Col xs={2}>
                    <p>${product.price.toFixed(2)}</p>
                  </Col>

                  <Col xs={2}>
                    <InputGroup>
                      <FormControl
                        type="number"
                        value={product.quantity}
                        min={1}
                        onChange={(e) =>
                          console.log("Update quantity", e.target.value)
                        }
                      />
                    </InputGroup>
                  </Col>

                  <Col xs={2}>
                    <p>${(product.price * product.quantity).toFixed(2)}</p>
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
          </ListGroup>

          {cart.length === 0 && (
            <p className="text-center mt-3">Your cart is empty.</p>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <hr />
              <p>Subtotal (Excl. Tax): ${subtotal}</p>
              <p>Tax: ${tax}</p>
              <hr />
              <h5>Order Total: ${totalAmount}</h5>
              <Button variant="success" className="w-100 mt-3">
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
