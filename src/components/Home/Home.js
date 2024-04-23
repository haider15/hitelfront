import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    adresse: "",
    activity_id: "",
    image:''
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchActivities();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetFormData();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      adresse: "",
      activity_id: "",
      image:''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
    setFormData({
      name: product.name,
      adresse: product.adresse,
      image: product.image,
      activity_id: product.activity_id
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/products", formData);
      handleCloseAddModal();
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/products/${selectedProduct.id}`, formData);
      handleCloseEditModal();
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/activities");
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const getActivityName = (activityId) => {
    console.log("activites",activities)
    console.log("activity",activityId)
    const activity = activities.find(activity => activity.id === activityId);
    console.log(activity)
    return activity ? activity.name : "N/A";
    
  };

  return (
    <Container style={{ marginTop: "70px" }}>
      
      <Button variant="success" onClick={handleShowAddModal}>Ajouter produit</Button>
      <Table striped bordered hover>
        {/* Tableau des produits */}
      </Table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group controlId="formProductName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductAdresse">
              <Form.Label>image</Form.Label>
              <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductActivity">
              <Form.Label>Activité</Form.Label>
              <Form.Control as="select" name="activity_id" value={formData.activity_id} onChange={handleChange}>
                <option value="">Sélectionner une activité</option>
                {activities.map(activity => (
                  <option key={activity.id} value={activity.id}>{activity.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductAdresse">
              <Form.Label>image</Form.Label>
              <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductActivity">
              <Form.Label>Activité</Form.Label>
              <Form.Control as="select" name="activity_id" value={formData.activity_id} onChange={handleChange}>
                <option value="">Sélectionner une activité</option>
                {activities.map(activity => (
                  <option key={activity.id} value={activity.id}>{activity.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Enregistrer les modifications
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h2>Liste des produits</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom hotel</th>
            <th>Adresse</th>
            <th>image</th>
            <th>Activité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.adresse}</td>
              <td><img src={product.image} alt="product" style={{ width: "100px" }} /></td> {/* Ajoutez cette ligne */}
              <td>
                  {product.activity_id
                    ? (() => {
                      for (let i = 0; i < activities.length; i++) {
                        if (activities[i].id === parseInt(product.activity_id)) {
                          return activities[i].name;
                        }
                      }
                      return "N/A";
                    })()
                    : "N/A"
                  }
                </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Supprimer</Button>
                <Button variant="info" onClick={() => handleShowEditModal(product)}>Modifier</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
