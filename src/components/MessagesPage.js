import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/message/message/');
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      setLoading(false);
    }
  };

  // Fonction pour supprimer un message
  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/message/message/${messageId}`);
      setMessages(messages.filter((message) => message._id !== messageId)); // Mise à jour de l'état
    } catch (error) {
      console.error('Erreur lors de la suppression du message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Définir les styles intégrés
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
    deleteButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    loadingText: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#888',
    },
    noMessagesText: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#888',
    },
  };

  return (
    <div>
      <Navbar />
    <div style={styles.container}>
      
      <h2 style={styles.title}>Gestion des Messages</h2>

      {/* Affichage des messages */}
      {loading ? (
        <p style={styles.loadingText}>Chargement des messages...</p>
      ) : messages.length === 0 ? (
        <p style={styles.noMessagesText}>Aucun message trouvé.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>ID Utilisateur</th>
                <th style={styles.tableCell}>Message</th>
                <th style={styles.tableCell}>Date</th>
                <th style={styles.tableCell}>Phone</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message._id}>
                  <td style={styles.tableCell}>{message.nom}</td>
                  <td style={styles.tableCell}>{message.message}</td>
                  <td style={styles.tableCell}>{message.phone}</td>
                  <td style={styles.tableCell}>{new Date(message.createdAt).toLocaleString()}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => deleteMessage(message._id)}
                      style={styles.deleteButton}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default MessagePage;
