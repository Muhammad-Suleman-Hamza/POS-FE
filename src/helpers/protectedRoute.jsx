import { useSelector } from 'react-redux';
import { getSessionStorage } from './storage';
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // useEffect(() => {
  //   console.log('herhe :: ', user?.sessionToken !== "")
  //   if (user?.sessionToken !== "") setIsAuthorized(true)
  // }, [user, isAuthorized])

  // console.log('isAuthorized :: ', isAuthorized)

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
