import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { logout } = useAuth()
  return (
    <nav className={"w-full fixed top-0 flex justify-center items-center space-x-5 py-4 bg-opacity-50 backdrop-blur-md bg-white "}>
      <Link className={"text-xl font-bond text-stone-900"} to="/home#library">Bibliothèque</Link>
      <Link className={"text-xl font-bond text-stone-900"} to="/home#account">Mon compte</Link>
      <button className={"text-xl font-bond text-stone-900"} onClick={logout}>Se déconnecter</button>
    </nav>
  )
}

export default Navbar
