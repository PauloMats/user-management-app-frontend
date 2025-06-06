import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar o token JWT às requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação (ex: token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Exemplo: Limpar token e redirecionar para login
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      // Idealmente, usar o AuthContext para deslogar e o router para navegar
      if (window.location.pathname !== '/login') {
         // window.location.href = '/login'; // Causa refresh total. Melhor usar navegação do React Router.
         // Disparar um evento ou usar contexto para deslogar de forma mais elegante.
         console.error("Token inválido ou expirado. Redirecionando para login...");
         // Em uma app real, você chamaria uma função do AuthContext para deslogar.
      }
    }
    return Promise.reject(error);
  }
);

export default api;