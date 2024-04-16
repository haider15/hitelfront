import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = ({ target }) => {
        setData({ ...data, [target.name]: target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8000/api/login';
            const response = await axios.post(url, data);
            const { token } = response.data;
    
            localStorage.setItem('token', token);
            console.log("Token reçu :", token); // Afficher le token reçu dans la console
            window.location.href = '/Home'; // Rediriger l'utilisateur après la connexion
        } catch (error) {
            if (error.response) {
                // La requête a été faite mais le serveur a répondu avec un code d'erreur
                console.error("Erreur de serveur :", error.response.data);
                setError('Email ou mot de passe invalide');
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error("Aucune réponse du serveur :", error.request);
                setError('Aucune réponse du serveur');
            } else {
                // Une erreur s'est produite lors de la configuration de la requête
                console.error("Erreur lors de la configuration de la requête :", error.message);
                setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Authentification</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {/* {error && <div className={styles.error_msg}>{error}</div>} */}
                        <button type="submit" className={styles.green_btn}>
                            Se connecter
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Serveur</h1>
                    <Link to="/loginser">
                        <button type="button" className={styles.white_btn}>
                            Changer
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
