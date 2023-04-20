import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import TodoPage from './components/TodoPage'
import AuthProvider from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'


const router = createBrowserRouter([
  {
    path: '/',
    element: 1 + 1 == 3 ? <App /> : <Navigate to='/login' />,
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
    element: <TodoPage />,
  },
  {
    path: '/protected-route',
    element: <ProtectedRoute />,
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
