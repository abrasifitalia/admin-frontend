import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const ViewPage = () => {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer toutes les vues
  const fetchViews = async () => {
    setLoading(true);
    try {
         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/view/view`);  // Récupérer toutes les vues
      setViews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des vues:', error);
      setLoading(false);
    }
  };

  // Fonction pour supprimer une vue spécifique
  const deleteView = async (viewId) => {
    try {
      // Envoi de la requête DELETE vers l'API pour supprimer la vue
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/view/view/${viewId}`);
      setViews(views.filter((view) => view._id !== viewId));  // Mise à jour de l'état en filtrant la vue supprimée
    } catch (error) {
      console.error('Erreur lors de la suppression de la vue:', error);
    }
  };

  useEffect(() => {
    fetchViews(); // Récupérer toutes les vues lors du chargement du composant
  }, []);

  const styles = {
    container: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#007bff',
      textAlign: 'center',
    },
    tableContainer: {
      overflowX: 'auto',
      marginTop: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #ddd',
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold',
    },
    tableCell: {
      padding: '12px',
      border: '1px solid #ddd',
      textAlign: 'left',
      fontSize: '16px',
    },
    noViewsText: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#888',
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Vues des Articles</h2>

        {/* Affichage des erreurs ou du chargement */}
        {loading ? (
          <p>Chargement des vues...</p>
        ) : views.length === 0 ? (
          <p style={styles.noViewsText}>Aucune vue trouvée.</p>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Nom Utilisateur</th>
                  <th style={styles.tableCell}>Téléphone Utilisateur</th>
                  <th style={styles.tableCell}>Email Utilisateur</th>
                  <th style={styles.tableCell}>Nom Article</th>
                  <th style={styles.tableCell}>Prix Article</th>
                  <th style={styles.tableCell}>Date de la Vue</th>
                  <th style={styles.tableCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {views.map((view) => {
                  const client = view.client || {};  // Si les données du client sont présentes
                  const article = view.article || {}; // Si les données de l'article sont présentes

                  return (
                    <tr key={view._id}>
                      <td style={styles.tableCell}>
                        {client.firstName ? `${client.firstName} ${client.lastName}` : 'Utilisateur inconnu'}
                      </td>
                      <td style={styles.tableCell}>
                        {client.phone || 'Téléphone inconnu'}
                      </td>
                      <td style={styles.tableCell}>
                        {client.email || 'Email inconnu'}
                      </td>
                      <td style={styles.tableCell}>
                        {article.name || 'Article inconnu'}
                      </td>
                      <td style={styles.tableCell}>
                        {article.price || 'Prix inconnu'}
                      </td>
                      <td style={styles.tableCell}>
                        {new Date(view.createdAt).toLocaleString()}
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => deleteView(view._id)} // Suppression de la vue par son ID
                          style={{
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPage;
