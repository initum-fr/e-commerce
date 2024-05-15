import { Link, Outlet } from 'react-router-dom'

export default function Root() {
    const title = 'GLOVER'
    const navigation = [
        { name: 'products', url: 'products' },
        { name: 'about', url: 'about' },
        { name: 'contact', url: 'contact' },
    ]
    return (
        <>
            <header className="mx-auto bg-black">
                <nav className="grid grid-cols-3 items-center h-16 mx-5 text-white">
                    <div className="justify-self-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>

                    <div className="justify-self-center text-2xl">
                        <span className="font-bold">{title}</span>
                    </div>
                    <Link to='/login' className="flex justify-self-end hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span>Log-In</span>
                    </Link>
                </nav>
            </header>
            <Outlet />
        </>
    )
}
