import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5001/api/category/getcategory",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data && response.data.category) {
          setCategories(response.data.category);
          console.log("response.data.category", response.data.category);
        } else {
          setError("No categories found.");
        }
      } catch (err) {
        setError("Error fetching categories.");
        console.error(
          "Error fetching categories:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchCategories();
  }, []);

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteClick = async (categoryId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:5001/api/category/deletecategory/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
      toast.success("Category deleted successfully!");
    } catch (err) {
      setError("Error deleting category.");
      console.error(
        "Error deleting category:",
        err.response ? err.response.data : err.message
      );
      toast.error("Error deleting category.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleModalSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/category/updatecategory/${selectedCategory._id}`,
        selectedCategory,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(
        categories.map((category) =>
          category._id === selectedCategory._id ? selectedCategory : category
        )
      );
      setShowModal(false);
      toast.success("Category updated successfully!");
    } catch (err) {
      setError("Error updating category.");
      console.error(
        "Error updating category:",
        err.response ? err.response.data : err.message
      );
      toast.error("Error updating category.");
    }
  };

  const handleChange = (e) => {
    setSelectedCategory({
      ...selectedCategory,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Categories</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.categoryname}</td>
              <td>
                <FaEdit
                  style={{
                    cursor: "pointer",
                    color: "orange",
                    marginRight: "10px",
                  }}
                  onClick={() => handleUpdateClick(category)}
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteClick(category._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryname"
                value={selectedCategory?.categoryname || ""}
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

export default UpdateCategory;
