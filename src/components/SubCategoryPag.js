import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CreateSubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/category/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Erreur lors du chargement des catégories:', error));

    axios.get('http://localhost:5000/api/subcategory/subcategory')
      .then((response) => setSubcategories(response.data))
      .catch((error) => console.error('Erreur lors du chargement des sous-catégories:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !subcategoryName) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/subcategory/subcategory', {
        name: subcategoryName,
        categoryId: selectedCategory,
      });
      setSuccessMessage('Sous-catégorie ajoutée avec succès');
      setErrorMessage('');
      setSubcategoryName('');
      setSelectedCategory('');
      const subcategoriesResponse = await axios.get('http://localhost:5000/api/subcategory/subcategory');
      setSubcategories(subcategoriesResponse.data);
    } catch {
      setErrorMessage('Erreur lors de l\'ajout de la sous-catégorie');
      setSuccessMessage('');
    }
  };

  const handleDelete = async (subcategoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/subcategory/subcategory/${subcategoryId}`);
      setSuccessMessage('Sous-catégorie supprimée avec succès');
      setErrorMessage('');
      const subcategoriesResponse = await axios.get('http://localhost:5000/api/subcategory/subcategory');
      setSubcategories(subcategoriesResponse.data);
    } catch {
      setErrorMessage('Erreur lors de la suppression de la sous-catégorie');
      setSuccessMessage('');
    }
  };

  // Définir les styles intégrés
  const styles = {
    container: {
      width: '80%',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif',
    },
    alert: {
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '5px',
    },
    alertError: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    alertSuccess: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
    },
    formContainer: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonPrimary: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    buttonDanger: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#f4f4f4',
      fontWeight: 'bold',
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
    },
    title: {
      color: '#007bff',
      textAlign: 'center',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.title}>Gestion des sous-catégories</h2>

      {errorMessage && <div style={{ ...styles.alert, ...styles.alertError }}>{errorMessage}</div>}
      {successMessage && <div style={{ ...styles.alert, ...styles.alertSuccess }}>{successMessage}</div>}

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="category" style={styles.label}>Catégorie</label>
            <select
              id="category"
              name="categoryId"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="subcategoryName" style={styles.label}>Nom de la sous-catégorie</label>
            <input
              type="text"
              id="subcategoryName"
              name="name"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              style={styles.input}
              required
              placeholder="Entrez le nom de la sous-catégorie"
            />
          </div>

          <div style={styles.formGroup}>
            <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>
              Ajouter la sous-catégorie
            </button>
          </div>
        </form>
      </div>

      <h3>Liste des sous-catégories</h3>
      {subcategories.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nom de la sous-catégorie</th>
              <th style={styles.th}>Catégorie</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory) => (
              <tr key={subcategory._id}>
                <td style={styles.td}>{subcategory.name}</td>
                <td style={styles.td}>{subcategory.categoryId.name}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.buttonDanger }}
                    onClick={() => handleDelete(subcategory._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune sous-catégorie disponible.</p>
      )}
    </div>
  );
};

export default CreateSubcategory;
