import { useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProtectedRoute from './components/ProtectedRoute'
import {AuthContext} from './context/AuthContext'

function App() {
  // @ts-ignore

  const {isAuth, login, name, setName, token, setToken} = useContext(AuthContext)

  const [showProtectedRoute, setShowProtectedRoute] = useState(false)

  useEffect(() => {
    setShowProtectedRoute(!showProtectedRoute)
  }, [isAuth])

  return (
    <div className="App">
      <Navbar />
      <div>
        <h1>hello world</h1>
      </div>
    </div>
  )
}

export default App
