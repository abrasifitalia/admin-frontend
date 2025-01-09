import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // Récupérer les catégories existantes
  useEffect(() => {
    const fetchCategories = async () => {
      try {
           const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`);
        setCategories(response.data);
      } catch (error) {
        setMessage('Erreur lors du chargement des catégories.');
      }
    };

    fetchCategories();
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`, { name: categoryName });
      setMessage(`Catégorie '${response.data.name}' créée avec succès!`);
      setCategoryName('');
      const newCategories = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`);
      setCategories(newCategories.data);
    } catch (error) {
      setMessage('Erreur lors de la création de la catégorie.');
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories/${categoryId}`);
      if (response.status === 200) {
        setMessage('Catégorie supprimée avec succès!');
        // Mettre à jour la liste des catégories après la suppression
        const newCategories = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`);
        setCategories(newCategories.data);
      } else {
        setMessage('Échec de la suppression de la catégorie.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      if (error.response) {
        // Si la réponse d'erreur vient du backend
        setMessage(`Erreur : ${error.response.data.message || 'Erreur inconnue'}`);
      } else {
        // Si c'est un problème réseau ou autre erreur
        setMessage('Erreur de connexion au serveur.');
      }
    }
  };
  

  // Définir les styles intégrés
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      color: '#007bff',
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px',
    },
    input: {
      width: '80%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
    },
    submitButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    message: {
      textAlign: 'center',
      color: '#28a745',
      fontSize: '16px',
    },
    categoriesList: {
      marginTop: '20px',
    },
    categoryItems: {
      listStyleType: 'none',
      padding: '0',
    },
    categoryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
    },
    categoryName: {
      fontSize: '18px',
    },
    deleteButton: {
      color: 'red',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.title}>Créer une catégorie</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Nom de la catégorie"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button style={styles.submitButton} type="submit">Créer</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.categoriesList}>
        <h2>Liste des catégories</h2>
        <ul style={styles.categoryItems}>
          {categories.map((category) => (
            <li key={category._id} style={styles.categoryItem}>
              <span style={styles.categoryName}>{category.name}</span>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(category._id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategory;
