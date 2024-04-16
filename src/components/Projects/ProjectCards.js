import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Effectuez une requête GET pour récupérer les données des produits depuis votre backend
    axios.get("http://localhost:8000/api/products")
      .then(response => {
        // Mettez à jour l'état local avec les données des produits
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []); // La dépendance vide [] signifie que cet effet ne s'exécutera qu'une seule fois après le montage du composant

  return (
    <div className="product-list">
      {products.map(product => (
        <Card className="project-card-view" key={product.id}>
          <Card.Img variant="top" src={product.imgPath} alt="card-img" />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text style={{ textAlign: "justify" }}>
              {product.adresse}
            </Card.Text>
            {/* <Button variant="primary" href={product.ghLink} target="_blank">
              <BsGithub /> &nbsp;
              {product.isBlog ? "Blog" : "GitHub"}
            </Button> */}
            {"\n"}
            {"\n"}

            {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

            {!product.isBlog && product.demoLink && (
              <Button
                variant="primary"
                href={product.activity_id}
                target="_blank"
                style={{ marginLeft: "10px" }}
              >
                <CgWebsite /> &nbsp;
                {"Demo"}
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProjectCards;
