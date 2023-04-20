import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {

    const {isAuth, login, logout, name}:any = useContext(AuthContext)

    return (
        <nav className="w-full h-16 bg-gray-800 flex items-center justify-center text-white px-6 p-2">
            <h1>Navbar</h1>
            <div className="ml-auto space-x-6 flex">
                
                <Link to={`/`} className={`hover:text-gray-300`}>Home</Link>
                {isAuth ? 
                    (
                        <div className='space-x-6'>
                            <span>Hello, {name}</span>
                            <Link to={`/todos`} className={`hover:text-gray-300`}>Dashboard</Link>
                            <Link to={`/`} onClick={logout} className={`hover:text-gray-300`}>Logout</Link>
                        </div>
                    )
                    : 
                    (
                        <div className='space-x-6'>
                            <Link to={`/login`} className={`hover:text-gray-300`}>Login</Link>
                            <Link to={`/register`} className={`hover:text-gray-300`}>Register</Link>
                        </div>
                    )
                }
                
            </div>
        </nav>
    )
}
