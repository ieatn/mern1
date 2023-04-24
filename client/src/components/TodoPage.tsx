import { useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import { AuthContext } from "../context/AuthContext"
// @ts-ignore
import API_URL from '../api/config.js'

export default function TodoPage() {
    // @ts-ignore

    const {isAuth, login, name, setName, token, setToken} = useContext(AuthContext)


    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([]) 

    useEffect(() => {
        const fetchTodos = async () => {
            // make sure to use http not https keep getting typo errors
            const res = await fetch(`${API_URL}/api/todos/`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setTodos(data)
        }
        fetchTodos()
    }, [todos])


    // forgot to add authorization headers to each request

    const deleteTodos = async (id: string) => {
        await fetch(`${API_URL}/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        setTodos(todos.filter((todo: any) => todo.id !== id))
    }

    const addTodo = async () => {
        const title = todo
        const res = await fetch(`${API_URL}/api/todos/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title})
        })
        const data = await res.json()
        // @ts-ignore

        setTodos([...todos, data])
        setTodo('')
    }

    const updateTitle = async (id: string, title: string) => {
        await fetch(`${API_URL}/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title})
        })
        // @ts-ignore

        setTodos(todos.map((todo: any) => todo.id === id ? {...todo, title} : todo))
    }

    const toggleCompleted = async (id: string, completed: boolean) => {
        await fetch(`http://localhost:4000/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({completed: !completed})
        })
        // @ts-ignore

        setTodos(todos.map((todo: any) => todo.id === id ? {...todo, completed} : todo))
    }   
    

  return (
    <>
    <Navbar />
    <div>
        <h1 className="text-5xl font-bold text-center">Todos</h1>
        
        <div className="flex justify-center">
            <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} placeholder="add todo" className="border-2 border-gray-200 p-2 rounded-md m-2" />
            <button className="bg-green-500 text-white p-2 rounded-md" onClick={addTodo}>add</button>
        </div>

        {todos && todos.map((todo: any) => (
            <div key={todo._id}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo._id, todo.completed)} className="border-2 border-gray-200 p-2 rounded-md m-2"/>
                <input type="text" value={todo.title} onChange={(e) => updateTitle(todo._id, e.target.value)} className="border-2 border-gray-200 p-2 rounded-md m-2"/>
                <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => deleteTodos(todo._id)}>delete</button>
            </div>
        ))}
    </div>
    </>
  )
}
