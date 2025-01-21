import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CreateArticle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [fonctionnalite, setFonctionnalite] = useState('');
  const [ficheTechnique, setFicheTechnique] = useState(null); // State for ficheTechnique file
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleFicheTechniqueChange = (e) => {
    setFicheTechnique(e.target.files[0]); // Handle ficheTechnique file change
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/category/categories`);
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
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/subcategory/subcategory/category/${category}`)
        .then((response) => {
          console.log('Subcategories fetched:', response.data);
          setSubcategories(response.data.subCategories);
        })
        .catch((err) => {
          console.error('Error fetching subcategories:', err);
          setSubcategories([]);
        });
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('fonctionnalite', fonctionnalite);
    if (ficheTechnique) formData.append('ficheTechnique', ficheTechnique); // Append ficheTechnique file to formData
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/article/article`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      alert(response.data.message);
    } catch (err) {
      setLoading(false);
      console.error('Erreur lors de la création de l\'article:', err);
      setError('Erreur lors de la création de l\'article.');
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
        <h1 style={styles.title}>Créer un Article</h1>
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
            <label style={styles.label}>Fiche Technique (optionnel, PDF) :</label>
            <input
              type="file"
              accept="application/pdf" // Accept only PDF files
              onChange={handleFicheTechniqueChange} // Handle ficheTechnique file change
              style={styles.input}
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
            {loading ? 'Création en cours...' : 'Créer l\'article'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
