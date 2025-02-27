// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
  if (!user) {
    return <Navigate to="/auth/SignIn" />;
  }

  // Si l'utilisateur n'a pas le bon rôle, redirigez-le vers une page d'erreur
  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Si tout est bon, affichez la route demandée
  return <Outlet />;
};

export default ProtectedRoute;