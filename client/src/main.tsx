import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import TodoPage from './components/TodoPage'
import AuthProvider, { AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// need to add context to the main file to access isauth 
function Routes() {
  const {isAuth} = useContext(AuthContext)

  const router = createBrowserRouter([
    {
      path: '/',
      element: 1 + 1 == 2 ? <App /> : <Register />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/todos',
      element: isAuth ? <TodoPage /> : <Navigate to='/login' />,
    },
    {
      path: '/protected-route',
      element: <ProtectedRoute />,
    },
  ])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}

function Main() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </React.StrictMode>,
  )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Main />
)
