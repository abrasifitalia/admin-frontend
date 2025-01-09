import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ArrowLeftCircle, Home, FileText, Layers, Eye, MessageCircle, Users } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    /* Sidebar avec Bootstrap */
<div className="d-flex flex-column bg-dark text-white h-100">
  <div className="sidebar-header p-3 text-center fs-4">Mon Tableau</div>
  <div className="sidebar-menu flex-grow-1">
    <ul className="list-unstyled">
      <li className="mb-3">
        <Link 
          to="/dashboard" 
          className="btn btn-link text-white w-100 text-start d-flex align-items-center p-2 rounded hover:bg-secondary">
          <Home className="w-5 h-5 me-3" /> Tableau de bord
        </Link>
      </li>
      <li className="mb-3">
        <Link 
          to="/orders" 
          className="btn btn-link text-white w-100 text-start d-flex align-items-center p-2 rounded hover:bg-secondary">
          <FileText className="w-5 h-5 me-3" /> Commandes
        </Link>
      </li>
      <li className="mb-3">
        <Link 
          to="/categories" 
          className="btn btn-link text-white w-100 text-start d-flex align-items-center p-2 rounded hover:bg-secondary">
          <Layers className="w-5 h-5 me-3" /> Catégories
        </Link>
      </li>
      <li className="mb-3">
        <Link 
          to="/subcategories" 
          className="btn btn-link text-white w-100 text-start d-flex align-items-center p-2 rounded hover:bg-secondary">
          <Layers className="w-5 h-5 me-3" /> Sous-catégories
        </Link>
      </li>
      <li className="mb-3">
        <Link 
          to="/views" 
          className="btn btn-link text-white w-100 text-start d-flex align-items-center p-2 rounded hover:bg-secondary">
          <Eye className="w-5 h-5 me-3" /> Vues
        </Link>
      </li>
      <li className="mb-3">
        <Link 
          to="/messages" 
          className="btn btn-link text-white w-100 text-start d-flex align-items-center p-2 rounded hover:bg-secondary">
          <MessageCircle className="w-5 h-5 me-3" /> Messages
        </Link>
      </li>
      <li className="mb-3">
        <Link 
          to="/users" 
          className="btn btn-link text-white w-100 text-start d-flex align-items-center p-2 rounded hover:bg-secondary">
          <Users className="w-5 h-5 me-3" /> Utilisateurs
        </Link>
      </li>
    </ul>
  </div>
  <div className="sidebar-footer mt-auto p-3">
    <button 
      onClick={handleLogout} 
      className="btn btn-danger w-100">
      Déconnexion
    </button>
  </div>
</div>


  );
};

export default Sidebar;
