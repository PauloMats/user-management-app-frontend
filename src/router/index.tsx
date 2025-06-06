import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserProfilePage from '../pages/UserProfilePage';
import AdminUserListPage from '../pages/AdminUserListPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import { UserRole } from '../types/user';
import { useAuth } from '../hooks/useAuth';

const AppRoutes: React.FC = () => {
  const { isLoading } = useAuth(); // Para evitar renderização prematura de rotas protegidas

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Carregando...</p></div>;
  }

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rota Raiz - Redireciona com base na autenticação */}
      <Route path="/" element={<NavigateToDashboard />} />


      {/* Rotas Protegidas para Usuários Autenticados */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]} />}>
        <Route path="/profile" element={<UserProfilePage />} />
      </Route>

      {/* Rotas Protegidas para Administradores */}
      <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
        <Route path="/admin/users" element={<AdminUserListPage />} />
      </Route>

      {/* Rota Não Encontrada */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const NavigateToDashboard: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return user?.role === UserRole.ADMIN ? <Navigate to="/admin/users" replace /> : <Navigate to="/profile" replace />;
};


export default AppRoutes;