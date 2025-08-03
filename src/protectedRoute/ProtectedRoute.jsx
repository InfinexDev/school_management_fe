import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isProtected = false, isPublicOnly = false, allowedRoles = [] }) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  if (isProtected && !token) {
    return <Navigate to="/home" replace />;
  }

  if (isPublicOnly && token) {
    return <Navigate to="/home" replace />;
  }
 if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
