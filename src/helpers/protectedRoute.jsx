import { useSelector } from 'react-redux';
import { getSessionStorage } from './storage';
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    console.log('herhe :: ', user?.sessionToken !== "")
    if (user?.sessionToken !== "") setIsAuthorized(true)
  }, [user, isAuthorized])

  console.log('isAuthorized :: ', isAuthorized)

  return (
    isAuthorized ? <Outlet /> : <Navigate to='/login' />
  )
}

export default ProtectedRoute;