import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // useEffect(() => {
  //   fetch('/api/hello')
  //     .then(res => res.json())
  //     .then(data => setMessage(data.message))
  //     .catch(err => console.error(err))
  // }, [])



  return (
    <main className="flex flex-col items-center justify-between">
      <h1>Home</h1>
    </main>
  )
}
