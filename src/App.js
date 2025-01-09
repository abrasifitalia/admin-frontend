// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import ArticlePage from './components/ArticlesPage';
import CategoryPage from './components/CategoriesPage';
import SubCategoryPage from './components/SubCategoryPag';
import UserPage from './components/UsersPage';
import OrderPage from './components/OrderPage';
import ViewPage from './components/ViewPage';
import MessagesPage from './components/MessagesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditArticle from './components/EditArticle';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/articles" element={<ArticlePage />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/subcategories" element={<SubCategoryPage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/views" element={<ViewPage />} />
              <Route path='/messages' element={<MessagesPage/>}/>
              <Route path="/edit-article/:id" element={<EditArticle />} />

        {/* Ajoute d'autres routes pour les pages de gestion */}
      </Routes>
    </Router>
  );
};

export default App;
