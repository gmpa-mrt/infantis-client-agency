import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@radix-ui/themes/styles.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<App />}
        path="/home"
        errorElement={<ErrorPage />}/>

      <Route
        path="/login"
        element={<LoginPage/>}
        errorElement={<ErrorPage/>}
      />

      <Route
        path="*"
        element={<ErrorPage/>}
      />

    </>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </Theme>
  </React.StrictMode>,
)
