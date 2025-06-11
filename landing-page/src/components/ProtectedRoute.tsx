import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ROUTES from '../utils/routes';

interface ProtectedRouteProps {
  requiredRole: 'admin' | 'member';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (user?.role !== requiredRole) {
    return <Navigate to={ROUTES.GUEST_HOME} replace />;
  }

  return <Outlet />;
}; 