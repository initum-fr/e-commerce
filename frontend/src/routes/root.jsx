import { Link, Outlet } from 'react-router-dom'

export default function Root() {
    const title = 'GLOVER'
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
                        <Link className="font-bold">{title}</Link>
                    </div>
                    <div className="justify-self-end flex gap-2">
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <Link to='/login' className="justify-self-end hover:underline">Log-In</Link>
                        </div>
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                            <Link to='/logout' className="justify-self-end hover:underline">Log-Out</Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <Outlet />
            </main>
        </>
    )
}
