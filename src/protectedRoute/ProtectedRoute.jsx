import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isProtected = false, isPublicOnly = false }) => {
  const token = localStorage.getItem('accessToken');

  if (isProtected && !token) {
    return <Navigate to="/home" replace />;
  }

  if (isPublicOnly && token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
