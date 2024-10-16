import { Navigate } from 'react-router-dom';
import useAuth from './context/auth';


export default function RequireAuth({children, redirectTo}) {
  const {user} = useAuth()
  return user? children : <Navigate to={redirectTo}/>
}
