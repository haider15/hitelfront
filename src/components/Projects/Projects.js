import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProjectCards from "./ProjectCards";
import axios from "axios";

function Projects() {
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });

    axios.get("http://localhost:8000/api/activities")
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedActivity) {
      const filtered = products.filter(product => product.activity_id === selectedActivity);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedActivity, products]);

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
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
        <Row style={{ justifyContent: "flex-start", paddingBottom: "10px" }}>
          <ProjectCards products={filteredProducts} activities={activities} />
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
