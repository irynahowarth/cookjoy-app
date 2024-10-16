import { Link } from 'react-router-dom'
import useAuth from '../context/auth'

type Props = {}

export default function Header({}: Props) {
  const {user, logout} = useAuth();
  return (
    <header>
        <h1><Link to='/'>CookJoy</Link></h1>
        <nav>
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
          <Link to="/recipes">Recipes</Link>
          {!user 
          ? <Link to="/login">Log In</Link>
          : <Link to="." onClick={logout}>Log Out</Link>
          }
        </nav>
      </header>
  )
}