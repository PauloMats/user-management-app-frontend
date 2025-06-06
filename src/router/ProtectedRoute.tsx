import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/user';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Verificando autenticação...</p></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Usuário autenticado mas não tem o papel necessário
    // Pode redirecionar para uma página de "Acesso Negado" ou para o perfil
    return <Navigate to="/profile" replace />; // Ou uma página específica de "não autorizado"
  }

  return <Outlet />; // Renderiza o componente filho (a rota protegida)
};

export default ProtectedRoute;
