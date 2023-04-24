import { useContext, useState } from "react"
import Navbar from "./Navbar"
import {AuthContext} from "../context/AuthContext"
// @ts-ignore
import API_URL from '../api/config.js'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)
    // @ts-ignore
    const {isAuth, login, name, setName, token, setToken} = useContext(AuthContext)

    // @ts-ignore
    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            })
            const data = await res.json()
            if (res.ok) {
                setName(data.user.username)
                setToken(data.token)
                console.log('logged in')
                setError(null)
                login()
            } else {
                throw new Error(data.err)
            }
        } catch (error) {
            // @ts-ignore
            setError(error.message)
        }
    }
    

    return (    
        <>
        <Navbar />
        <div>
            <h1 className="text-center">Login</h1>
            <form className="border w-1/2 m-auto flex justify-center items-center">
                <div className="mb-3 flex flex-col justify-center items-center">
                    <label>Username</label>
                    <input className="border border-black rounded" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                    <label>Password</label>
                    <input className="border border-black rounded" type="text" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <button className="border border-black rounded mt-2 p-2" type="submit" onClick={loginUser}>login</button>
                </div>
            </form>
            {error && <div className="text-center text-red-500 text-xl text-bold">{error}</div>}
        </div>
        </>
    )
}
