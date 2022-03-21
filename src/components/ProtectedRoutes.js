import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { auth } from '../utils/firebase-config';
 
const ProtectedRoutes = () => {

    const location = useLocation()

  return (
    auth.currentUser ? <Outlet/> : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default ProtectedRoutes