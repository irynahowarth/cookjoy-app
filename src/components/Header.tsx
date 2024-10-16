import { Link } from 'react-router-dom'
import useAuth from '../context/auth'

type Props = {}

export default function Header({}: Props) {
  const {isAuthenticated, logout} = useAuth();
  return (
    <header>
        <h1><Link to='/'>CookJoy</Link></h1>
        <nav>
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
          <Link to="/recipes">Recipes</Link>
          {!isAuthenticated 
          ? <Link to="/login">Log In</Link>
          : <Link to="." onClick={logout}>Log Out</Link>
          }
        </nav>
      </header>
  )
}