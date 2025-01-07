// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/', // ou l'URL de ton backend
});

export default api;
