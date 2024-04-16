import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import axios from "axios";

function Projects() {
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Effectuez une requête GET pour récupérer les données des produits depuis votre backend
    axios.get("http://localhost:8000/api/products")
      .then(response => {
        // Mettez à jour l'état local avec les données des produits
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialisez les produits filtrés avec tous les produits au début
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });

    // Effectuez une requête GET pour récupérer les données des activités depuis votre backend
    axios.get("http://localhost:8000/api/activities")
      .then(response => {
        // Mettez à jour l'état local avec les données des activités
        setActivities(response.data);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
      });
  }, []); // La dépendance vide [] signifie que cet effet ne s'exécutera qu'une seule fois après le montage du composant

  useEffect(() => {
    // Filtrer les produits lorsque l'utilisateur sélectionne une activité
    if (selectedActivity) {
      const filtered = products.filter(product => product.activity_id === selectedActivity);
      setFilteredProducts(filtered);
    } else {
      // Si aucune activité n'est sélectionnée, afficher tous les produits
      setFilteredProducts(products);
    }
  }, [selectedActivity, products]); // Assurez-vous que selectedActivity et products sont dans la liste des dépendances

  return (
    <Container fluid className="project-section">
      {/* <Particle /> */}
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>

        {/* Sélecteur d'activité */}
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={6}>
            <Form>
              <Form.Group controlId="activitySelect">
                <Form.Label>Select Activity:</Form.Label>
                <Form.Control as="select" onChange={(e) => setSelectedActivity(e.target.value)}>
                  <option value="">All Activities</option>
                  {activities.map(activity => (
                    <option key={activity.id} value={activity.id}>{activity.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        {/* Cartes des produits filtrés */}
        <Row style={{ justifyContent: "flex-start", paddingBottom: "10px" }}>
  {filteredProducts.map(product => (
    <Col key={product.id} xs={12} md={4} className="project-card">
      <ProjectCard
        imgPath={product.imgPath}
        isBlog={product.isBlog}
        title={product.title}
        description={product.description}
        ghLink={product.ghLink}
        demoLink={product.demoLink}
      />
    </Col>
  ))}
</Row>

      </Container>
    </Container>
  );
}

export default Projects;
