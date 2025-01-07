import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import ArticlePage from '../components/ArticlesPage';
import CategoryPage from '../components/CategoriesPage';
import SubCategoryPag from '../components/SubCategoryPag';
import UserPage from '../components/UsersPage';
import OrderPage from '../components/OrderPage';
import ViewPage from '../components/ViewPage';
import Home from '../components/Dashboard';

import EditArticlePage from '../components/EditArticle';
import './dash.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
const [subCategories, setSubCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedSubCategory, setSelectedSubCategory] = useState("");
const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Hook pour la navigation

  // Charger les articles depuis le backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/article/article');
        setArticles(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des articles.');
        console.error('Erreur:', err);
      }
    };
    fetchArticles();
  }, []);

  // Fonction pour supprimer un article
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/article/article/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression de l\'article.');
      console.error('Erreur:', err);
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes, subCategoriesRes] = await Promise.all([
          fetch("http://localhost:5000/api/article/article"),
          fetch("http://localhost:5000/api/category/categories"),
          fetch("http://localhost:5000/api/subcategory/subcategory"),
        ]);
  
        setArticles(await articlesRes.json());
        setCategories(await categoriesRes.json());
        setSubCategories(await subCategoriesRes.json());
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };
  
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    const matchesSubCategory = selectedSubCategory ? article.subcategory === selectedSubCategory : true;
    return matchesCategory && matchesSubCategory;
  });
  


  
  const showAllArticles = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
  };
  

  // Fonction pour rediriger vers la page de modification
  const handleEdit = (id) => {
    navigate(`/edit-article/${id}`); // Rediriger vers la page d'édition de l'article
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full z-30 bg-white shadow-md">
        {/* Navbar content */}
      </div>
  
      <div className={`flex-1 flex transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className={`lg:block fixed top-0 left-0 w-64 bg-gray-800 p-4 z-20 ${sidebarOpen ? 'block' : 'hidden'}`}>
          <Navbar />
        </div>
  
        <main className="flex-1 ml-0 lg:ml-64 mt-16 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<ArticlePage />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/subcategories" element={<SubCategoryPag />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/views" element={<ViewPage />} />
              <Route path="/edit-article/:id" element={<EditArticlePage />} /> {/* Route pour la page d'édition */}
            </Routes>
  
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <div className="navbar-collapse collapse justify-content-center" id="navbarSupportedContent">
      <ul className="navbar-nav">
        {categories.map((category) => (
          <li key={category._id} className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setSelectedCategory(category._id)}
              id={`dropdown${category._id}`}
            >
              {category.name}
            </button>
            {selectedCategory === category._id && (
              <div className="dropdown-menu show" aria-labelledby={`dropdown${category._id}`}>
                {subCategories.filter(subCat => subCat.categoryId?._id === selectedCategory).map(subCat => (
                  <button
                    key={subCat._id}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedSubCategory(subCat._id);
                      setSelectedCategory(null); // Fermer la liste déroulante
                    }}
                  >
                    {subCat.name}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
        <li className="nav-item">
          <button
            className="nav-link"
            onClick={showAllArticles}
          >
            Voir tous les articles
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>


          </div>
  
          <div className="p-4 lg:p-8">
  <h2 className="text-2xl font-semibold mb-4">Articles Disponibles</h2>
  {error && <p className="text-red-500">{error}</p>}
  {loading ? (
    <p>Chargement des articles...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.length === 0 ? (
        <p>Aucun article disponible.</p>
      ) : (
        filteredArticles.map((article) => (
          <div key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="flex-shrink-0">
              {article.image && (
                <img
                  src={`http://localhost:5000${article.image}`}
                  onError={(e) => { e.target.src = '/path/to/default-image.jpg'; }}
                  alt={article.name}
                  className="h-48 w-full object-cover"
                />
              )}
              {article.video && (
                <video controls className="h-48 w-full object-cover">
                  <source
                    src={`http://localhost:5000${article.video}`}
                    type="video/mp4"
                  />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              )}
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <h5 className="text-xl font-semibold">{article.name}</h5>
                <p className="mt-2 text-gray-500">{article.description}</p>
                <p className="mt-2 font-semibold text-lg">Prix : {article.price} DNT</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(article._id)}
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => handleEdit(article._id)}
                  className="btn btn-warning"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )}
</div>

        </main>
      </div>
  
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
  
};

export default AdminDashboard;
