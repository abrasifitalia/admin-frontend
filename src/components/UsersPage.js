import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';  // Assurez-vous que axios est bien importé

const UserPage = () => {
  const [clients, setClients] = useState([]);  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // Ajout de l'état pour le message

  // Fonction pour récupérer les clients
  const fetchClients = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/client/client/list`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setClients(data);  
      } else {
        throw new Error('Échec de la récupération des clients');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error.message);
      setError(error.message);
    }
  };

  // Fonction pour supprimer un client
  const handleDelete = async (id) => {
    try {
      console.log('ID du client à supprimer:', id);  // Vérifiez l'ID ici
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/client/client/${id}`);
      console.log('Client supprimé:', response);
      setMessage('Client supprimé avec succès !');
      fetchClients();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError('Erreur lors de la suppression du client');
    }
  };
  
  
    
  // Charger les clients au chargement du composant
  useEffect(() => {
    fetchClients();
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
    errorMessage: {
      color: '#e74c3c',
      fontSize: '16px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    noClientsText: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#888',
    },
    successMessage: {
      color: '#2ecc71',
      fontSize: '16px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.title}>Gestion des Clients</h2>

      {/* Affichage des messages */}
      {message && <div style={styles.successMessage}>{message}</div>}

      {/* Affichage des erreurs */}
      {error && <div style={styles.errorMessage}>{error}</div>}

      {/* Affichage des clients */}
      {clients.length === 0 ? (
        <p style={styles.noClientsText}>Aucun client trouvé.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Nom</th>
                <th style={styles.tableCell}>Email</th>
                <th style={styles.tableCell}>Téléphone</th>
               
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client._id}>
                  <td style={styles.tableCell}>{client.firstName} {client.lastName}</td>
                  <td style={styles.tableCell}>{client.email}</td>
                  <td style={styles.tableCell}>{client.phone}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPage;
