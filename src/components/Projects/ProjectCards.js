import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function ProjectCards({ products, activities }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reservationFormData, setReservationFormData] = useState({
    user_id: "",
    product_id: "",
    date_debut: "",
    date_fin: ""
  });
  const [reservationError, setReservationError] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setReservationFormData({
      ...reservationFormData,
      product_id: product.id
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setReservationFormData({
      user_id: "",
      product_id: "",
      date_debut: "",
      date_fin: ""
    });
    setReservationError(null);
  };

  const handleReservationFormChange = (e) => {
    setReservationFormData({ ...reservationFormData, [e.target.name]: e.target.value });
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/reservations", reservationFormData);
      handleCloseModal();
    } catch (error) {
      setReservationError(error.message);
    }
  };

  // Fonction pour diviser les produits en groupes de trois
  function chunkArray(arr, size) {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  }

  const chunkedProducts = chunkArray(products, 3);

  return (
    <div>
      {chunkedProducts.map((chunk, index) => (
        <div key={index} className="d-flex justify-content-between mb-4">
          {chunk.map((product) => (
            <Card key={product.id} className="project-card-view" style={{ width: "30%", margin: "10px" }} onClick={() => handleCardClick(product)}>
              <Card.Img variant="top" src={product.image} alt="card-img" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.adresse}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une réservation pour {selectedProduct && selectedProduct.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservationError && <p style={{ color: "red" }}>{reservationError}</p>}
          <Form onSubmit={handleReservationSubmit}>
            <Form.Group controlId="formReservationUserID">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" name="user_id" value={reservationFormData.user_id} onChange={handleReservationFormChange} required />
            </Form.Group>
            <Form.Group controlId="formReservationProductID">
              <Form.Label>Product ID</Form.Label>
              <Form.Control type="text" name="product_id" value={reservationFormData.product_id} onChange={handleReservationFormChange} disabled required />
            </Form.Group>
            <Form.Group controlId="formReservationDateDebut">
              <Form.Label>Date de début</Form.Label>
              <Form.Control type="date" name="date_debut" value={reservationFormData.date_debut} onChange={handleReservationFormChange}  min={new Date().toISOString().slice(0, 10)}required />
            </Form.Group>
            <Form.Group controlId="formReservationDateFin">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control type="date" name="date_fin" value={reservationFormData.date_fin} onChange={handleReservationFormChange} min={reservationFormData.date_debut ? new Date(new Date(reservationFormData.date_debut).getTime() + 86400000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter réservation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProjectCards;
