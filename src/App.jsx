import { useAuth } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollToHashElement from './components/ScrollToHashElement.jsx'
import Account from './components/account/Account.jsx'
import Library from './components/library/Library.jsx'
import ProtectedRoute from './security/ProtectedRoute.jsx'

const apiUrl = import.meta.env.VITE_API_URL

function App() {
  const { user, logout } = useAuth()

  const handleDestroy = async () =>  {
    await fetch(`${apiUrl}/agency/remove/${user.id}`, {
      method: 'POST'
    })

    await logout()
  }

  return (
      <ProtectedRoute user={user}>
        <header>
          <Navbar/>
        </header>
        <main className={"container mx-auto"}>
          <ScrollToHashElement />
          <Account/>
          <Library/>
        </main>
        <section>
          <button onClick={handleDestroy}>supprimer mon compte</button>
        </section>
      </ProtectedRoute>
  )
}

export default App
