import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getSessionStorage } from './storage';
import React, { useEffect, useState } from 'react';

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

  // Render loading state until authentication status is determined.
  if (isAuthenticated === null) {
    return <Loader/>
  }

  // Redirect to login if not authenticated.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if authenticated.
  return children;
};

export default ProtectedRoute;
