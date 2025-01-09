import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/order/order`)
      .then((response) => {
        console.log(response.data); // Afficher les données récupérées
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commandes:", error);
        
      });
  }, []);
  
 

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/api/order/order/${orderId}`, { status: newStatus })
      .then(() => {
        setOrders(orders.map((order) => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du statut:", error);
      });
  };

  const handleDeleteOrder = (orderId) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/api/order/order/${orderId}`)
      .then(() => {
        // Filtrer la commande supprimée dans la liste des commandes
        setOrders(orders.filter((order) => order._id !== orderId));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la commande:", error);
      });
  };

  // Styles intégrés
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    statusBadge: (status) => ({
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      color: {
        Pending: "#856404",
        Confirmed: "#155724",
        Cancelled: "#721c24",
      }[status],
      backgroundColor: {
        Pending: "#fff3cd",
        Confirmed: "#d4edda",
        Cancelled: "#f8d7da",
      }[status],
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      marginBottom: "20px",
    },
    article: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#f3f4f6",
      padding: "10px",
      borderRadius: "5px",
    },
    select: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      outline: "none",
      cursor: "pointer",
    },
    title: {
      color: '#007bff',
      textAlign: 'center',
      marginBottom: '20px',
    },
    deleteButton: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.title}>
        Gestion des Commandes
      </h1>
     
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#fff", borderRadius: "8px" }}>
          Aucune commande trouvée.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
          <div style={styles.header}>
            <div>
              <h3 style={{ margin: 0 }}>Commande #{order._id}</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                {new Date(order.createdAt).toLocaleDateString()} à{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <span style={styles.statusBadge(order.status)}>{order.status}</span>
          </div>
        
          <div style={styles.grid}>
            <div>
              <h4 style={{ margin: 0, fontWeight: "bold" }}>Client</h4>
              <p style={{ margin: "5px 0" }}>
  {order.clientId ? `${order.clientId.firstName} ${order.clientId.lastName}` : "Client non trouvé"}
</p>
<p style={{ margin: "5px 0", fontSize: "14px", color: "#6b7280" }}>
  {order.clientId?.email || "Email non trouvé"}
</p>
<p style={{ margin: "5px 0", fontSize: "14px", color: "#6b7280" }}>
  {order.clientId?.phone|| "Téléphone non trouvé"}
</p>

            </div>
            <div style={{ textAlign: "right" }}>
              <h4 style={{ margin: 0, fontWeight: "bold" }}>Total</h4>
              <p style={{ fontSize: "20px", fontWeight: "bold", margin: "5px 0" }}>
                {order.totalPrice}DNT
              </p>
            </div>
          </div>
        
          <div style={styles.grid}>
            {order.items?.map((item) => (
              <div key={item._id} style={styles.article}>
                {item.articleId?.image && (
                  <img
                  src={`http://localhost:5000${item.articleId.image}`}
                  alt={item.articleId.name}
                  style={{ width: "50px", height: "50px", borderRadius: "5px", objectFit: "cover" }}
                />
                
                )}
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {item.articleId?.name || "Article inconnu"}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#6b7280" }}>
                    Quantité: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        
          {/* Actions */}
          <div style={{ marginTop: "20px", paddingTop: "10px", borderTop: "1px solid #e5e7eb" }}>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              style={styles.select}
            >
              <option value="Pending">En attente</option>
              <option value="Confirmed">Confirmée</option>
              <option value="Cancelled">Annulée</option>
            </select>
        
            <button
              style={styles.deleteButton}
              onClick={() => handleDeleteOrder(order._id)}
            >
              Supprimer
            </button>
          </div>
        </div>
        
        ))
      )}
    </div>
  );
};

export default OrderPage;
