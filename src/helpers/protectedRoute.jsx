import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getSessionStorage } from './storage';

const ProtectedRoute = ({ children }) => {
  const { checkSession } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Null for loading state.

  useEffect(() => {
    const verifySession = async () => {
      try {
        const token = getSessionStorage('sessionToken');
        
        if (!token) {
          setIsAuthenticated(false); // No token, not authenticated.
          return;
        }

        const isValid = await checkSession(token);
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error('Error verifying session:', error);
        setIsAuthenticated(false); // Treat as unauthenticated on errors.
      }
    };

    verifySession();
  }, []); // Empty dependency array to prevent infinite re-renders.

  console.log('px :: isAuthenticated :: ', isAuthenticated);

  // Render loading state until authentication status is determined.
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if authenticated.
  return children;
};

export default ProtectedRoute;
