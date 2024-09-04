import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductModify() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5001/api/getallproduct",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data) {
          setProducts(response.data);
          console.log("Fetched products:", response.data);
        } else {
          setError("No products found.");
        }
      } catch (err) {
        setError("Error fetching products.");
        console.error(
          "Error fetching products:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:5001/api/deleteproduct/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (err) {
      setError("Error deleting product.");
      console.error(
        "Error deleting product:",
        err.response ? err.response.data : err.message
      );
      toast.error("Error deleting product.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleModalSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/updateproduct/${selectedProduct._id}`,
        selectedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(
        products.map((product) =>
          product._id === selectedProduct._id ? selectedProduct : product
        )
      );
      setShowModal(false);
      toast.success("Product updated successfully!");
    } catch (err) {
      setError("Error updating product.");
      console.error(
        "Error updating product:",
        err.response ? err.response.data : err.message
      );
      toast.error("Error updating product.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div>
      <h1>Products</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ color: "blue" }}>Product Name</th>
            <th style={{ color: "blue" }}>Created At</th>
            <th style={{ color: "blue" }}>Quantity</th>
            <th style={{ color: "blue" }}>Price</th>
            <th style={{ color: "blue" }}>Available</th>
            <th style={{ color: "blue" }}>Update</th>
            <th style={{ color: "blue" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td style={{ color: "black" }}>{product.productname}</td>
              <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.availability ? "InStock" : "OutOfStock"}</td>
              <td>
                <FaEdit
                  style={{
                    cursor: "pointer",
                    color: "orange",
                    marginRight: "10px",
                  }}
                  onClick={() => handleUpdateClick(product)}
                />
              </td>
              <td>
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteClick(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productname"
                value={selectedProduct?.productname || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={selectedProduct?.description || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={selectedProduct?.price || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={selectedProduct?.quantity || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvailable">
              <Form.Label>Available</Form.Label>
              <Form.Check
                type="checkbox"
                name="availability"
                checked={selectedProduct?.availability || false}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default ProductModify;
