import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Productdetails from "../cart/Productdetails";
import AddToCart from "../user/Addtocard";
import "./Cart.css";

function Cart({ handleAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5001/api/getallproduct",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const productsWithCategories = await Promise.all(
          response.data.map(async (product) => {
            if (product.category && product.category._id) {
              try {
                const categoryResponse = await axios.get(
                  `http://localhost:5001/api/category/getcategorybyid/${product.category._id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                return {
                  ...product,
                  category:
                    categoryResponse.data.categoryname || "Unknown Category",
                };
              } catch {
                return { ...product, category: "Error Fetching Category" };
              }
            }
            return { ...product, category: "No Category" };
          })
        );

        setProducts(productsWithCategories);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    getProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-5 d-flex flex-wrap justify-content-around">
      {products.map((product) => (
        <Card
          key={product._id}
          style={{ width: "18rem", margin: "10px" }}
          onClick={() => handleCardClick(product)}
          className="custom-card"
        >
          <div className="image-container">
            <Card.Img
              variant="top"
              src={
                product.image
                  ? product.image
                  : "http://localhost:5001/uploads/default-image.jpg"
              }
              alt={product.productname}
              className="product-image"
            />
          </div>
          <Card.Body className="custom-card-body">
            <Card.Title className="product-title">
              {product.productname}
            </Card.Title>
            <Card.Text className="product-description">
              {product.description}
            </Card.Text>
            <div className="product-details">
              <Card.Text className="product-info">
                <span className="product-info-label">Quantity:</span>{" "}
                {product.quantity}
              </Card.Text>
              <Card.Text className="product-info">
                <span className="product-info-label">Availability:</span>{" "}
                {product.availability}
              </Card.Text>
              <Card.Text className="product-info">
                <span className="product-info-label">Categories:</span>{" "}
                {product.category}
              </Card.Text>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <Button variant="outline-danger" className="product-price">
                ${product.price}
              </Button>
              <Button
                variant="success"
                className="add-to-cart-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      {selectedProduct && (
        <Productdetails
          show={showModal}
          onHide={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

export default Cart;
