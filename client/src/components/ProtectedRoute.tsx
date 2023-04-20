import { useEffect, useState } from "react"

export default function ProtectedRoute({token}) {

    const [secret, setSecret] = useState('')

    useEffect(() => {
        const getSecretMessage = async (token: string) => {
            const res = await fetch('http://localhost:4000/protected-route', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            console.log(data);
            setSecret(data.message);
        }
        getSecretMessage(token);
    }, [])

    return (
        <div>
            <h1>ProtectedRoute</h1>
            <p>{secret}</p>
        </div>
    )
}
