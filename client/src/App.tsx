import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const [showProtectedRoute, setShowProtectedRoute] = useState(false)

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2VkNmFlYzM3Mjk5YTdlOTQ2YmI0MSIsImlhdCI6MTY4MTg1MDY3M30.B-NAZE7hZykDlOMy6zGcRn1yLH34Wj4dtfw590UEhQo'

  useEffect(() => {
    const getProtectedRoute = async () => {
      await fetch('http://localhost:4000/protected-route', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      })
      setShowProtectedRoute(true)
    }
    if (token) {
      getProtectedRoute()
    }
  }, [])

  return (
    <div className="App">
      <Navbar />
      {showProtectedRoute && <ProtectedRoute />}
    </div>
  )
}

export default App
