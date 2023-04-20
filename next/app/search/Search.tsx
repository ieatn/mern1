'use client'

import { useState } from "react"

// if you want to use 'use client' for usestate, you will run into an error, you have to format this file like this
const Search = () => {

    const [data, setData] = useState('hi')

    return (
       <div>
            <p>i am the search component</p>
            <p>{data}</p>
       </div>
    )
}

export default Search