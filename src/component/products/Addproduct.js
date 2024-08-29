import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Addproduct() {
  const [productname, setProductname] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const productnamechange = (e) => {
    setProductname(e.target.value);
  };
  const categorychange = (e) => {
    setCategory(e.target.value);
  };
  const pricechange = (e) => {
    setPrice(e.target.value);
  };
  const quantitychnage = (e) => {
    setAvailable(e.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5001/api/category/getcategory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        } else {
          console.error("Unexpected API response:", response.data);
          setError("Error: Unexpected response format.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    const formData = new FormData();
    console.log(formData);
    formData.append("productname", productname);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("available", available);
    formData.append("quantity", quantity);

    try {
      await axios.post("http://localhost:5001/api/createproduct", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Product added successfully!");
      setProductname("");
      setImage(null);
      setCategory("");
      setPrice("");
      setAvailable(true);
      setQuantity("");
      setError(null);
    } catch (err) {
      setError("Error adding product. Please try again.");
      setSuccess(null);
    }
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Container>
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={productname}
            onChange={productnamechange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={categorychange}
            required
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryname}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={pricechange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productAvailable">
          <Form.Label>Available</Form.Label>
          <Form.Control
            as="select"
            value={available}
            onChange={(e) => setAvailable(e.target.value === "true")}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={quantitychnage}
            required
          />
        </Form.Group>

        {error && (
          <Alert variant="danger" dismissible onClose={handleDismiss}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" dismissible onClose={handleDismiss}>
            {success}
          </Alert>
        )}

        <Button variant="primary" type="submit" className="mt-3">
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default Addproduct;
