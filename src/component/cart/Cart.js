import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

function Cart() {
  const [products, setProducts] = useState([]);

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
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="container mt-5 d-flex flex-wrap justify-content-around">
      {products.map((product) => (
        <Card key={product._id} style={{ width: "18rem", margin: "10px" }}>
          <Card.Img
            variant="top"
            src={product.imageUrl || "default-image-url.jpg"}
            alt={product.productname}
          />
          <Card.Body>
            <Card.Title>{product.productname}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{product.quantity}</Card.Text>
            <Button variant="primary">${product.price}</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cart;
