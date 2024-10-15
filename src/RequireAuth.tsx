import { Navigate } from 'react-router-dom';
import useAuth from './context/auth';


export default function RequireAuth({children, redirectTo}) {
  const {isAuthenticated} = useAuth()
  return isAuthenticated? children : <Navigate to={redirectTo}/>
}
