import React from 'react';
import { Home, FileText, Layers, Users, LogOut, Eye, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or session data (e.g., from localStorage)
    localStorage.removeItem('authToken');  // If using localStorage for authentication
    sessionStorage.removeItem('authToken'); // If using sessionStorage

    // Optionally, clear any other session-related data, like user info
    // localStorage.removeItem('userInfo'); // Example if you store user info in localStorage

    console.log('Déconnexion réussie');

    // Redirect to the home page (or any page you want after logout)
    navigate('/');
  };

  return (
    <div className="navbar bg-gray-800 text-white flex items-center justify-between p-4">
      {/* Logo */}
      <div className="logo text-2xl font-bold">
        Mon Tableau
      </div>

      {/* Navigation Links */}
      <div className="nav-links flex gap-6">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <Home className="w-5 h-5" />
          Tableau de bord
        </Link>
        <Link
          to="/orders"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <FileText className="w-5 h-5" />
          Commandes
        </Link>
        <Link
          to="/categories"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <Layers className="w-5 h-5" />
          Catégories
        </Link>
        <Link
          to="/subcategories"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <Layers className="w-5 h-5" />
          Sous-catégories
        </Link>
        <Link
          to="/views"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <Eye className="w-5 h-5" />
          Vues
        </Link>
        <Link
          to="/messages"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <MessageCircle className="w-5 h-5" />
          Messages
        </Link>
        <Link
          to="/users"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <Users className="w-5 h-5" />
          Utilisateurs
        </Link>
        {/* New Link for Articles */}
        <Link
          to="/articles"
          className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded"
        >
          <FileText className="w-5 h-5" />
          Articles
        </Link>
      </div>

      {/* Logout Button */}
      <div className="logout-button">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded bg-red-600 hover:bg-red-700"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Navbar;
