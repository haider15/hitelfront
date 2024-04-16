
// import { Container, Row, Col } from "react-bootstrap";
// import homeLogo from "../../Assets/home-main.svg";
// import Particle from "../Particle";
// import Home2 from "./Home2";
// import Type from "./Type";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    adresse: "",
    activity_id: ""
  });

  const [activities, setActivities] = useState([]); // État pour stocker la liste des activités

  useEffect(() => {
    fetchProducts();
    fetchActivities(); // Appel de la fonction pour récupérer les activités
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);
  

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const handleDelete = async (productId) => {
      try {
        await axios.delete(`http://localhost:8000/api/products/${productId}`);
        // Réactualiser la liste des produits après la suppression
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedProduct(null);
    };
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleShowModal = (product) => {
      setSelectedProduct(product);
      setShowModal(true);
      setFormData({
        name: product.name,
        adresse: product.adresse,
        activity_id: product.activity_id
      });
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/products/${selectedProduct.id}`, formData);
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/activities"); // Supposons que vous avez une route pour récupérer les activités
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };
///////////////
const handleShowModal1 = () => {
  setShowModal(true);
};

const handleCloseModal1 = () => {
  setShowModal(false);
};

const handleChange1 = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
  
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/products", formData);
      handleCloseModal1();
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <Container>

////////////////////
      <h2>Liste des produits</h2>
      <Button variant="success" onClick={handleShowModal}>Ajouter produit</Button>
      <Table striped bordered hover>
        {/* Tableau des produits */}
      </Table>
      <Modal show={showModal} onHide={handleCloseModal1}>
  <Modal.Header closeButton>
    <Modal.Title>Ajouter un produit</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit1}>
      <Form.Group controlId="formProductName">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange1} />
      </Form.Group>
      <Form.Group controlId="formProductAdresse">
        <Form.Label>Adresse</Form.Label>
        <Form.Control type="text" name="adresse" value={formData.adresse} onChange={handleChange1} />
      </Form.Group>
      <Form.Group controlId="formProductActivity">
        <Form.Label>Activité</Form.Label>
        <Form.Control as="select" name="activity_id" value={formData.activity_id} onChange={handleChange1}>
          <option value="">Sélectionner une activité</option>
          {/* Mapper sur la liste des activités pour afficher les options */}
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
      /////////
      <h2>Liste des produits</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Adresse</th>
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
              <td>{product.activity ? product.activity.name : "N/A"}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Supprimer</Button>
                <Button variant="info" onClick={() => handleShowModal(product)}>Modifier</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formProductAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
            </Form.Group>
            {/* Ajouter d'autres champs du formulaire si nécessaire */}
            <Button variant="primary" type="submit">
              Enregistrer les modifications
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      
    </Container>
  );
 
}

export default Home;
