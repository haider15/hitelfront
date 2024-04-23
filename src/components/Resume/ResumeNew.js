import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";

function ResumeNew() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    product_id: "",
    date_debut: "",
    date_fin: ""
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchReservations();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/reservations");
      setReservations(response.data);
      console.log("dceccszcd",response.data)
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:8000/api/reservations/${reservationId}`);
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({
      user_id: "",
      product_id: "",
      date_debut: "",
      date_fin: ""
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedReservation(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowEditModal(true);
    setFormData({
      user_id: reservation.user_id,
      product_id: reservation.product_id,
      date_debut: reservation.date_debut,
      date_fin: reservation.date_fin
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/reservations", formData);
      handleCloseAddModal();
      fetchReservations();
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/reservations/${selectedReservation.id}`, formData);
      handleCloseEditModal();
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Container>
      <h2>Liste des réservations</h2>
      <Button variant="success" onClick={handleShowAddModal}>Ajouter réservation</Button>
      <Table striped bordered hover>
        {/* Tableau des réservations */}
      </Table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group controlId="formReservationUser">
              <Form.Label>Utilisateur</Form.Label>
              <Form.Control as="select" name="user_id" value={formData.user_id} onChange={handleChange}>
                <option value="">Sélectionner un utilisateur</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReservationProduct">
              <Form.Label>Nom hotel</Form.Label>
              <Form.Control as="select" name="product_id" value={formData.product_id} onChange={handleChange}>
                <option value="">Sélectionner un produit</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReservationDateDebut">
              <Form.Label>Date de début</Form.Label>
              <Form.Control
                type="date"
                name="date_debut"
                value={formData.date_debut}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 10)} // Définit la date minimale comme la date actuelle
              />
            </Form.Group>
            <Form.Group controlId="formReservationDateFin">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                type="date"
                name="date_fin"
                value={formData.date_fin}
                onChange={handleChange}
                min={formData.date_debut ? new Date(new Date(formData.date_debut).getTime() + 86400000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}

              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
  <Modal.Header closeButton>
    <Modal.Title>Modifier la réservation</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmitEdit}>
      <Form.Group controlId="formReservationUser">
        <Form.Label>Utilisateur</Form.Label>
        <Form.Control as="select" name="user_id" value={formData.user_id} onChange={handleChange}>
          <option value="">Sélectionner un utilisateur</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formReservationProduct">
        <Form.Label>Nom Hotel</Form.Label>
        <Form.Control as="select" name="product_id" value={formData.product_id} onChange={handleChange}>
          <option value="">Sélectionner un produit</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formReservationDateDebut">
        <Form.Label>Date de début</Form.Label>
        <Form.Control
          type="date"
          name="date_debut"
          value={formData.date_debut}
          onChange={handleChange}
          min={new Date().toISOString().slice(0, 10)} // Définit la date minimale comme la date actuelle
        />
      </Form.Group>
      <Form.Group controlId="formReservationDateFin">
        <Form.Label>Date de fin</Form.Label>
        <Form.Control
          type="date"
          name="date_fin"
          value={formData.date_fin}
          onChange={handleChange}
          min={formData.date_debut ? new Date(new Date(formData.date_debut).getTime() + 86400000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enregistrer les modifications
      </Button>
    </Form>
  </Modal.Body>
</Modal>

      <h2>Liste des réservations</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Utilisateur</th>
            <th>Nom Hotel</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {reservation.user_id
                  ? (() => {
                    for (let i = 0; i < users.length; i++) {
                      if (users[i].id === parseInt(reservation.user_id)) {
                        return users[i].name;
                      }
                    }
                    return "N/A";
                  })()
                  : "N/A"
                }
              </td>
              <td>
                <td>
                  {reservation.product_id
                    ? (() => {
                      for (let i = 0; i < products.length; i++) {
                        if (products[i].id === parseInt(reservation.product_id)) {
                          return products[i].name;
                        }
                      }
                      return "N/A";
                    })()
                    : "N/A"
                  }
                </td>
              </td>
              <td>{reservation.date_debut}</td>
              <td>{reservation.date_fin}</td>
              <td>
                <Button variant="info" onClick={() => handleShowEditModal(reservation)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDelete(reservation.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ResumeNew;
