import Link from "next/link";


export default function Navbar() {
    return (
        <div className="flex justify-center bg-slate-50 text-black space-x-4">
            <Link href={'/'}>home</Link>
            <Link href={'/search'}>search</Link>
            <Link href={'/api/hello'}>server</Link>
        </div>
    )
}