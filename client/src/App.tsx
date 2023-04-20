import { useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProtectedRoute from './components/ProtectedRoute'
import {AuthContext} from './context/AuthContext'

function App() {

  const {isAuth, login, name, setName, token, setToken} = useContext(AuthContext)

  const [showProtectedRoute, setShowProtectedRoute] = useState(false)

  useEffect(() => {
    setShowProtectedRoute(!showProtectedRoute)
  }, [isAuth])

  return (
    <div className="App">
      <Navbar />
      {showProtectedRoute && <ProtectedRoute token={token}/>}
      <div>
        <p>name: {name}</p>
        <p>token: {token}</p>
        <p>auth: {isAuth ? 'true' : 'false'}</p>
      </div>
    </div>
  )
}

export default App
