'use client'

import { useState } from "react"

// if you want to use 'use client' for usestate or onclick, you will run into an error, you have to format this file like this
const Search = () => {

    const fetchAPI = async () => {
        await fetch('/api/hello', {
            method: 'POST',
            body: JSON.stringify({msg: 'hello'})
        })
    }

    return (
       <div>
           <button onClick={fetchAPI}>Click</button>
       </div>
    )
}

export default Search