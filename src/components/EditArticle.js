import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

import { useParams } from 'react-router-dom';

const EditArticle = () => {
  const { id } = useParams();  // Extraire l'ID depuis l'URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [fonctionnalite, setFonctionnalite] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('ID de l\'article manquant.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/article/article/get/${id}`);
        const article = response.data;
        setName(article.name);
        setDescription(article.description);
        setPrice(article.price);
        setFonctionnalite(article.fonctionnalite);
        setCategory(article.category);
        setSubcategory(article.subcategory);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'article:', error.response || error);
        setError('Erreur lors du chargement de l\'article.');
      }
    };
    fetchArticle();
  }, [id]);
  
  // ... Le reste de votre code ...


  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:5000/api/category/categories');
        setCategories(categoryResponse.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
        setError('Erreur lors du chargement des catégories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:5000/api/subcategory/subcategory/category/${category}`)
        .then((response) => {
          console.log('Subcategories fetched:', response.data);
          setSubcategories(response.data.subCategories); // Vérifiez que `subCategories` est la clé correcte
        })
        .catch((err) => {
          console.error('Error fetching subcategories:', err);
          setSubcategories([]); // Réinitialisez si erreur
        });
    }
  }, [category]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('fonctionnalite', fonctionnalite);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/article/article/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      alert(response.data.message);
    } catch (err) {
      setLoading(false);
      console.error('Erreur lors de la modification de l\'article:', err);
      setError('Erreur lors de la modification de l\'article.');
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      resize: 'vertical',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    error: {
      color: 'red',
      marginBottom: '20px',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    title: {
      color: '#007bff',
      textAlign: 'center',
      marginBottom: '20px',
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.title}>Modifier l'Article</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nom de l'article :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description :</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Prix :</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Catégorie :</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sous-catégorie :</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">Sélectionnez une sous-catégorie</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fonctionnalité :</label>
            <textarea
              value={fonctionnalite}
              onChange={(e) => setFonctionnalite(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image :</label>
            <input type="file" onChange={handleImageChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Vidéo :</label>
            <input type="file" onChange={handleVideoChange} style={styles.input} />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Sauvegarder les modifications' : 'Modifier l\'article'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;