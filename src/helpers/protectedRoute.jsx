import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getSessionStorage } from './storage';

const ProtectedRoute = ({ children }) => {
  const { checkSession } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getSessionStorage('sessionToken');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      const result = checkSession(token);
      if (result) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [checkSession]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render protected route if authenticated
};

export default ProtectedRoute;
