import { createContext, useState } from 'react'

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
    }

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, login, logout, name, setName, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider
