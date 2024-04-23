import React, { Component } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null,
      showAddModal: false,
      showEditModal: false,
      formData: {
        name: "",
        email: "",
        password: ""
      }
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getall");
      this.setState({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      this.fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  handleCloseAddModal = () => {
    this.setState({
      showAddModal: false,
      formData: {
        name: "",
        email: "",
        password: ""
      }
    });
  };

  handleCloseEditModal = () => {
    this.setState({
      showEditModal: false,
      selectedUser: null
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleShowAddModal = () => {
    this.setState({ showAddModal: true });
  };

  handleShowEditModal = (user) => {
    this.setState({
      selectedUser: user,
      showEditModal: true,
      formData: {
        name: user.name,
        email: user.email,
        password: "" // Ne pas afficher le mot de passe existant
      }
    });
  };

  handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/users", this.state.formData);
      this.handleCloseAddModal();
      this.fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  handleSubmitEdit = async (e) => {
    e.preventDefault();
    const { id } = this.state.selectedUser;
    try {
      await axios.put(`http://localhost:8000/api/users/${id}`, this.state.formData);
      this.handleCloseEditModal();
      this.fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  render() {
    const { users, showAddModal, showEditModal, formData } = this.state;

    return (
      <Container>
        <h2>Liste des utilisateurs</h2>
        <Button variant="success" onClick={this.handleShowAddModal}>Ajouter utilisateur</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="info" onClick={() => this.handleShowEditModal(user)}>Modifier</Button>
                  <Button variant="danger" onClick={() => this.handleDelete(user.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showAddModal} onHide={this.handleCloseAddModal}>
          {/* Modal pour ajouter un utilisateur */}
        </Modal>
        <Modal show={showEditModal} onHide={this.handleCloseEditModal}>
          {/* Modal pour modifier un utilisateur */}
        </Modal>
      </Container>
    );
  }
}

export default Blog;
