import { Link } from 'react-router-dom'
import useAuth from '../context/auth'

type Props = {}

export default function Header({}: Props) {
  const {user, logout} = useAuth();

  const linkStyles ="inline-block px-4 py-3 text-base text-gray-95 bg-blend-multiply hover:bg-black/[2.5%] hover:text-gray-950"
    
  return (
    <header className='py-10'>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className='relative z-50 flex justify-between'>
          <div className="flex items-center md:gap-x-12">
            <Link aria-label="Home" to='/' className="px-2 py-1 text-md font-semibold">Cook<span className="text-pink-600">Joy</span></Link>
          </div>
          <div className='hidden md:flex items-center gap-x-3 md:gap-x-5'>
            <Link to="/create" className={linkStyles}>Create</Link>
            <Link to="/about" className={linkStyles}>About</Link>
            <Link to="/recipes" className={linkStyles}>Recipes</Link>
            {!user 
            ? <Link to="/login" className={linkStyles}>Log In</Link>
            : <Link to="." onClick={logout} className={linkStyles}>Log Out</Link>
            }
          </div>
        </nav>
      </div>
    </header>
  )
}