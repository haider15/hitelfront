import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";

function About() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/activities");
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await axios.delete(`http://localhost:8000/api/activities/${activityId}`);
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({
      name: "",
      description: ""
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedActivity(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (activity) => {
    setSelectedActivity(activity);
    setShowEditModal(true);
    setFormData({
      name: activity.name,
      description: activity.description
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/activities", formData);
      handleCloseAddModal();
      fetchActivities();
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/activities/${selectedActivity.id}`, formData);
      handleCloseEditModal();
      fetchActivities();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  return (
    <Container>
      <h2>Liste des activités</h2>
      <Button variant="success" onClick={handleShowAddModal}>Ajouter activité</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom Activity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{activity.name}</td>
              <td>{activity.description}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(activity.id)}>Supprimer</Button>
                <Button variant="info" onClick={() => handleShowEditModal(activity)}>Modifier</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une activité</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group controlId="formActivityName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formActivityDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'activité</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group controlId="formActivityName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formActivityDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enregistrer les modifications
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default About;
