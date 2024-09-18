import { Link } from 'react-router-dom'

type Props = {}

export default function Header({}: Props) {
  return (
    <header>
        <h1><Link to='/'>CookJoy</Link></h1>
        <nav>
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
          <Link to="/recipes">Recipes</Link>
        </nav>
      </header>
  )
}