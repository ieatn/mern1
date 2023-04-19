import { useEffect, useState } from "react"
import Navbar from "./Navbar"

export default function TodoPage() {

    const [todos, setTodos] = useState([]) 
    const [todo, setTodo] = useState('')

    useEffect(() => {
        const fetchTodos = async () => {
            // make sure to use http not https keep getting typo errors
            const res = await fetch('http://localhost:4000/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setTodos(data)
        }
        fetchTodos()
    }, [todos])


    const deleteTodos = async (id: string) => {
        await fetch(`http://localhost:4000/${id}`, {
            method: 'DELETE',
        })
        setTodos(todos.filter((todo: any) => todo.id !== id))
    }

    const addTodo = async () => {
        const title = todo
        const res = await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title})
        })
        const data = await res.json()
        setTodos([...todos, data])
        setTodo('')
    }

    const updateTitle = async (id: string, title: string) => {
        await fetch(`http://localhost:4000/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title})
        })
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
        setTodos(todos.map((todo: any) => todo.id === id ? {...todo, completed} : todo))
    }   
    

  return (
    <>
    <Navbar />
    <div>
        <h1 className="text-5xl font-bold text-center">Hero</h1>
        
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
