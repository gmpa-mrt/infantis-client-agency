import React, { createContext, useState, useContext, useEffect } from 'react'
import jwt from "jsonwebtoken";
import { getDecryptedCookie, setEncryptedCookie } from '../security/encryptedCookie.js'
const apiUrl = import.meta.env.VITE_API_URL;

// Créez le contexte d'authentification
const AuthContext = createContext();

// Un composant de contexte qui fournira les méthodes d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // L'état de l'utilisateur
  const [token, setToken] = useState(null); // L'état de l'utilisateur

  // Méthode de connexion
  const login = (token) => {
    const agencyToken = jwt.decode(token, apiUrl)
    setEncryptedCookie('infantis', agencyToken.agency.token)
    setToken(agencyToken.agency.token);
  };

  const getMe = async () => await fetch(`${apiUrl}/agency/me`, {
    method: 'POST',
    headers: {
      'Authorization' : `Bearer ${token}`
    }
  })

  // Méthode de déconnexion
  const logout = () => {
    setUser(null);
  };

  // Le contexte à fournir à toute l'application
  const contextValue = {
    token,
    user,
    login,
    logout,
  };

  useEffect(() => {
    const currentToken = getDecryptedCookie('infantis')

    if (currentToken) {
      setToken(currentToken)
    }

    if (token !== null) {
      getMe()
        .then((response) => {
          if (!response.ok) {
            throw new Error('La requête a échoué');
          }
          return response.json(); // Vous pouvez également utiliser response.json() si la réponse est au format JSON
        })
        .then(response => {
          setUser(response)
        })
    }
  }, [token])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Un hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};
