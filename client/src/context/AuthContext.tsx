import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [name, setName] = useState('')
    const [token, setToken] = useState('')

    const login = () => {
        setIsAuth(true)
    }

    const logout = () => {
        setIsAuth(false)
        setName('')
        setToken('')
        const navigate = useNavigate()
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, login, logout, name, setName, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider
