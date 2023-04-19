import { useEffect, useState } from "react"

export default function ProtectedRoute() {

    const [secret, setSecret] = useState('')

    useEffect(() => {
        const getSecretMessage = async () => {
            const res = await fetch('http://localhost:4000/protected-route');
            const data = await res.json();
            console.log(data);
            setSecret(data.message);
        }
        getSecretMessage();
    }, [])

    return (
        <div>
            <h1>ProtectedRoute</h1>
            <p>{secret}</p>
        </div>
    )
}
