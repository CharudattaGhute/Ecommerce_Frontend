import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Productdetails from "./Productdetails";

function Cart() {
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

        const productsWithCategoryNames = await Promise.all(
          response.data.map(async (product) => {
            console.log("Product:", product);
            if (product.category._id) {
              try {
                const categoryResponse = await axios.get(
                  `http://localhost:5001/api/category/getcategorybyid/${product.category._id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                console.log("Category Response:", categoryResponse.data);
                return {
                  ...product,
                  category:
                    categoryResponse.data.categoryname || "Unknown Category",
                };
              } catch (categoryError) {
                console.error("Error fetching category:", categoryError);
                return {
                  ...product,
                  category: "Error Fetching Category",
                };
              }
            }
            return {
              ...product,
              category: "No Category ID",
            };
          })
        );

        setProducts(productsWithCategoryNames);
        console.log("productsWithCategoryNames", productsWithCategoryNames);
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
        >
          <Card.Img
            variant="top"
            src={
              product.image
                ? product.image
                : "http://localhost:5001/uploads/default-image.jpg"
            }
            alt={product.productname}
          />
          <Card.Body>
            <Card.Title>{product.productname}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>
              <span style={{ color: "blue" }}>Quantity:</span>{" "}
              {product.quantity}
            </Card.Text>
            <Card.Text>
              <span style={{ color: "blue" }}>Availability:</span>
              {product.availability}
            </Card.Text>
            <Card.Text>
              <span style={{ color: "blue" }}>Categories:</span>
              {product.category}
            </Card.Text>
            <Button variant="outline-danger">${product.price}</Button>
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
