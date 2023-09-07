import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

const ErrorPage = () => {
  const {user} = useAuth()

  console.log("Error Page ===> ", user)

  return user ? <Navigate to={'/home'} replace /> : <Navigate to={'/login'} replace />
}

export default ErrorPage
